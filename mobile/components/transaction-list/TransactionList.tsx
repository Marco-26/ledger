import { Text, View, ScrollView } from "react-native";
import { formatCurrency } from "@/utils/format";
import { Colors } from "@/styles/tokens";
import { styles } from "./TransactionList.styles";
import { TransactionType } from "@/utils/sharedTypes";
import { ITransaction } from "@/data/StatementDtos";
import { Constants } from "@/utils/constants";

interface TransactionListProps {
  transactions?: ITransaction[];
  type: TransactionType;
}

export default function TransactionList({
  transactions,
  type,
}: TransactionListProps) {
  const isIncome = type === TransactionType.INCOME;
  const amountColor = isIncome ? Colors.income : Colors.expense;
  const prefix = isIncome ? "+" : "-";

  const getAmount = (t: ITransaction) => (isIncome ? t.credit : t.debit);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        {transactions && transactions.length > 0 ? (
          transactions.map((t, i) => (
            <View
              key={i}
              style={[
                styles.row,
                i < transactions.length - 1 && styles.rowBorder,
              ]}
            >
              <Text style={styles.descText} numberOfLines={1}>
                {t.description}
              </Text>
              <View style={styles.rowMeta}>
                <Text style={styles.dateText}>
                  {t.date.format(Constants.UI.DATE_FORMAT_DISPLAY)}
                </Text>
                <Text style={[styles.amountText, { color: amountColor }]}>
                  {prefix}{formatCurrency(getAmount(t))}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No transactions found.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
