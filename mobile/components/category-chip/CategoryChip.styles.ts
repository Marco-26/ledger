import { StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Radius, Spacing } from "@/styles/tokens";

export const styles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
    flexShrink: 1,
    maxWidth: 150,
    backgroundColor: Colors.muted,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing[2],
    paddingVertical: 2,
  },
  text: {
    fontSize: FontSize["2xs"],
    fontFamily: FontFamily.sans,
    color: Colors.mutedForeground,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
});
