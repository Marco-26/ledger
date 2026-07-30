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

  hero: {
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[4],
    gap: Spacing[3],
  },
  heroLabel: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.sans,
    color: Colors.mutedForeground,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontWeight: "500",
  },
  heroValue: {
    fontSize: FontSize["2xl"],
    fontFamily: FontFamily.mono,
    fontWeight: "700",
    color: Colors.expense,
    letterSpacing: -0.5,
    marginTop: -Spacing[1],
  },
  distributionTrack: {
    flexDirection: "row",
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.muted,
    overflow: "hidden",
    gap: 3,
  },
  distributionSegment: {
    height: "100%",
    borderRadius: 3,
  },

  // ── Ranked category list ──────────────────────────────────────────────────
  list: {
    paddingVertical: Spacing[2],
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    gap: Spacing[3],
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: Radius.sm,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rowContent: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.sans,
    color: Colors.foreground,
    fontWeight: "500",
  },
  share: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.mono,
    color: Colors.mutedForeground,
  },
  amount: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.mono,
    fontWeight: "700",
    color: Colors.foreground,
  },
  rowSeparator: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing[4],
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
