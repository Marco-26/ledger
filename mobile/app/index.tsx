import CashFlowChart from "@/components/cash-flow-chart/CashFlowChart";
import Header from "@/components/header/Header";
import SummaryCard from "@/components/summary-card/SummaryCard";
import TopTransactionsCard from "@/components/top-transactions-card/TopTransactionsCard";
import { TransactionHistory } from "@/components/transaction-history/TransactionHistory";
import { useStatements } from "@/hooks/useStatements";
import { Colors, Spacing } from "@/styles/tokens";
import { Constants } from "@/utils/constants";
import { TransactionType } from "@/utils/sharedTypes";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

export default function Index() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const { data } = useStatements({
    selectedMonth: selectedDate.date(1).format(Constants.UI.DATE_FORMAT),
  });

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <Header selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CashFlowChart transactions={data?.dailyTransactions} />

        <View style={styles.summaryGrid}>
          <SummaryCard
            title="Money In"
            value={data?.creditTotal}
            description="Total credit transactions"
            variant={TransactionType.INCOME}
            growthRate={data?.creditTotalGrowthRate}
          />
          <SummaryCard
            title="Money Out"
            value={data?.debitTotal}
            description="Total debit transactions"
            variant={TransactionType.EXPENSE}
            growthRate={data?.debitTotalGrowthRate}
          />
          <SummaryCard
            title="Net Balance"
            value={data?.netBalance}
            description="Income minus expenses"
            variant={TransactionType.NEUTRAL}
            growthRate={data?.netBalanceTotalGrowthRate}
          />
        </View>

        <View style={styles.topTransGrid}>
          <TopTransactionsCard
            title="Top Earnings"
            description="Highest income sources"
            iconName="trending-up"
            variant={TransactionType.INCOME}
            data={data?.topIncomes}
          />
          <TopTransactionsCard
            title="Top Spending"
            description="Highest expense categories"
            iconName="trending-down"
            variant={TransactionType.EXPENSE}
            data={data?.topExpenses}
          />
        </View>

        <TransactionHistory data={data} />

        <View style={{ height: Spacing[10] }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[3],
    gap: Spacing[4],
  },
  summaryGrid: {
    gap: Spacing[3],
  },
  topTransGrid: {
    gap: Spacing[3],
  },
});
