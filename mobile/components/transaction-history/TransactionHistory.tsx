import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./TransactionHistory.styles";
import { Colors } from "@/styles/tokens";
import TransactionList from "../transaction-list/TransactionList";
import { IStatement, TransactionType } from "@/data/StatementDtos";

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
        <Text style={styles.label}>HISTORY</Text>
        <Text style={styles.title}>All Transactions</Text>
      </View>

      <View style={styles.historyDivider} />

      <View style={styles.tabsRow}>
        {(["income", "expenses"] as Tabs[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.tabActive,
              activeTab === tab && {
                borderColor: tab === "income" ? Colors.income : Colors.expense,
              },
            ]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && {
                  color: tab === "income" ? Colors.income : Colors.expense,
                },
              ]}
            >
              {tab === "income" ? "Income" : "Expenses"}
            </Text>
          </TouchableOpacity>
        ))}

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
