import { StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Radius, Spacing } from "@/styles/tokens";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
    maxHeight: 320,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2],
    backgroundColor: Colors.muted,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing[3],
  },
  headerCell: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.sans,
    color: Colors.mutedForeground,
    fontWeight: "500",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  dateCol: {
    width: 76,
  },
  amountCol: {
    width: 90,
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing[4],
    paddingVertical: 11,
    gap: Spacing[3],
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
    fontSize: FontSize.sm,
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
