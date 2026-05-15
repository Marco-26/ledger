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
    paddingVertical: Spacing[4],
  },
  historyDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[1],
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[3],
  },
  tab: {
    paddingHorizontal: Spacing[4],
    paddingVertical: 6,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: Colors.muted,
  },
  tabActive: {
    backgroundColor: Colors.background,
  },
  tabText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.sans,
    fontWeight: "500",
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
  },
  countBadge: {
    marginLeft: "auto",
    backgroundColor: Colors.muted,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing[2],
    paddingVertical: 3,
    minWidth: 28,
    alignItems: "center",
  },
  countBadgeText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.sans,
    fontWeight: "600",
    color: Colors.mutedForeground,
    letterSpacing: 0.3,
  },
  historyList: {
    paddingHorizontal: Spacing[4],
    paddingBottom: Spacing[4],
  },
  container: {
    gap: Spacing[1],
  },
  label: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.sans,
    color: Colors.mutedForeground,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontWeight: "500",
  },
  title: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.sans,
    color: Colors.foreground,
    fontWeight: "600",
  },
});
