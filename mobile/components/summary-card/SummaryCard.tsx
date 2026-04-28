import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatCurrency } from "@/utils/format";
import { getStyles } from "./SummaryCardStyles";
import { TransactionType } from "@/utils/sharedTypes";
import { ICON_COLOR_MAPPER } from "@/styles/global";

interface SummaryCardProps {
  title: string;
  value?: number;
  description: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  variant: TransactionType;
}

export default function SummaryCard({
  title,
  value,
  description,
  iconName,
  variant,
}: SummaryCardProps) {

  const styles = getStyles(variant);

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

        <View style={styles.iconBadge}>
          <Ionicons name={iconName} size={16} color={ICON_COLOR_MAPPER[variant]} />
        </View>
      </View>
    </View>
  );
}
