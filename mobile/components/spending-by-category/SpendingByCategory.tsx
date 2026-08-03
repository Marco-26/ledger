import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IStatement, TransactionType } from "@ledger/api";
import { formatCurrency } from "@/utils/format";
import { Colors } from "@/styles/tokens";
import { styles } from "./SpendingByCategory.styles";

interface SpendingByCategoryProps {
  data?: IStatement;
}

type Tabs = "income" | "expenses";

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
  const [activeTab, setActiveTab] = useState<Tabs>("income");

  const activeType =
    activeTab === "income" ? TransactionType.INCOME : TransactionType.EXPENSE;
  const categories = (data?.transactionCategories ?? []).filter(
    (category) => category.type === activeType,
  );
  const totalValue = categories.reduce(
    (sum, category) => sum + category.amount,
    0,
  );

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Breakdown</Text>
        <Text style={styles.title}>Spending by Category</Text>
      </View>

      <View style={styles.divider} />

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
      </View>

      {categories.length > 0 ? (
        <View style={styles.list}>
          {categories.map((category, index) => {
            const share =
              totalValue > 0
                ? Math.round((category.amount / totalValue) * 100)
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
                    <Text style={styles.share}>
                      {share}% of {activeTab}
                    </Text>
                  </View>

                  <Text style={styles.amount}>
                    {formatCurrency(category.amount)}
                  </Text>
                </View>
                {index < categories.length - 1 && (
                  <View style={styles.rowSeparator} />
                )}
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No {activeTab} data available.</Text>
        </View>
      )}
    </View>
  );
}
