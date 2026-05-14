import { formatCurrency } from "@/utils/format";
import { TransactionType } from "@/utils/sharedTypes";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { getStyles } from "./SummaryCardStyles";

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

  const isPositive = (growthRate ?? 0) >= 0;
  const sign = isPositive ? "+" : "";
  const absRate = Math.abs(growthRate ?? 0).toFixed(1);

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
          <View
            style={[
              styles.growthPill,
              isPositive
                ? styles.growthPillPositive
                : styles.growthPillNegative,
            ]}
          >
            <Text
              style={[
                styles.growthArrow,
                isPositive
                  ? styles.growthTextPositive
                  : styles.growthTextNegative,
              ]}
            >
              {isPositive ? (
                <Ionicons name="arrow-up" />
              ) : (
                <Ionicons name="arrow-down" />
              )}
            </Text>
            <Text
              style={[
                styles.growthText,
                isPositive
                  ? styles.growthTextPositive
                  : styles.growthTextNegative,
              ]}
            >
              {sign}
              {absRate}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
