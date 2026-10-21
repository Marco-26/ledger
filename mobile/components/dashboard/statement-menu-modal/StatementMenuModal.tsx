import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Modal, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { MenuAnchor } from "@/components/dashboard/profile-menu-modal/ProfileMenuModal";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { Duration } from "@/styles/tokens";
import { createStyles } from "./StatementMenuModal.styles";

interface StatementMenuModalProps {
  visible: boolean;
  anchor: MenuAnchor | null;
  onClose: () => void;
  onDelete: () => void;
}

/** Actions for the statement on screen, hanging from the "⋯" next to the summary. */
export default function StatementMenuModal({
  visible,
  anchor,
  onClose,
  onDelete,
}: StatementMenuModalProps) {
  const styles = useThemedStyles(createStyles);
  const { colors, isDark } = useTheme();
  const progress = useRef(new Animated.Value(0)).current;
  // Stays mounted through the exit animation, after `visible` has gone false.
  const [isMounted, setIsMounted] = useState(visible);
  // iOS will not present a modal while another one is still on screen, so the
  // chosen action waits until this menu has fully gone.
  const pendingAction = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: Duration.base,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: Duration.fast,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start(({ finished }) => finished && setIsMounted(false));
    }
  }, [visible, progress]);

  useEffect(() => {
    if (isMounted || !pendingAction.current) return;
    const action = pendingAction.current;
    pendingAction.current = null;
    action();
  }, [isMounted]);

  const handleDelete = () => {
    pendingAction.current = onDelete;
    onClose();
  };

  if (!isMounted || !anchor) return null;

  return (
    <Modal transparent visible animationType="none" statusBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.dismissArea} onPress={onClose} accessibilityLabel="Close statement menu">
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, isDark ? 0.45 : 0.12],
              }),
            },
          ]}
        />
      </Pressable>

      <Animated.View
        accessibilityViewIsModal
        style={[
          styles.card,
          {
            top: anchor.top,
            right: anchor.right,
            opacity: progress,
            transform: [
              { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [-6, 0] }) },
              { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] }) },
            ],
          },
        ]}
      >
        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
          accessibilityRole="button"
          accessibilityLabel="Delete statement"
        >
          <Text style={styles.actionLabel}>Delete statement</Text>
          <Ionicons name="trash-outline" size={18} color={colors.expense} />
        </Pressable>
      </Animated.View>
    </Modal>
  );
}
