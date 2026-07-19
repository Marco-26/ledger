import { Text, View } from "react-native";
import { IStatement } from "@ledger/api";
import { formatCurrency } from "@/utils/format";
import { styles } from "./SpendingByCategory.styles";

interface SpendingByCategoryProps {
  data?: IStatement;
}

export default function SpendingByCategory({ data }: SpendingByCategoryProps) {
  const categories = data?.spendingByCategory ?? [];
  const maxValue =
    categories.length > 0
      ? Math.max(...categories.map((category) => category.value))
      : 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Breakdown</Text>
        <Text style={styles.title}>Spending by Category</Text>
      </View>

      <View style={styles.divider} />

      {categories.length > 0 ? (
        <View style={styles.list}>
          {categories.map((category) => (
            <View key={category.label} style={styles.row}>
              <View style={styles.rowTop}>
                <Text style={styles.label} numberOfLines={1}>
                  {category.label}
                </Text>
                <Text style={styles.amount}>
                  {formatCurrency(category.value)}
                </Text>
              </View>
              <View style={styles.track}>
                <View
                  style={[
                    styles.fill,
                    {
                      width: `${maxValue > 0 ? (category.value / maxValue) * 100 : 0}%`,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No spending data available.</Text>
        </View>
      )}
    </View>
  );
}
