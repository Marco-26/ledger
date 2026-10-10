import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { IUser } from "@/hooks/useCurrentUser";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { Duration } from "@/styles/tokens";
import { createStyles } from "./ProfileMenuModal.styles";

/** Window coordinates of the menu's top-right corner. */
export interface MenuAnchor {
  top: number;
  right: number;
}

interface ProfileMenuModalProps {
  visible: boolean;
  anchor: MenuAnchor | null;
  user: IUser;
  onClose: () => void;
}

export default function ProfileMenuModal({ visible, anchor, user, onClose }: ProfileMenuModalProps) {
  const styles = useThemedStyles(createStyles);
  const queryClient = useQueryClient();
  const { colors, isDark } = useTheme();
  const progress = useRef(new Animated.Value(0)).current;
  // Stays mounted through the exit animation, after `visible` has gone false.
  const [isMounted, setIsMounted] = useState(visible);
  const [isSigningOut, setIsSigningOut] = useState(false);

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

  const handleSignOut = async () => {
    setIsSigningOut(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
      setIsSigningOut(false);
      Toast.show({
        type: "error",
        text1: "Couldn't sign out",
        text2: "Please try again.",
      });
      return;
    }

    // Cached statements belong to this account; the next sign-in must not see them.
    queryClient.clear();

    // On success the auth guard swaps to the Login screen and unmounts us.
    onClose();
  };

  if (!isMounted || !anchor) return null;

  return (
    <Modal transparent visible animationType="none" statusBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.dismissArea} onPress={onClose} accessibilityLabel="Close account menu">
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
        <View style={styles.identity}>
          {!!user.name && (
            <Text style={styles.name} numberOfLines={1}>
              {user.name}
            </Text>
          )}
          {!!user.email && (
            <Text style={styles.email} numberOfLines={1}>
              {user.email}
            </Text>
          )}
        </View>

        <View style={styles.rule} />

        <Pressable
          onPress={handleSignOut}
          disabled={isSigningOut}
          style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
          accessibilityRole="button"
          accessibilityLabel="Sign out"
          accessibilityState={{ disabled: isSigningOut, busy: isSigningOut }}
        >
          <Text style={styles.actionLabel}>Sign out</Text>
          {isSigningOut ? (
            <ActivityIndicator size="small" color={colors.expense} />
          ) : (
            <Ionicons name="log-out-outline" size={18} color={colors.expense} />
          )}
        </Pressable>
      </Animated.View>
    </Modal>
  );
}
