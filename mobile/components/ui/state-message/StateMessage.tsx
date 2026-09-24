import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useThemedStyles } from "@/styles/theme";
import type { IconName } from "@/utils/categories";
import { createStyles } from "./StateMessage.styles";

interface StateMessageProps {
  icon: IconName;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  /** Tints the icon — used to signal an error rather than an empty list. */
  tone?: "neutral" | "error";
}

/** Shared shell for empty and error states so both read the same way. */
export default function StateMessage({
  icon,
  title,
  message,
  actionLabel,
  onAction,
  tone = "neutral",
}: StateMessageProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.iconRing}>
        <Ionicons
          name={icon}
          size={20}
          color={tone === "error" ? colors.expense : colors.textTertiary}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {actionLabel && onAction ? (
        <TouchableOpacity
          style={styles.action}
          onPress={onAction}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          <Text style={styles.actionLabel}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
