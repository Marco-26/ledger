import { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "@/components/header/Header";
import SummaryCard from "@/components/summary-card/SummaryCard";
import TopTransactionsCard from "@/components/top-transactions-card/TopTransactionsCard";
import TransactionList from "@/components/transaction-list/TransactionList";
import SectionHeader from "@/components/section-header/SectionHeader";
import { Colors, FontFamily, FontSize, Radius, Spacing } from "@/styles/tokens";
import { TransactionType } from "@/utils/sharedTypes";
import { useStatements } from "@/hooks/useStatements";
import dayjs, { Dayjs } from "dayjs";
import { Constants } from "@/utils/constants";
import CashFlowChart from "@/components/cash-flow-chart/CashFlowChart";

type TxTab = "income" | "expenses";

export default function Index() {
  const [activeTab, setActiveTab] = useState<TxTab>("expenses");
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
        <View style={styles.summaryGrid}>
          <SummaryCard
            title="Money In"
            value={data?.creditTotal}
            description="Total credit transactions"
            iconName="arrow-up"
            variant={TransactionType.INCOME}
          />
          <SummaryCard
            title="Money Out"
            value={data?.debitTotal}
            description="Total debit transactions"
            iconName="arrow-down"
            variant={TransactionType.EXPENSE}
          />
          <SummaryCard
            title="Net Balance"
            value={data?.netBalance}
            description="Income minus expenses"
            iconName="scale"
            variant={TransactionType.NEUTRAL}
          />
        </View>

        <CashFlowChart transactions={data?.transactionListFiltered} />

        <View style={styles.section}>
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
        </View>

        <View style={styles.section}>
          <View style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <SectionHeader label="History" title="All Transactions" />
            </View>

            <View style={styles.historyDivider} />

            <View style={styles.tabsRow}>
              {(["income", "expenses"] as TxTab[]).map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tab,
                    activeTab === tab && styles.tabActive,
                    activeTab === tab && {
                      borderColor:
                        tab === "income" ? Colors.income : Colors.expense,
                    },
                  ]}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && {
                        color:
                          tab === "income" ? Colors.income : Colors.expense,
                      },
                    ]}
                  >
                    {tab === "income" ? "Income" : "Expenses"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.historyList}>
              <TransactionList
                transactions={
                  activeTab === "income" ? data?.creditList : data?.debitList
                }
                type={
                  activeTab === "income"
                    ? TransactionType.INCOME
                    : TransactionType.EXPENSE
                }
                emptyMessage={
                  activeTab === "income"
                    ? "No income transactions found."
                    : "No expense transactions found."
                }
              />
            </View>
          </View>
        </View>

        <View style={{ height: Spacing[8] }} />
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
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[4],
    gap: Spacing[4],
  },
  summaryGrid: {
    gap: Spacing[3],
  },
  section: {
    gap: Spacing[3],
  },
  topTransGrid: {
    gap: Spacing[3],
  },
  // History card
  historyCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  historyHeader: {
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[4],
  },
  historyDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  tabsRow: {
    flexDirection: "row",
    gap: Spacing[1],
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[3],
  },
  tab: {
    paddingHorizontal: Spacing[4],
    paddingVertical: 6,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: Colors.muted,
  },
  tabActive: {
    backgroundColor: Colors.background,
  },
  tabText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.sans,
    fontWeight: "500",
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
  },
  historyList: {
    paddingHorizontal: Spacing[4],
    paddingBottom: Spacing[4],
  },
});
