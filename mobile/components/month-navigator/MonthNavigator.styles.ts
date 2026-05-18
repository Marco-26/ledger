import { StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Radius, Spacing } from "@/styles/tokens";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderMid,
    borderRadius: Radius.md,
    backgroundColor: Colors.muted,
    overflow: "hidden",
    height: 44,
  },
  chevronBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: 1,
    height: 22,
    backgroundColor: Colors.borderMid,
  },
  labelContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: Spacing[2],
  },
  label: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.sans,
    color: Colors.foreground,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  yearLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.mono,
    color: Colors.foreground,
    fontWeight: "400",
  },
});
