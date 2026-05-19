import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./TransactionHistory.styles";
import { Colors } from "@/styles/tokens";
import TransactionList from "../transaction-list/TransactionList";
import { IStatement, TransactionType } from "@ledger/api";

type Tabs = "income" | "expenses";

interface ITransactionHistory {
  data?: IStatement;
}

export function TransactionHistory({ data }: ITransactionHistory) {
  const [activeTab, setActiveTab] = useState<Tabs>("expenses");

  const filteredTransactions =
    activeTab === "income" ? data?.creditList : data?.debitList;

  return (
    <View style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <Text style={styles.eyebrow}>History</Text>
        <Text style={styles.title}>All Transactions</Text>
      </View>

      <View style={styles.historyDivider} />

      <View style={styles.tabsRow}>
        {(["income", "expenses"] as Tabs[]).map((tab) => {
          const isActive = activeTab === tab;
          const tabAccentColor = isActive
            ? tab === "income"
              ? Colors.income
              : Colors.expense
            : undefined;

          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive && styles.tabTextActive,
                  isActive && tabAccentColor
                    ? { color: tabAccentColor }
                    : undefined,
                ]}
              >
                {tab === "income" ? "Income" : "Expenses"}
              </Text>
            </TouchableOpacity>
          );
        })}

        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>
            {filteredTransactions?.length ?? 0}
          </Text>
        </View>
      </View>

      <View style={styles.historyList}>
        <TransactionList
          transactions={filteredTransactions}
          type={
            activeTab === "income"
              ? TransactionType.INCOME
              : TransactionType.EXPENSE
          }
        />
      </View>
    </View>
  );
}
