import { Text, View } from "react-native";
import dayjs from "dayjs";
import type { IMonthlySummary } from "@ledger/api";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { formatCurrency } from "@/utils/format";
import { createStyles } from "./YearlyNetChart.styles";

/** "January" … "December", matching the full month names the API sends. */
const MONTH_NAMES = Array.from({ length: 12 }, (_, index) =>
  dayjs().month(index).format("MMMM"),
);

interface YearlyNetChartProps {
  /** One entry per month that has a statement, in the order the API sends them. */
  monthSummaries?: IMonthlySummary[];
}

export default function YearlyNetChart({
  monthSummaries,
}: YearlyNetChartProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();

  const months = monthSummaries ?? [];
  const nets = months.map((summary) => summary.netBalance);
  const maxGain = Math.max(0, ...nets);
  const maxLoss = Math.max(0, ...nets.map((net) => -net));

  // Every month keeps its slot, so a year with a few uploads still reads as a
  // year instead of a handful of wide bars.
  const summariesByMonth = new Map(
    months.map((summary) => [summary.month.toLowerCase(), summary]),
  );
  const slots = MONTH_NAMES.map((name) => ({
    name,
    summary: summariesByMonth.get(name.toLowerCase()),
  }));

  // Screen readers get the figures the bars stand for, one month at a time.
  const accessibilityLabel = months
    .map((summary) => `${summary.month} ${formatCurrency(summary.netBalance)}`)
    .join(", ");

  return (
    <View>
      <SectionHeading title="Saved each month" />

      <View
        style={styles.plot}
        accessible
        accessibilityRole="image"
        accessibilityLabel={`Saved each month: ${accessibilityLabel}`}
      >
        {/* Gains grow up from the rule, losses hang below it. */}
        <View style={[styles.half, { flex: maxGain || 0.001 }]}>
          {slots.map(({ name, summary }) => (
            <View key={name} style={styles.slotTop}>
              {summary && summary.netBalance >= 0 ? (
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${maxGain > 0 ? (summary.netBalance / maxGain) * 100 : 0}%`,
                      backgroundColor: colors.income,
                    },
                  ]}
                />
              ) : null}
            </View>
          ))}
        </View>

        <View style={[styles.axis, { backgroundColor: colors.borderStrong }]} />

        <View style={[styles.half, { flex: maxLoss || 0.001 }]}>
          {slots.map(({ name, summary }) => (
            <View key={name} style={styles.slotBottom}>
              {summary && summary.netBalance < 0 ? (
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${(-summary.netBalance / maxLoss) * 100}%`,
                      backgroundColor: colors.expense,
                    },
                  ]}
                />
              ) : null}
            </View>
          ))}
        </View>
      </View>

      <View
        style={styles.labels}
        importantForAccessibility="no-hide-descendants"
      >
        {slots.map(({ name, summary }) => (
          <View key={name} style={styles.labelCell}>
            <Text
              style={[styles.monthInitial, !summary && styles.monthInitialEmpty]}
            >
              {name[0]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
