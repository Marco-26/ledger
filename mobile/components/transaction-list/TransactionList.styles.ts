import { Colors, FontFamily, FontSize, Spacing } from "@/styles/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    maxHeight: 360,
  },
  row: {
    flexDirection: "column",
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    gap: Spacing[1],
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  rowMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.sans,
    color: Colors.foreground,
    fontWeight: "500",
  },
  dateText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.mono,
    color: Colors.mutedForeground,
  },
  amountText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.mono,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  empty: {
    paddingVertical: Spacing[8],
    alignItems: "center",
  },
  emptyText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.sans,
    color: Colors.mutedForeground,
  },
});
