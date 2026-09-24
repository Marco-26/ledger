import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Dayjs } from "dayjs";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { HIT_SLOP } from "@/styles/tokens";
import { formatMonthLabel, formatMonthShort } from "@/utils/format";
import { createStyles } from "./MonthStepper.styles";

/** Below this width the stepper switches to "Sep 2026". */
const COMPACT_WIDTH = 360;

interface MonthStepperProps {
  date: Dayjs;
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
  /** Stretches to the container, pushing the chevrons to either end. */
  fullWidth?: boolean;
  /** Placement is the caller's business: margins, alignment, and so on. */
  style?: StyleProp<ViewStyle>;
}

/** Discreet period selector — the only chrome in the dashboard header. */
export default function MonthStepper({
  date,
  onPrevious,
  onNext,
  canGoNext,
  fullWidth = false,
  style,
}: MonthStepperProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  // The full month name crowds the screen title on 320pt devices — but a
  // full-width stepper always has room for it.
  const isCompact = !fullWidth && width < COMPACT_WIDTH;
  const label = isCompact ? formatMonthShort(date) : formatMonthLabel(date);

  return (
    <View
      style={[styles.container, fullWidth && styles.containerFullWidth, style]}
      accessibilityLabel={`Period ${formatMonthLabel(date)}`}
    >
      <TouchableOpacity
        style={styles.chevron}
        onPress={onPrevious}
        hitSlop={HIT_SLOP}
        activeOpacity={0.6}
        accessibilityRole="button"
        accessibilityLabel="Previous month"
      >
        <Ionicons name="chevron-back" size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <Text
        style={[
          styles.label,
          isCompact && styles.labelCompact,
          fullWidth && styles.labelFullWidth,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>

      <TouchableOpacity
        style={[styles.chevron, !canGoNext && styles.chevronDisabled]}
        onPress={onNext}
        disabled={!canGoNext}
        hitSlop={HIT_SLOP}
        activeOpacity={0.6}
        accessibilityRole="button"
        accessibilityLabel="Next month"
        accessibilityState={{ disabled: !canGoNext }}
      >
        <Ionicons
          name="chevron-forward"
          size={16}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
}
