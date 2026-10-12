import { useMemo, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { TransactionType, type ITransaction } from "@ledger/api";
import Divider from "@/components/ui/divider/Divider";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { HIT_SLOP } from "@/styles/tokens";
import { Constants } from "@/utils/constants";
import { formatCurrency } from "@/utils/format";
import { createStyles } from "./YearlyNetChart.styles";

interface YearlyNetChartProps {
  year: number;
  transactions?: ITransaction[];
  /** Called with a 0-based month when the user asks to open that month. */
  onOpenMonth: (month: number) => void;
}

interface MonthBucket {
  month: number;
  count: number;
  income: number;
  expenses: number;
  net: number;
}

/**
 * What was kept each month: one bar per month, above the rule when the month
 * saved money and below it when it spent more than came in. Tapping a bar
 * reads out its figures underneath, and from there the user can open it.
 */
export default function YearlyNetChart({
  year,
  transactions,
  onOpenMonth,
}: YearlyNetChartProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();

  const buckets = useMemo<MonthBucket[]>(() => {
    const months = Constants.UI.MONTHS.map((_, month) => ({
      month,
      count: 0,
      income: 0,
      expenses: 0,
      net: 0,
    }));

    (transactions ?? []).forEach((transaction) => {
      const bucket = months[transaction.date.month()];
      const amount = Math.abs(transaction.amount);
      bucket.count += 1;
      if (transaction.type === TransactionType.INCOME) bucket.income += amount;
      else bucket.expenses += amount;
    });

    months.forEach((bucket) => (bucket.net = bucket.income - bucket.expenses));
    return months;
  }, [transactions]);

  const withData = buckets.filter((bucket) => bucket.count > 0);
  const latest = withData[withData.length - 1]?.month ?? null;
  const [picked, setPicked] = useState<number | null>(null);

  // The parent keys this component by year, so a pick never leaks into
  // another year; until the user picks, the latest month is shown.
  const selected =
    picked !== null && buckets[picked].count > 0 ? picked : latest;

  const maxGain = Math.max(0, ...withData.map((bucket) => bucket.net));
  const maxLoss = Math.max(0, ...withData.map((bucket) => -bucket.net));

  const select = (month: number) => {
    if (month === selected) return;
    Haptics.selectionAsync();
    setPicked(month);
  };

  const current = selected !== null ? buckets[selected] : null;

  return (
    <View>
      <SectionHeading title="Saved each month" />

      <View style={styles.plot}>
        {/* Gains grow up from the rule, losses hang below it. */}
        <View style={[styles.half, { flex: maxGain || 0.001 }]}>
          {buckets.map((bucket) => (
            <View key={bucket.month} style={styles.slotTop}>
              {bucket.count > 0 && bucket.net >= 0 ? (
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${maxGain > 0 ? (bucket.net / maxGain) * 100 : 0}%`,
                      backgroundColor: colors.income,
                    },
                    bucket.month !== selected && styles.barDimmed,
                  ]}
                />
              ) : null}
            </View>
          ))}
        </View>

        <View style={[styles.axis, { backgroundColor: colors.borderStrong }]} />

        <View style={[styles.half, { flex: maxLoss || 0.001 }]}>
          {buckets.map((bucket) => (
            <View key={bucket.month} style={styles.slotBottom}>
              {bucket.count > 0 && bucket.net < 0 ? (
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${(-bucket.net / maxLoss) * 100}%`,
                      backgroundColor: colors.expense,
                    },
                    bucket.month !== selected && styles.barDimmed,
                  ]}
                />
              ) : null}
            </View>
          ))}
        </View>

        {/* One transparent column per month on top, so the whole height is the tap target. */}
        <View style={styles.hitRow}>
          {buckets.map((bucket) => (
            <Pressable
              key={bucket.month}
              style={styles.hit}
              disabled={bucket.count === 0}
              onPress={() => select(bucket.month)}
              accessibilityRole="button"
              accessibilityState={{
                selected: bucket.month === selected,
                disabled: bucket.count === 0,
              }}
              accessibilityLabel={
                bucket.count > 0
                  ? `${Constants.UI.MONTHS[bucket.month]}, net ${formatCurrency(bucket.net)}`
                  : `${Constants.UI.MONTHS[bucket.month]}, no statement`
              }
            />
          ))}
        </View>
      </View>

      <View style={styles.labels}>
        {buckets.map((bucket) => {
          const isSelected = bucket.month === selected;
          return (
            <View key={bucket.month} style={styles.labelCell}>
              <Text
                style={[
                  styles.monthInitial,
                  isSelected && styles.monthInitialSelected,
                  bucket.count === 0 && styles.monthInitialEmpty,
                ]}
              >
                {Constants.UI.MONTHS[bucket.month][0]}
              </Text>
              <View
                style={[
                  styles.marker,
                  isSelected && { backgroundColor: colors.brass },
                ]}
              />
            </View>
          );
        })}
      </View>

      {current ? (
        <>
          <Divider style={styles.readoutRule} />
          <View style={styles.readoutHead}>
            <Text style={styles.readoutTitle}>
              {Constants.UI.MONTHS[current.month]} {year}
            </Text>
            <TouchableOpacity
              style={styles.open}
              onPress={() => onOpenMonth(current.month)}
              hitSlop={HIT_SLOP}
              activeOpacity={0.6}
              accessibilityRole="link"
              accessibilityLabel={`Open ${Constants.UI.MONTHS[current.month]}`}
            >
              <Text style={styles.openLabel}>Open month</Text>
              <Ionicons name="chevron-forward" size={13} color={colors.brass} />
            </TouchableOpacity>
          </View>

          <View style={styles.figures} accessibilityLiveRegion="polite">
            <Figure label="Income" value={current.income} color={colors.income} />
            <Figure label="Expenses" value={current.expenses} color={colors.expense} />
            <Figure label="Net" value={current.net} color={colors.textPrimary} />
          </View>
        </>
      ) : null}
    </View>
  );
}

function Figure({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.figure}>
      <Text style={styles.figureLabel}>{label}</Text>
      <Text
        style={[styles.figureValue, { color }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
      >
        {formatCurrency(value)}
      </Text>
    </View>
  );
}
