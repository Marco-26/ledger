import { StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Spacing } from "@/styles/tokens";

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
  },
  container: {
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[5],
    gap: Spacing[4],
  },
  brandRow: {
    gap: Spacing[1],
  },
  eyebrow: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.sans,
    color: Colors.brand,
    letterSpacing: 3,
    textTransform: "uppercase",
    fontWeight: "500",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: FontFamily.display,
    fontSize: FontSize["4xl"],
    color: Colors.foreground,
    lineHeight: FontSize["4xl"] * 1.05,
    letterSpacing: -1,
  },
  titleAccent: {
    color: Colors.brand,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.brand,
    marginBottom: 8,
  },
});
