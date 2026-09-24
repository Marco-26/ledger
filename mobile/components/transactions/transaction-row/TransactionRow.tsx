import { memo } from "react";
import { Text, View } from "react-native";
import { TransactionType, type ITransaction } from "@ledger/api";
import CategoryBadge from "@/components/ui/category-badge/CategoryBadge";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { categoryLabel } from "@/utils/categories";
import { formatCurrency, formatShortDate } from "@/utils/format";
import { createStyles } from "./TransactionRow.styles";

interface TransactionRowProps {
  transaction: ITransaction;
  /** Off when the list is already grouped under a date header. */
  showDate?: boolean;
}

/**
 * One movement. Used by both the dashboard highlights and the full list so a
 * transaction always looks the same wherever it appears.
 */
function TransactionRow({ transaction, showDate = true }: TransactionRowProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();

  const isIncome = transaction.type === TransactionType.INCOME;
  const amountColor = isIncome ? colors.income : colors.expense;
  const amount = `${isIncome ? "+" : "-"}${formatCurrency(Math.abs(transaction.amount))}`;
  const meta = [
    categoryLabel(transaction.category),
    showDate ? formatShortDate(transaction.date) : null,
  ]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <View
      style={styles.row}
      accessibilityRole="text"
      accessibilityLabel={`${transaction.description}, ${meta}, ${amount}`}
    >
      <CategoryBadge category={transaction.category} type={transaction.type} />

      <View style={styles.body}>
        <Text style={styles.description} numberOfLines={1}>
          {transaction.description || categoryLabel(transaction.category)}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {meta}
        </Text>
      </View>

      <Text style={[styles.amount, { color: amountColor }]} numberOfLines={1}>
        {amount}
      </Text>
    </View>
  );
}

export default memo(TransactionRow);
