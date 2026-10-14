import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemedStyles } from "@/styles/theme";
import { formatCurrency } from "@/utils/format";
import { createStyles } from "./TransactionSummary.styles";

interface TransactionSummaryProps {
  label: string;
  amount?: number;
  caption: string;
  /** Semantic colour for the figure — income or expense. */
  color: string;
  /** Soft tint behind the direction arrow. */
  tint: string;
  icon: "arrow-up" | "arrow-down";
}

/** One half of the income / expenses pair under the balance. */
export default function TransactionSummary({
  label,
  amount,
  caption,
  color,
  tint,
  icon,
}: TransactionSummaryProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.column}>
      <View style={styles.head}>
        <View style={[styles.marker, { backgroundColor: tint }]}>
          <Ionicons name={icon} size={11} color={color} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>

      <Text
        style={[styles.value, { color }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
      >
        {formatCurrency(amount ?? 0)}
      </Text>

      <Text style={styles.delta} numberOfLines={2}>
        {caption}
      </Text>
    </View>
  );
}
