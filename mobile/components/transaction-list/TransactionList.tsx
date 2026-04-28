import { Text, View, ScrollView } from "react-native";
import { formatCurrency } from "@/utils/format";
import { Colors } from "@/styles/tokens";
import { styles } from "./TransactionListStyles";
import { TransactionType } from "@/utils/sharedTypes";

export interface Transaction {
  date: string;
  description: string;
  credit: number;
  debit: number;
}

interface TransactionListProps {
  transactions?: Transaction[];
  type: TransactionType;
  emptyMessage?: string;
}

export default function TransactionList({
  transactions,
  type,
  emptyMessage = "No transactions found.",
}: TransactionListProps) {
  const isIncome = type === "income";
  const amountColor = isIncome ? Colors.income : Colors.expense;
  const prefix = isIncome ? "+" : "-";

  const getAmount = (t: Transaction) => (isIncome ? t.credit : t.debit);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.dateCol]}>Date</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Description</Text>
        <Text style={[styles.headerCell, styles.amountCol]}>Amount</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        {transactions && transactions.length > 0 ? (
          transactions.map((t, i) => (
            <View
              key={i}
              style={[
                styles.row,
                i < transactions.length - 1 && styles.rowBorder,
              ]}
            >
              <Text style={[styles.dateText, styles.dateCol]}>{t.date}</Text>
              <Text style={[styles.descText, { flex: 1 }]} numberOfLines={1}>
                {t.description}
              </Text>
              <Text style={[styles.amountText, styles.amountCol, { color: amountColor }]}>
                {prefix}{formatCurrency(getAmount(t))}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{emptyMessage}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
