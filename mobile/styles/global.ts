import { StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize } from "./tokens";
import { TransactionType } from "@/utils/sharedTypes";

export const Typography = StyleSheet.create({
  label: {
    fontSize: FontSize.xs,
    color: Colors.mutedForeground,
    fontFamily: FontFamily.sans,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: FontSize.base,
    color: Colors.foreground,
    fontFamily: FontFamily.sans,
    fontWeight: "600",
  },
  body: {
    fontSize: FontSize.sm,
    color: Colors.foreground,
    fontFamily: FontFamily.sans,
  },
  bodyMuted: {
    fontSize: FontSize.sm,
    color: Colors.mutedForeground,
    fontFamily: FontFamily.sans,
  },
  mono: {
    fontFamily: FontFamily.mono,
    fontVariant: ["tabular-nums"],
  },
});

export const ICON_COLOR_MAPPER: Record<TransactionType, string> = {
  income: Colors.income,
  expense : Colors.expense,
  neutral: Colors.mutedForeground
}
