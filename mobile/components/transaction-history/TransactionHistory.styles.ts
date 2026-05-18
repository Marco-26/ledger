import { Colors, FontFamily, FontSize, Radius, Spacing } from "@/styles/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  historyCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  historyHeader: {
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
  historyDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[2],
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[3],
    paddingBottom: Spacing[2],
  },
  tab: {
    paddingHorizontal: Spacing[4],
    paddingVertical: 7,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: Colors.muted,
  },
  tabActive: {
    backgroundColor: Colors.cardElevated,
    borderColor: Colors.borderMid,
  },
  tabText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.sans,
    fontWeight: "500",
    color: Colors.mutedForeground,
    letterSpacing: 0.4,
  },
  tabTextActive: {
    color: Colors.foreground,
  },
  countBadge: {
    marginLeft: "auto",
    backgroundColor: Colors.muted,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing[2],
    paddingVertical: 4,
    minWidth: 28,
    alignItems: "center",
  },
  countBadgeText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.mono,
    fontWeight: "600",
    color: Colors.mutedForeground,
  },
  historyList: {
    paddingBottom: Spacing[2],
  },
});
