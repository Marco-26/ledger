import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { IStatement, IYearlyStatement } from "@ledger/api";
import MonthTransactionSummary from "@/components/dashboard/month-transaction-summary/MonthTransactionSummary";
import VerticalDivider from "@/components/ui/vertical-divider/VerticalDivider";
import { SelectedPeriod } from "@/context/StatementContext";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { formatCurrency, formatDelta, splitCurrency } from "@/utils/format";
import { createStyles } from "./StatementSummary.styles";
import StatementSummarySkeleton from "./skeleton/StatementSummarySkeleton";

interface MonthSummaryProps {
  statement?: IStatement | IYearlyStatement;
  period: SelectedPeriod;
  isLoading: boolean;
}

function isYearlyStatement(statement?: IStatement | IYearlyStatement) {
  if (!statement) return false;
  return "year" in statement;
}

/**
 * The anchor of the dashboard: one large balance, then the two figures that
 * produced it. Labels stay small so the numbers carry the hierarchy.
 */
export default function StatementSummary({
  statement,
  period,
  isLoading,
}: MonthSummaryProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();

  if (isLoading) return <StatementSummarySkeleton />;

  const balance = statement?.netBalance ?? 0;
  const { sign, symbol, integer, symbolFirst } = splitCurrency(balance);
  const balanceDelta = statement?.netBalance ?? 0;
  const comparison =
    period === SelectedPeriod.YEAR ? "vs last year" : "vs last month";
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
          <Text style={styles.deltaCaption}>{comparison}</Text>
        </View>
      </View>

      <View style={styles.splitRow}>
        <MonthTransactionSummary
          label="Income"
          amount={statement?.creditTotal}
          delta={isYearlyStatement(statement) ? 0 : (statement as IStatement).creditTotalGrowthRate}
          comparison={comparison}
          color={colors.income}
          tint={colors.incomeSoft}
          icon="arrow-down"
        />
        <VerticalDivider />
        <MonthTransactionSummary
          label="Expenses"
          amount={statement?.debitTotal}
          delta={isYearlyStatement(statement) ? 0 : (statement as IStatement).debitTotalGrowthRate}
          comparison={comparison}
          color={colors.expense}
          tint={colors.expenseSoft}
          icon="arrow-up"
        />
      </View>
    </View>
  );
}
