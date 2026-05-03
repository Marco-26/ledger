import { StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Radius, Spacing } from "@/styles/tokens";
import { TransactionType } from "@/utils/sharedTypes";

export function getStyles(variant: TransactionType) {
  const isIncome = variant === "income";
  const iconBg = isIncome ? Colors.incomeMuted : Colors.expenseMuted;

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
      paddingVertical: Spacing[3],
    },
    iconBadge: {
      width: 30,
      height: 30,
      borderRadius: Radius.sm,
      backgroundColor: iconBg,
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
      padding: Spacing[2],
      gap: 2,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing[3],
      paddingHorizontal: Spacing[3],
      paddingVertical: 10,
      borderRadius: Radius.md,
    },
    rank: {
      fontSize: FontSize.xs,
      fontFamily: FontFamily.mono,
      fontWeight: "500",
      width: 14,
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
      fontWeight: "600",
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
