import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IStatement } from "@ledger/api";
import { formatCurrency } from "@/utils/format";
import { Colors } from "@/styles/tokens";
import { styles } from "./SpendingByCategory.styles";

interface SpendingByCategoryProps {
  data?: IStatement;
}

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const CATEGORY_ICONS: Record<string, IconName> = {
  restaurants: "restaurant-outline",
  healthcare: "medkit-outline",
  shopping: "bag-outline",
  groceries: "cart-outline",
  transportation: "car-outline",
  entertainment: "film-outline",
  utilities: "flash-outline",
  salary: "cash-outline",
  rent: "home-outline",
  other: "ellipsis-horizontal-circle-outline",
};

export default function SpendingByCategory({ data }: SpendingByCategoryProps) {
  const categories = data?.spendingByCategory ?? [];
  const totalValue = categories.reduce(
    (sum, category) => sum + category.value,
    0,
  );

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Breakdown</Text>
        <Text style={styles.title}>Spending by Category</Text>
      </View>

      <View style={styles.divider} />

      {categories.length > 0 ? (
        <>
          <View style={styles.list}>
            {categories.map((category, index) => {
              const share =
                totalValue > 0
                  ? Math.round((category.value / totalValue) * 100)
                  : 0;

              return (
                <View key={category.label}>
                  <View style={styles.row}>
                    <View
                      style={[
                        styles.iconBadge,
                        {
                          borderColor: Colors.brand,
                        },
                      ]}
                    >
                      <Ionicons
                        name={
                          CATEGORY_ICONS[category.label.toLowerCase()] ??
                          "pricetag-outline"
                        }
                        size={14}
                        color={Colors.brand}
                      />
                    </View>

                    <View style={styles.rowContent}>
                      <Text style={styles.label} numberOfLines={1}>
                        {category.label}
                      </Text>
                      <Text style={styles.share}>{share}% of spending</Text>
                    </View>

                    <Text style={styles.amount}>
                      {formatCurrency(category.value)}
                    </Text>
                  </View>
                  {index < categories.length - 1 && (
                    <View style={styles.rowSeparator} />
                  )}
                </View>
              );
            })}
          </View>
        </>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No spending data available.</Text>
        </View>
      )}
    </View>
  );
}
