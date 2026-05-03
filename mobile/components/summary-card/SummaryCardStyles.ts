import { StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Radius, Spacing } from "@/styles/tokens";

type Variant = "income" | "expense" | "neutral";

const variantTokens = {
  income: {
    accentBar: Colors.income,
    iconBg: Colors.incomeMuted,
    value: Colors.income,
    border: "rgba(74,222,128,0.2)",
  },
  expense: {
    accentBar: Colors.expense,
    iconBg: Colors.expenseMuted,
    value: Colors.expense,
    border: "rgba(248,113,113,0.2)",
  },
  neutral: {
    accentBar: "rgba(255,255,255,0.15)",
    iconBg: Colors.muted,
    value: Colors.foreground,
    border: Colors.border,
  },
};

export function getStyles(variant: Variant) {
  const t = variantTokens[variant];

  return StyleSheet.create({
    card: {
      backgroundColor: Colors.card,
      borderRadius: Radius.xl,
      borderWidth: 1,
      borderColor: t.border,
      overflow: "hidden",
      padding: Spacing[5],
    },
    accentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      backgroundColor: t.accentBar,
    },
    row: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: Spacing[3],
      marginTop: Spacing[1],
    },
    textGroup: {
      flex: 1,
      gap: Spacing[2],
    },
    title: {
      fontSize: FontSize.xs,
      fontFamily: FontFamily.sans,
      color: Colors.mutedForeground,
      letterSpacing: 1.4,
      textTransform: "uppercase",
      fontWeight: "500",
    },
    value: {
      fontSize: FontSize["2xl"],
      fontFamily: FontFamily.mono,
      color: t.value,
      fontWeight: "500",
      letterSpacing: -0.5,
    },
    description: {
      fontSize: FontSize.xs,
      fontFamily: FontFamily.sans,
      color: Colors.mutedForeground,
    },
    iconBadge: {
      width: 36,
      height: 36,
      borderRadius: Radius.md,
      backgroundColor: t.iconBg,
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
