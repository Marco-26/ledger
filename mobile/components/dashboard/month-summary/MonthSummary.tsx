import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { IStatement } from "@ledger/api";
import MonthTransactionSummary from "@/components/dashboard/month-transaction-summary/MonthTransactionSummary";
import VerticalDivider from "@/components/ui/vertical-divider/VerticalDivider";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { formatCurrency, formatDelta, splitCurrency } from "@/utils/format";
import { createStyles } from "./MonthSummary.styles";

interface MonthSummaryProps {
  statement?: IStatement;
  isLoading: boolean;
}

/**
 * The anchor of the dashboard: one large balance, then the two figures that
 * produced it. Labels stay small so the numbers carry the hierarchy.
 */
export default function MonthSummary({
  statement,
  isLoading,
}: MonthSummaryProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.skeletonGroup}>
          <Skeleton width={92} height={13} />
          <Skeleton width={220} height={40} />
          <Skeleton width={140} height={12} />
        </View>
        <View style={styles.splitRow}>
          <View style={styles.skeletonColumn}>
            <Skeleton width={70} height={12} />
            <Skeleton width={120} height={24} />
          </View>
          <VerticalDivider />
          <View style={styles.skeletonColumn}>
            <Skeleton width={70} height={12} />
            <Skeleton width={120} height={24} />
          </View>
        </View>
      </View>
    );
  }

  const balance = statement?.netBalance ?? 0;
  const { sign, symbol, integer, symbolFirst } = splitCurrency(balance);
  const balanceDelta = statement?.netBalanceTotalGrowthRate ?? 0;
  const deltaColor =
    balanceDelta === 0
      ? colors.textTertiary
      : balanceDelta > 0
        ? colors.income
        : colors.expense;

  return (
    <View style={styles.container}>
      <View style={styles.balanceBlock}>
        <Text style={styles.caption}>Balance</Text>

        <View
          style={styles.heroRow}
          accessibilityRole="text"
          accessibilityLabel={`Balance ${formatCurrency(balance)}`}
        >
          {sign ? <Text style={styles.heroValue}>{sign}</Text> : null}
          {symbolFirst ? <Text style={styles.heroSymbol}>{symbol}</Text> : null}
          <Text style={styles.heroValue} adjustsFontSizeToFit numberOfLines={1}>
            {integer}
          </Text>
        </View>

        <View style={styles.deltaRow}>
          {balanceDelta !== 0 ? (
            <Ionicons
              name={balanceDelta > 0 ? "arrow-up" : "arrow-down"}
              size={11}
              color={deltaColor}
            />
          ) : null}
          <Text style={[styles.deltaValue, { color: deltaColor }]}>
            {formatDelta(balanceDelta)}
          </Text>
          <Text style={styles.deltaCaption}>vs last month</Text>
        </View>
      </View>

      <View style={styles.splitRow}>
        <MonthTransactionSummary
          label="Income"
          amount={statement?.creditTotal}
          delta={statement?.creditTotalGrowthRate}
          color={colors.income}
          tint={colors.incomeSoft}
          icon="arrow-down"
        />
        <VerticalDivider />
        <MonthTransactionSummary
          label="Expenses"
          amount={statement?.debitTotal}
          delta={statement?.debitTotalGrowthRate}
          color={colors.expense}
          tint={colors.expenseSoft}
          icon="arrow-up"
        />
      </View>
    </View>
  );
}
