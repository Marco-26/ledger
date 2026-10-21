import { useRef, useState } from "react";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import type { IStatement, IYearlyStatement } from "@ledger/api";
import type { MenuAnchor } from "@/components/dashboard/profile-menu-modal/ProfileMenuModal";
import StatementMenuModal from "@/components/dashboard/statement-menu-modal/StatementMenuModal";
import TransactionSummary from "@/components/dashboard/transaction-summary/TransactionSummary";
import VerticalDivider from "@/components/ui/vertical-divider/VerticalDivider";
import { PeriodOptions } from "@/stores/dashboardStore";
import { HIT_SLOP, Spacing } from "@/styles/tokens";
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

function formatVsLastMonth(rate?: number): string {
  return rate ? `${formatDelta(rate)} vs last month` : "Same as last month";
}

export default function StatementSummary({
  statement,
  period,
  isLoading,
  onDelete,
}: StatementSummaryProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const menuButtonRef = useRef<View>(null);
  const [menuAnchor, setMenuAnchor] = useState<MenuAnchor | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isLoading) return <StatementSummarySkeleton />;

  const openMenu = () => {
    menuButtonRef.current?.measureInWindow((x, y, width, height) => {
      setMenuAnchor({ top: y + height + Spacing[2], right: windowWidth - (x + width) });
      setIsMenuOpen(true);
      Haptics.selectionAsync();
    });
  };

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
    balanceLine = delta
      ? {
          value: formatDelta(delta),
          color: delta > 0 ? colors.income : colors.expense,
          icon: delta > 0 ? "arrow-up" : "arrow-down",
          caption: "vs last month",
        }
      : { value: "Same as last month", color: colors.textTertiary };
    incomeCaption = formatVsLastMonth(monthly?.incomeTotalGrowthRate);
    expensesCaption = formatVsLastMonth(monthly?.expenseTotalGrowthRate);
  }

  return (
    <View style={styles.container}>
      <View style={styles.balanceBlock}>
        <View style={styles.captionRow}>
          <Text style={styles.caption}>
            {period === PeriodOptions.YEAR ? "Saved this year" : "Saved this month"}
          </Text>
          {onDelete ? (
            <>
              <Pressable
                ref={menuButtonRef}
                onPress={openMenu}
                hitSlop={HIT_SLOP}
                style={({ pressed }) => [
                  styles.menuButton,
                  (pressed || isMenuOpen) && styles.menuButtonActive,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Statement options"
                accessibilityState={{ expanded: isMenuOpen }}
              >
                <Ionicons
                  name="ellipsis-horizontal"
                  size={17}
                  color={isMenuOpen ? colors.textPrimary : colors.textTertiary}
                />
              </Pressable>

              <StatementMenuModal
                visible={isMenuOpen}
                anchor={menuAnchor}
                onClose={() => setIsMenuOpen(false)}
                onDelete={onDelete}
              />
            </>
          ) : null}
        </View>

        <View
          style={styles.heroRow}
          accessibilityRole="text"
          accessibilityLabel={`Saved ${formatCurrency(balance)}`}
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
