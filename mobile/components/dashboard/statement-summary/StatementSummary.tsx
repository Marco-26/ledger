import { useMemo } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { IStatement, IYearlyStatement } from "@ledger/api";
import TransactionSummary from "@/components/dashboard/transaction-summary/TransactionSummary";
import VerticalDivider from "@/components/ui/vertical-divider/VerticalDivider";
import { SelectedPeriod } from "@/context/StatementContext";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { Constants } from "@/utils/constants";
import {
  formatCurrency,
  formatDelta,
  formatPercent,
  splitCurrency,
} from "@/utils/format";
import {
  getMonthlyTotals,
  getPeakMonth,
  type MonthTotals,
} from "@/utils/monthlyTotals";
import { createStyles } from "./StatementSummary.styles";
import StatementSummarySkeleton from "./skeleton/StatementSummarySkeleton";

interface StatementSummaryProps {
  statement?: IStatement | IYearlyStatement;
  period: SelectedPeriod;
  isLoading: boolean;
  isYear?: boolean;
}

interface BalanceLine {
  value: string;
  color: string;
  icon?: "arrow-up" | "arrow-down";
  caption?: string;
}

/** "Highest in June · 3200,00 €" — the month the money peaked, for the year view. */
function peakCaption(
  month: MonthTotals | undefined,
  field: "income" | "expenses",
) {
  if (!month)
    return field === "income" ? "No income recorded" : "No spending recorded";
  return `Highest in ${Constants.UI.MONTHS[month.month]} · ${formatCurrency(month[field])}`;
}

/**
 * The anchor of the dashboard: one large balance, then the two figures that
 * produced it. Labels stay small so the numbers carry the hierarchy.
 *
 * A month compares itself with the previous month. A year describes itself
 * instead: how much of the income was kept, and when money peaked.
 */
export default function StatementSummary({
  statement,
  period,
  isLoading,
  isYear
}: StatementSummaryProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();

  const months = useMemo(
    () =>
      isYear ? getMonthlyTotals(statement?.allTransactions) : [],
    [statement, isYear],
  );

  if (isLoading) return <StatementSummarySkeleton />;

  const balance = statement?.netBalance ?? 0;
  const income = statement?.creditTotal ?? 0;
  const { sign, symbol, integer, symbolFirst } = splitCurrency(balance);

  let balanceLine: BalanceLine;
  let incomeCaption: string;
  let expensesCaption: string;

  if (period === SelectedPeriod.YEAR) {
    // Savings rate: share of the year's income that was not spent.
    const savedRate = income > 0 ? (balance / income) * 100 : 0;
    balanceLine = {
      value:
        balance >= 0
          ? `${formatPercent(savedRate)} of income saved`
          : `Spent ${formatPercent(Math.abs(savedRate))} more than earned`,
      color: balance >= 0 ? colors.income : colors.expense,
    };
    incomeCaption = peakCaption(getPeakMonth(months, "income"), "income");
    expensesCaption = peakCaption(getPeakMonth(months, "expenses"), "expenses");
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
    incomeCaption = `${formatDelta(monthly?.creditTotalGrowthRate)} vs last month`;
    expensesCaption = `${formatDelta(monthly?.debitTotalGrowthRate)} vs last month`;
  }

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
          amount={statement?.creditTotal}
          caption={incomeCaption}
          color={colors.income}
          tint={colors.incomeSoft}
          icon="arrow-down"
        />
        <VerticalDivider />
        <TransactionSummary
          label="Expenses"
          amount={statement?.debitTotal}
          caption={expensesCaption}
          color={colors.expense}
          tint={colors.expenseSoft}
          icon="arrow-up"
        />
      </View>
    </View>
  );
}
