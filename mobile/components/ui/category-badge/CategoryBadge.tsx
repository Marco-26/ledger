import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TransactionType } from "@ledger/api";
import { useTheme } from "@/styles/theme";
import { Radius } from "@/styles/tokens";
import { categoryIcon } from "@/utils/categories";

interface CategoryBadgeProps {
  category?: string | null;
  type: TransactionType;
  size?: number;
}

/**
 * The only place colour marks direction inside a list: a soft tinted disc
 * behind the category glyph. Amount colour does the rest.
 */
export default function CategoryBadge({
  category,
  type,
  size = 38,
}: CategoryBadgeProps) {
  const { colors } = useTheme();
  const isIncome = type === TransactionType.INCOME;

  return (
    <View
      style={[
        styles.badge,
        {
          width: size,
          height: size,
          borderRadius: Radius.full,
          backgroundColor: isIncome ? colors.incomeSoft : colors.expenseSoft,
        },
      ]}
    >
      <Ionicons
        name={categoryIcon(category)}
        size={size * 0.45}
        color={isIncome ? colors.income : colors.expense}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    justifyContent: "center",
  },
});
