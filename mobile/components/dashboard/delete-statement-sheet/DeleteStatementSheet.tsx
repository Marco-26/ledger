import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Modal,
  Pressable,
  Text,
  View,
  type LayoutChangeEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { Duration, Spacing } from "@/styles/tokens";
import { formatCurrency } from "@/utils/format";
import { createStyles } from "./DeleteStatementSheet.styles";

const HOLD_DURATION = 1100;

interface DeleteStatementSheetProps {
  visible: boolean;
  periodLabel: string;
  transactionCount: number;
  incomeTotal: number;
  expenseTotal: number;
  isDeleting?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteStatementSheet({
  visible,
  periodLabel,
  transactionCount,
  incomeTotal,
  expenseTotal,
  isDeleting = false,
  onConfirm,
  onClose,
}: DeleteStatementSheetProps) {
  const styles = useThemedStyles(createStyles);
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const progress = useRef(new Animated.Value(0)).current;
  const hold = useRef(new Animated.Value(0)).current;
  const holdAnimation = useRef<Animated.CompositeAnimation | null>(null);
  // Stays mounted through the exit animation, after `visible` has gone false.
  const [isMounted, setIsMounted] = useState(visible);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    if (visible) {
      hold.setValue(0);
      setIsMounted(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: Duration.slow,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: Duration.base,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => finished && setIsMounted(false));
    }
  }, [visible, progress, hold]);

  // A failed delete leaves the sheet open: drain the ink so it can be retried.
  useEffect(() => {
    if (!isDeleting) hold.setValue(0);
  }, [isDeleting, hold]);

  const confirm = () => {
    // The accessibility action ignores `disabled`, so guard against a second delete.
    if (isDeleting) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onConfirm();
  };

  const startHold = () => {
    if (isDeleting) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    holdAnimation.current?.stop();
    holdAnimation.current = Animated.timing(hold, {
      toValue: 1,
      duration: HOLD_DURATION,
      easing: Easing.inOut(Easing.quad),
      // Animates width, which the native driver cannot.
      useNativeDriver: false,
    });
    holdAnimation.current.start(({ finished }) => finished && confirm());
  };

  const releaseHold = () => {
    if (isDeleting) return;
    holdAnimation.current?.stop();
    Animated.timing(hold, {
      toValue: 0,
      duration: Duration.base,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const onButtonLayout = (event: LayoutChangeEvent) =>
    setButtonWidth(event.nativeEvent.layout.width);

  if (!isMounted) return null;

  const transactionsLabel = `${transactionCount} ${
    transactionCount === 1 ? "transaction" : "transactions"
  }`;

  const holdLabel = (color: string) => (
    <View style={styles.holdContent}>
      {isDeleting ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <Ionicons name="trash-outline" size={17} color={color} />
      )}
      <Text style={[styles.holdLabel, { color }]}>
        {isDeleting ? "Deleting…" : "Hold to delete"}
      </Text>
    </View>
  );

  return (
    <Modal
      transparent
      visible
      animationType="none"
      statusBarTranslucent
      onRequestClose={isDeleting ? undefined : onClose}
    >
      <View style={styles.root}>
        {/* Full-screen so the sheet's rounded corners sit on the dim, not on a hard edge. */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.backdrop,
            {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, isDark ? 0.6 : 0.28],
              }),
            },
          ]}
        />
        <Pressable
          style={styles.dismissArea}
          onPress={isDeleting ? undefined : onClose}
          accessibilityLabel="Close"
        />

        <Animated.View
          accessibilityViewIsModal
          style={[
            styles.sheet,
            {
              paddingBottom: insets.bottom + Spacing[4],
              transform: [
                {
                  translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [420, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.grabber} />

          <Text style={styles.eyebrow}>Delete statement</Text>
          <Text style={styles.title} accessibilityRole="header">
            {periodLabel}
          </Text>
          <Text style={styles.message}>
            Every transaction and category in this statement will be removed.
            You can import the PDF again later.
          </Text>

          <View style={styles.slip}>
            <View style={styles.slipRow}>
              <Text style={styles.slipLabel}>Transactions</Text>
              <Text style={styles.slipValue}>{transactionsLabel}</Text>
            </View>
            <View style={styles.slipRow}>
              <Text style={styles.slipLabel}>Income</Text>
              <Text style={styles.slipValue}>{formatCurrency(incomeTotal)}</Text>
            </View>
            <View style={styles.slipRow}>
              <Text style={styles.slipLabel}>Expenses</Text>
              <Text style={styles.slipValue}>
                {formatCurrency(expenseTotal)}
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable
              onLayout={onButtonLayout}
              onPressIn={startHold}
              onPressOut={releaseHold}
              disabled={isDeleting}
              style={styles.holdButton}
              accessibilityRole="button"
              accessibilityLabel={`Delete ${periodLabel} statement`}
              accessibilityHint="Double tap to delete. This cannot be undone."
              accessibilityState={{ disabled: isDeleting, busy: isDeleting }}
              // Screen-reader users can't press and hold, so activating confirms.
              accessibilityActions={[{ name: "activate" }]}
              onAccessibilityAction={confirm}
            >
              {holdLabel(colors.expense)}

              <Animated.View
                pointerEvents="none"
                style={[
                  styles.holdFill,
                  {
                    width: isDeleting
                      ? "100%"
                      : hold.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, buttonWidth],
                        }),
                  },
                ]}
              >
                <View style={[styles.holdFillContent, { width: buttonWidth }]}>
                  {holdLabel(colors.textInverse)}
                </View>
              </Animated.View>
            </Pressable>

            <Pressable
              onPress={onClose}
              disabled={isDeleting}
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && styles.cancelPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Keep statement"
            >
              <Text style={styles.cancelLabel}>Keep statement</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
