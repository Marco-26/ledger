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
import { PeriodOptions } from "@/stores/dashboardStore";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { HIT_SLOP } from "@/styles/tokens";
import { formatMonthLabel, formatMonthShort } from "@/utils/format";
import { createStyles } from "./MonthStepper.styles";

const COMPACT_WIDTH = 360;

interface MonthStepperProps {
  date: Dayjs;
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
  unit?: PeriodOptions;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function MonthStepper({
  date,
  onPrevious,
  onNext,
  canGoNext,
  unit = PeriodOptions.MONTH,
  fullWidth = false,
  style,
}: MonthStepperProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const isYear = unit === PeriodOptions.YEAR;
  const isCompact = !isYear && !fullWidth && width < COMPACT_WIDTH;
  const label = isYear
    ? date.format("YYYY")
    : isCompact
      ? formatMonthShort(date)
      : formatMonthLabel(date);

  return (
    <View
      style={[styles.container, fullWidth && styles.containerFullWidth, style]}
      accessibilityLabel={`Period ${isYear ? date.format("YYYY") : formatMonthLabel(date)}`}
    >
      <TouchableOpacity
        style={styles.chevron}
        onPress={onPrevious}
        hitSlop={HIT_SLOP}
        activeOpacity={0.6}
        accessibilityRole="button"
        accessibilityLabel={`Previous ${unit}`}
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
        accessibilityLabel={`Next ${unit}`}
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
