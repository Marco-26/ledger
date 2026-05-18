import { StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Radius, Spacing } from "@/styles/tokens";
import { TransactionType } from "@/utils/sharedTypes";

export function getStyles(variant: TransactionType) {
  const isIncome = variant === TransactionType.INCOME;
  const accentColor = isIncome ? Colors.income : Colors.expense;
  const accentBg    = isIncome ? Colors.incomeMuted : Colors.expenseMuted;
  const accentBorder = isIncome
    ? "rgba(61,214,140,0.2)"
    : "rgba(240,107,107,0.2)";

  return StyleSheet.create({
    card: {
      backgroundColor: Colors.card,
      borderRadius: Radius.xl,
      borderWidth: 1,
      borderColor: Colors.border,
      overflow: "hidden",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing[3],
      paddingHorizontal: Spacing[4],
      paddingTop: Spacing[4],
      paddingBottom: Spacing[3],
    },
    iconBadge: {
      width: 32,
      height: 32,
      borderRadius: Radius.sm,
      backgroundColor: accentBg,
      borderWidth: 1,
      borderColor: accentBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    headerText: {
      flex: 1,
      gap: 2,
    },
    title: {
      fontSize: FontSize.sm,
      fontFamily: FontFamily.sans,
      color: Colors.foreground,
      fontWeight: "600",
    },
    description: {
      fontSize: FontSize.xs,
      fontFamily: FontFamily.sans,
      color: Colors.mutedForeground,
    },
    divider: {
      height: 1,
      backgroundColor: Colors.border,
    },
    list: {
      paddingVertical: Spacing[2],
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: Spacing[4],
      paddingVertical: Spacing[3],
      gap: Spacing[3],
    },
    rankBadge: {
      width: 20,
      height: 20,
      borderRadius: Radius.xs,
      backgroundColor: accentBg,
      alignItems: "center",
      justifyContent: "center",
    },
    rank: {
      fontSize: FontSize["2xs"],
      fontFamily: FontFamily.mono,
      fontWeight: "700",
      color: accentColor,
    },
    rowContent: {
      flex: 1,
      gap: 3,
    },
    rowDescription: {
      fontSize: FontSize.sm,
      fontFamily: FontFamily.sans,
      color: Colors.foreground,
      fontWeight: "500",
    },
    rowDate: {
      fontSize: FontSize.xs,
      fontFamily: FontFamily.mono,
      color: Colors.mutedForeground,
    },
    rowAmount: {
      fontSize: FontSize.sm,
      fontFamily: FontFamily.mono,
      fontWeight: "700",
      color: accentColor,
    },
    rowSeparator: {
      height: 1,
      backgroundColor: Colors.border,
      marginHorizontal: Spacing[4],
    },
    empty: {
      paddingVertical: Spacing[6],
      alignItems: "center",
    },
    emptyText: {
      fontSize: FontSize.sm,
      fontFamily: FontFamily.sans,
      color: Colors.mutedForeground,
    },
  });
}
