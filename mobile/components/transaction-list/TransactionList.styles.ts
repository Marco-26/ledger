import { StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Spacing } from "@/styles/tokens";

export const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    maxHeight: 320,
  },
  row: {
    flexDirection: "column",
    paddingHorizontal: Spacing[4],
    paddingVertical: 11,
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
  dateText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.mono,
    color: Colors.mutedForeground,
  },
  descText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.sans,
    color: Colors.foreground,
  },
  amountText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.mono,
    fontWeight: "600",
    textAlign: "right",
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
