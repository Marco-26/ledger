import { Text, View } from "react-native";
import { TransactionType, type ITransactionCategory } from "@ledger/api";
import SectionHeading from "@/components/ui/section-heading/SectionHeading";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import { useTheme, useThemedStyles } from "@/styles/theme";
import { Spacing } from "@/styles/tokens";
import { categoryLabel } from "@/utils/categories";
import { formatCurrency, formatPercent } from "@/utils/format";
import { createStyles } from "./CategoryBreakdown.styles";

interface CategoryBreakdownProps {
  categories?: ITransactionCategory[];
  isLoading: boolean;
}

const MAX_ROWS = 5;

/**
 * The one piece of chart on the dashboard: where the month's spending went,
 * as hairline bars rather than a pie.
 */
export default function CategoryBreakdown({
  categories,
  isLoading,
}: CategoryBreakdownProps) {
  const styles = useThemedStyles(createStyles);
  const { colors } = useTheme();

  const expenses = (categories ?? [])
    .filter((category) => category.type === TransactionType.EXPENSE)
    .sort((a, b) => b.amount - a.amount);

  const visible = expenses.slice(0, MAX_ROWS);
  const hidden = expenses.length - visible.length;
  const largest = visible[0]?.percentage ?? 0;

  return (
    <View>
      <SectionHeading title="Where it went" />

      {isLoading ? (
        <View style={styles.list}>
          {Array.from({ length: 4 }).map((_, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.rowHead}>
                <Skeleton width="40%" height={13} />
                <Skeleton width={64} height={11} />
              </View>
              <Skeleton width="100%" height={3} />
            </View>
          ))}
        </View>
      ) : visible.length > 0 ? (
        <View style={styles.list}>
          {visible.map((category) => {
            // Bars are scaled against the largest slice so small categories
            // stay readable instead of collapsing to a dot.
            const ratio = largest > 0 ? category.percentage / largest : 0;

            return (
              <View
                key={category.label}
                style={styles.row}
                accessibilityRole="text"
                accessibilityLabel={`${categoryLabel(category.label)}, ${formatCurrency(category.amount)}, ${formatPercent(category.percentage)} of expenses`}
              >
                <View style={styles.rowHead}>
                  <Text style={styles.label} numberOfLines={1}>
                    {categoryLabel(category.label)}
                  </Text>
                  <Text style={styles.amount} numberOfLines={1}>
                    {formatCurrency(category.amount)}
                  </Text>
                  <Text style={styles.share}>
                    {formatPercent(category.percentage)}
                  </Text>
                </View>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      {
                        backgroundColor: colors.expense,
                        width: `${Math.max(2, Math.round(ratio * 100))}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}

          {hidden > 0 ? (
            <Text style={styles.footnote}>
              +{hidden} more {hidden === 1 ? "category" : "categories"}
            </Text>
          ) : null}
        </View>
      ) : (
        <Text style={[styles.empty, { marginBottom: Spacing[1] }]}>
          No spending recorded this month.
        </Text>
      )}
    </View>
  );
}
