import { formatCurrency } from "@/utils/format";
import { TransactionType } from "@/utils/sharedTypes";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { getStyles } from "./SummaryCard.styles";
import { Colors, FontSize } from "@/styles/tokens";

interface SummaryCardProps {
  title: string;
  value?: number;
  growthRate?: number;
  description: string;
  variant: TransactionType;
}

export default function SummaryCard({
  title,
  value,
  description,
  variant,
  growthRate,
}: SummaryCardProps) {
  const styles = getStyles(variant);

  const rate = growthRate ?? 0;
  const isNeutral = rate === 0;
  const isPositive = rate > 0;
  const sign = isPositive ? "+" : "";
  const absRate = Math.abs(rate).toFixed(1);

  const styleBasedOnGrowth = isNeutral
    ? styles.growthPillNeutral
    : isPositive
      ? styles.growthPillPositive
      : styles.growthPillNegative;

  const iconColor = isNeutral
    ? Colors.mutedForeground
    : isPositive
      ? Colors.income
      : Colors.expense;

  return (
    <View style={styles.card}>
      <View style={styles.accentBar} />

      <View style={styles.row}>
        <View style={styles.textGroup}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>
            {value !== undefined ? formatCurrency(value) : "—"}
          </Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        {growthRate !== undefined && (
          <View style={[styles.growthPill, styleBasedOnGrowth]}>
            {!isNeutral && (
              <Ionicons
                name={isPositive ? "arrow-up" : "arrow-down"}
                size={FontSize.sm}
                color={iconColor}
              />
            )}
            <Text style={[styles.growthText, { color: iconColor }]}>
              {sign}
              {absRate}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
