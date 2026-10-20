import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { IStatement, IYearlyStatement } from "@ledger/api";
import TransactionSummary from "@/components/dashboard/transaction-summary/TransactionSummary";
import VerticalDivider from "@/components/ui/vertical-divider/VerticalDivider";
import { PeriodOptions } from "@/stores/dashboardStore";
import { HIT_SLOP } from "@/styles/tokens";
import { useTheme, useThemedStyles } from "@/styles/theme";
import {
  formatCurrency,
  formatDelta,
  formatPercent,
  splitCurrency,
} from "@/utils/format";
import { createStyles } from "./StatementSummary.styles";
import StatementSummarySkeleton from "./skeleton/StatementSummarySkeleton";
import { getPeakExpensesMonth, getPeakIncomeMonth } from "@/utils/utils";

interface StatementSummaryProps {
  statement?: IStatement | IYearlyStatement;
  period: PeriodOptions;
  isLoading: boolean;
  onDelete?: () => void;
}

interface BalanceLine {
  value: string;
  color: string;
  icon?: "arrow-up" | "arrow-down";
  caption?: string;
}

export default function StatementSummary({
  statement,
  period,
  isLoading,
  onDelete,
}: StatementSummaryProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();

  if (isLoading) return <StatementSummarySkeleton />;

  const balance = statement?.netBalance ?? 0;
  const income = statement?.incomeTotal ?? 0;
  const { sign, symbol, integer, symbolFirst } = splitCurrency(balance);

  let balanceLine: BalanceLine;
  let incomeCaption: string;
  let expensesCaption: string;

  if (period === PeriodOptions.YEAR) {
    // Savings rate: share of the year's income that was not spent.
    const savedRate = income > 0 ? (balance / income) * 100 : 0;
    balanceLine = {
      value:
        balance >= 0
          ? `${formatPercent(savedRate)} of income saved`
          : `Spent ${formatPercent(Math.abs(savedRate))} more than earned`,
      color: balance >= 0 ? colors.income : colors.expense,
    };
    // `?.` rather than a bare cast: the statement is undefined until it loads.
    const summaries =
      (statement as IYearlyStatement | undefined)?.monthSummaries ?? [];
    const peakIncome = getPeakIncomeMonth(summaries);
    const peakExpenses = getPeakExpensesMonth(summaries);

    incomeCaption = peakIncome
      ? `Highest in ${peakIncome.month} · ${formatCurrency(peakIncome.income)}`
      : "No income recorded";
    expensesCaption = peakExpenses
      ? `Highest in ${peakExpenses.month} · ${formatCurrency(peakExpenses.expenses)}`
      : "No spending recorded";
  } else {
    const monthly = statement as IStatement;
    const delta = monthly?.netBalanceTotalGrowthRate ?? 0;
    balanceLine = {
      value: formatDelta(delta),
      color:
        delta === 0
          ? colors.textTertiary
          : delta > 0
            ? colors.income
            : colors.expense,
      icon: delta === 0 ? undefined : delta > 0 ? "arrow-up" : "arrow-down",
      caption: "vs last month",
    };
    incomeCaption = `${formatDelta(monthly?.incomeTotalGrowthRate)} vs last month`;
    expensesCaption = `${formatDelta(monthly?.expenseTotalGrowthRate)} vs last month`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.balanceBlock}>
        <View style={styles.captionRow}>
          <Text style={styles.caption}>Balance</Text>
          {onDelete ? (
            <Pressable
              onPress={onDelete}
              hitSlop={HIT_SLOP}
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && styles.deleteButtonPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Delete statement"
            >
              {({ pressed }) => (
                <Ionicons
                  name="trash-outline"
                  size={17}
                  color={pressed ? colors.expense : colors.textTertiary}
                />
              )}
            </Pressable>
          ) : null}
        </View>

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
          {balanceLine.icon ? (
            <Ionicons
              name={balanceLine.icon}
              size={11}
              color={balanceLine.color}
            />
          ) : null}
          <Text style={[styles.deltaValue, { color: balanceLine.color }]}>
            {balanceLine.value}
          </Text>
          {balanceLine.caption ? (
            <Text style={styles.deltaCaption}>{balanceLine.caption}</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.splitRow}>
        <TransactionSummary
          label="Income"
          amount={statement?.incomeTotal}
          caption={incomeCaption}
          color={colors.income}
          tint={colors.incomeSoft}
          icon="arrow-down"
        />
        <VerticalDivider />
        <TransactionSummary
          label="Expenses"
          amount={statement?.expenseTotal}
          caption={expensesCaption}
          color={colors.expense}
          tint={colors.expenseSoft}
          icon="arrow-up"
        />
      </View>
    </View>
  );
}
