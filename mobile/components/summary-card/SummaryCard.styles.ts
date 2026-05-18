import { Colors, FontFamily, FontSize, Radius, Spacing } from "@/styles/tokens";
import { StyleSheet } from "react-native";

type Variant = "income" | "expense" | "neutral";

const variantTokens = {
  income: {
    accentColor: Colors.income,
    valueColor: Colors.income,
    border: "rgba(61,214,140,0.15)",
    glowColor: Colors.income,
    pillBg: Colors.incomeMuted,
    pillBorder: "rgba(61,214,140,0.25)",
  },
  expense: {
    accentColor: Colors.expense,
    valueColor: Colors.expense,
    border: "rgba(240,107,107,0.15)",
    glowColor: Colors.expense,
    pillBg: Colors.expenseMuted,
    pillBorder: "rgba(240,107,107,0.25)",
  },
  neutral: {
    accentColor: Colors.brand,
    valueColor: Colors.foreground,
    border: "rgba(200,169,110,0.15)",
    glowColor: Colors.brand,
    pillBg: Colors.brandMuted,
    pillBorder: "rgba(200,169,110,0.25)",
  },
} as const;

export function getStyles(variant: Variant) {
  const t = variantTokens[variant];

  return StyleSheet.create({
    card: {
      backgroundColor: Colors.card,
      borderRadius: Radius.xl,
      borderWidth: 1,
      borderColor: t.border,
      overflow: "hidden",
      flexDirection: "row",
    },
    accentBar: {
      width: 3,
      backgroundColor: t.accentColor,
    },
    content: {
      flex: 1,
      padding: Spacing[4],
      gap: Spacing[2],
    },
    topRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    title: {
      fontSize: FontSize.xs,
      fontFamily: FontFamily.sans,
      color: Colors.mutedForeground,
      letterSpacing: 1.6,
      textTransform: "uppercase",
      fontWeight: "500",
    },
    value: {
      fontSize: FontSize["3xl"],
      fontFamily: FontFamily.mono,
      color: t.valueColor,
      fontWeight: "500",
      letterSpacing: -0.5,
      lineHeight: FontSize["3xl"] * 1.1,
    },
    description: {
      fontSize: FontSize.xs,
      fontFamily: FontFamily.sans,
      color: Colors.mutedForeground,
      marginTop: Spacing[1],
    },
    growthPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      paddingHorizontal: Spacing[2],
      paddingVertical: 5,
      borderRadius: Radius.full,
      borderWidth: 1,
      backgroundColor: t.pillBg,
      borderColor: t.pillBorder,
    },
    growthPillPositive: {
      backgroundColor: Colors.incomeMuted,
      borderColor: "rgba(61,214,140,0.25)",
    },
    growthPillNegative: {
      backgroundColor: Colors.expenseMuted,
      borderColor: "rgba(240,107,107,0.25)",
    },
    growthPillNeutral: {
      backgroundColor: Colors.muted,
      borderColor: Colors.border,
    },
    growthText: {
      fontSize: FontSize.xs,
      fontFamily: FontFamily.mono,
      fontWeight: "700",
      letterSpacing: -0.2,
    },
  });
}

/** Per-variant color values for use in dynamic inline styles */
export const variantColors = {
  income: { value: Colors.income },
  expense: { value: Colors.expense },
  neutral: { value: Colors.foreground },
} as const;
