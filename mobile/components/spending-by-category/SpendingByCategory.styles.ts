import { Colors, FontFamily, FontSize, Radius, Spacing } from "@/styles/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[3],
    gap: Spacing[1],
  },
  eyebrow: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.sans,
    color: Colors.mutedForeground,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontWeight: "500",
  },
  title: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.sans,
    color: Colors.foreground,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  list: {
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[4],
    gap: Spacing[4],
  },
  row: {
    gap: Spacing[2],
  },
  rowTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing[3],
  },
  label: {
    flexShrink: 1,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.sans,
    color: Colors.foreground,
    fontWeight: "500",
  },
  amount: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.mono,
    fontWeight: "700",
    color: Colors.expense,
  },
  track: {
    height: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.muted,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: Radius.full,
    backgroundColor: Colors.expense,
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
