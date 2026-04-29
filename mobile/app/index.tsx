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

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_TOP_INCOMES = [
  { date: "03-04-2025", description: "Salary — April", credit: 2850.0, debit: 0 },
  { date: "15-04-2025", description: "Freelance Invoice #42", credit: 640.0, debit: 0 },
  { date: "22-04-2025", description: "Tax Refund", credit: 312.5, debit: 0 },
];

const MOCK_TOP_EXPENSES = [
  { date: "01-04-2025", description: "Rent — April", credit: 0, debit: 950.0 },
  { date: "08-04-2025", description: "Grocery Store", credit: 0, debit: 187.4 },
  { date: "14-04-2025", description: "Electricity Bill", credit: 0, debit: 112.3 },
];

const MOCK_INCOME_LIST = [
  { date: "03-04-2025", description: "Salary — April", credit: 2850.0, debit: 0 },
  { date: "15-04-2025", description: "Freelance Invoice #42", credit: 640.0, debit: 0 },
  { date: "18-04-2025", description: "Bank Interest", credit: 4.2, debit: 0 },
  { date: "22-04-2025", description: "Tax Refund", credit: 312.5, debit: 0 },
  { date: "28-04-2025", description: "Side Project Revenue", credit: 95.0, debit: 0 },
];

const MOCK_EXPENSE_LIST = [
  { date: "01-04-2025", description: "Rent — April", credit: 0, debit: 950.0 },
  { date: "02-04-2025", description: "Internet & Phone", credit: 0, debit: 45.9 },
  { date: "05-04-2025", description: "Coffee Shop", credit: 0, debit: 12.4 },
  { date: "08-04-2025", description: "Grocery Store", credit: 0, debit: 187.4 },
  { date: "10-04-2025", description: "Streaming Services", credit: 0, debit: 28.97 },
  { date: "14-04-2025", description: "Electricity Bill", credit: 0, debit: 112.3 },
  { date: "17-04-2025", description: "Restaurant", credit: 0, debit: 62.0 },
  { date: "20-04-2025", description: "Pharmacy", credit: 0, debit: 23.5 },
  { date: "25-04-2025", description: "Transport", credit: 0, debit: 34.0 },
];

const CREDIT_TOTAL = MOCK_INCOME_LIST.reduce((s, t) => s + t.credit, 0);
const DEBIT_TOTAL = MOCK_EXPENSE_LIST.reduce((s, t) => s + t.debit, 0);
const NET_BALANCE = CREDIT_TOTAL - DEBIT_TOTAL;

// ─────────────────────────────────────────────────────────────────────────────

type TxTab = "income" | "expenses";

export default function Index() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [activeTab, setActiveTab] = useState<TxTab>("expenses");

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <Header
        year={year}
        month={month}
        onMonthChange={(y, m) => {
          setYear(y);
          setMonth(m);
        }}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryGrid}>
          <SummaryCard
            title="Money In"
            value={CREDIT_TOTAL}
            description="Total credit transactions"
            iconName="arrow-up"
            variant={TransactionType.INCOME}
          />
          <SummaryCard
            title="Money Out"
            value={DEBIT_TOTAL}
            description="Total debit transactions"
            iconName="arrow-down"
            variant={TransactionType.EXPENSE}
          />
          <SummaryCard
            title="Net Balance"
            value={NET_BALANCE}
            description="Income minus expenses"
            iconName="scale"
            variant={TransactionType.NEUTRAL}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.topTransGrid}>
            <TopTransactionsCard
              title="Top Earnings"
              description="Highest income sources"
              iconName="trending-up"
              variant={TransactionType.INCOME}
              data={MOCK_TOP_INCOMES}
            />
            <TopTransactionsCard
              title="Top Spending"
              description="Highest expense categories"
              iconName="trending-down"
              variant={TransactionType.EXPENSE}
              data={MOCK_TOP_EXPENSES}
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
                  activeTab === "income" ? MOCK_INCOME_LIST : MOCK_EXPENSE_LIST
                }
                type={activeTab === "income" ? TransactionType.INCOME : TransactionType.EXPENSE}
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
