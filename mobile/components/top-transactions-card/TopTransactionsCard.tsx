import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatCurrency } from "@/utils/format";
import { getStyles } from "./TopTransactionsCard.styles";
import { TransactionType } from "@/utils/sharedTypes";
import { ICON_COLOR_MAPPER } from "@/styles/global";
import { ITransaction } from "@ledger/api";
import { Constants } from "@/utils/constants";

interface TopTransactionsCardProps {
  title: string;
  description: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  variant: TransactionType;
  data?: ITransaction[];
}

export default function TopTransactionsCard({
  title,
  description,
  iconName,
  variant,
  data,
}: TopTransactionsCardProps) {
  const isIncome = variant === TransactionType.INCOME;
  const styles = getStyles(variant);
  const accentColor = ICON_COLOR_MAPPER[variant];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <Ionicons name={iconName} size={15} color={accentColor} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.list}>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <View key={index}>
              <View style={styles.row}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rank}>{index + 1}</Text>
                </View>
                <View style={styles.rowContent}>
                  <Text style={styles.rowDescription} numberOfLines={1}>
                    {item.description}
                  </Text>
                  <Text style={styles.rowDate}>
                    {item.date.format(Constants.UI.DATE_FORMAT_DISPLAY)}
                  </Text>
                </View>
                <Text style={styles.rowAmount}>
                  {isIncome ? "+" : "-"}
                  {formatCurrency(isIncome ? item.credit : item.debit)}
                </Text>
              </View>
              {index < data.length - 1 && <View style={styles.rowSeparator} />}
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
