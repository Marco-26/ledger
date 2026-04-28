import { StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Spacing } from "@/styles/tokens";

export const styles = StyleSheet.create({
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
