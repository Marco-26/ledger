import { Colors, FontFamily, FontSize, Radius, Spacing } from "@/styles/tokens";
import { StyleSheet } from "react-native";

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

/** Per-variant color values for use in dynamic inline styles */
export const variantColors = {
  income: {
    income: Colors.income,
    expense: Colors.expense,
    incomeMuted: Colors.incomeMuted,
    expenseMuted: Colors.expenseMuted,
  },
  expense: {
    income: Colors.income,
    expense: Colors.expense,
    incomeMuted: Colors.incomeMuted,
    expenseMuted: Colors.expenseMuted,
  },
  neutral: {
    income: Colors.income,
    expense: Colors.expense,
    incomeMuted: Colors.incomeMuted,
    expenseMuted: Colors.expenseMuted,
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
      width: 50,
      height: 50,
      borderRadius: Radius.md,
      alignItems: "center",
      justifyContent: "center",
    },
    growthRate: {
      fontSize: FontSize.sm,
      fontFamily: FontFamily.mono,
      color: Colors.foreground,
      fontWeight: "600",
    },
    // ── Growth rate pill (top-right corner) ─────────────────────
    growthPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: 99,
    },
    growthPillPositive: {
      backgroundColor: Colors.incomeMuted,
    },
    growthPillNegative: {
      backgroundColor: Colors.expenseMuted,
    },
    growthArrow: {
      fontSize: FontSize.sm,
      fontWeight: "700",
      lineHeight: 16,
    },
    growthText: {
      fontSize: FontSize.sm,
      fontFamily: FontFamily.mono,
      fontWeight: "700",
      letterSpacing: -0.3,
    },
    growthTextPositive: {
      color: Colors.income,
    },
    growthTextNegative: {
      color: Colors.expense,
    },
  });
}
