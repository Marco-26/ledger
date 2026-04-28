import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatCurrency } from "@/utils/format";
import { getStyles } from "./TopTransactionsCardStyles";
import { TransactionType } from "@/utils/sharedTypes";
import { ICON_COLOR_MAPPER } from "@/styles/global";

export interface Transaction {
  date: string;
  description: string;
  credit: number;
  debit: number;
}

interface TopTransactionsCardProps {
  title: string;
  description: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  variant: TransactionType;
  data?: Transaction[];
}

export default function TopTransactionsCard({
  title,
  description,
  iconName,
  variant,
  data,
}: TopTransactionsCardProps) {
  const isIncome = variant === "income";
  const styles = getStyles(variant);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <Ionicons name={iconName} size={14} color={ICON_COLOR_MAPPER[variant]} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Rows */}
      <View style={styles.list}>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={[styles.rank, { color: ICON_COLOR_MAPPER[variant] }]}>
                {index + 1}
              </Text>
              <View style={styles.rowContent}>
                <Text style={styles.rowDescription} numberOfLines={1}>
                  {item.description}
                </Text>
                <Text style={styles.rowDate}>{item.date}</Text>
              </View>
              <Text style={[styles.rowAmount, { color: ICON_COLOR_MAPPER[variant] }]}>
                {isIncome ? "+" : "-"}
                {formatCurrency(isIncome ? item.credit : item.debit)}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No records found.</Text>
          </View>
        )}
      </View>
    </View>
  );
}
