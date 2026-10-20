import { View, type StyleProp, type ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";
import MonthStepper from "@/components/month-stepper/MonthStepper";
import SegmentedControl, {
  type SegmentOption,
} from "@/components/ui/segmented-control/SegmentedControl";
import {
  PeriodOptions,
  useCanGoToNext,
  useDashboardActions,
  useSelectedDate,
  useSelectedPeriod,
} from "@/stores/dashboardStore";
import { useThemedStyles } from "@/styles/theme";
import { createStyles } from "./PeriodSwitcher.styles";

const OPTIONS: SegmentOption<PeriodOptions>[] = [
  { value: PeriodOptions.MONTH, label: "Month" },
  { value: PeriodOptions.YEAR, label: "Year" },
];

interface PeriodSwitcherProps {
  style?: StyleProp<ViewStyle>;
}

export default function PeriodSwitcher({ style }: PeriodSwitcherProps) {
  const styles = useThemedStyles(createStyles);
  const period = useSelectedPeriod();
  const selectedDate = useSelectedDate();
  const canGoToNext = useCanGoToNext();
  const { setPeriod, goToPrevious, goToNext } = useDashboardActions();

  const changePeriod = (next: PeriodOptions) => {
    if (next === period) return;
    Haptics.selectionAsync();
    setPeriod(next);
  };

  return (
    <View style={[styles.row, style]}>
      <View style={styles.toggle}>
        <SegmentedControl
          options={OPTIONS}
          value={period}
          onChange={changePeriod}
          accessibilityLabel="Period"
        />
      </View>

      <MonthStepper
        date={selectedDate}
        unit={period}
        onPrevious={goToPrevious}
        onNext={goToNext}
        canGoNext={canGoToNext}
        fullWidth
        style={styles.stepper}
      />
    </View>
  );
}
