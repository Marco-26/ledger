import { StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Spacing } from "@/styles/tokens";

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
  },
  container: {
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[5],
    paddingBottom: Spacing[4],
    gap: Spacing[4],
  },
  brandRow: {
    gap: Spacing[1],
  },
  title: {
    fontFamily: FontFamily.display,
    fontSize: FontSize["4xl"],
    color: Colors.foreground,
    lineHeight: FontSize["4xl"] * 1.1,
    letterSpacing: -0.5,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
});
