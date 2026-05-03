import { StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Radius } from "@/styles/tokens";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    backgroundColor: Colors.muted,
    overflow: "hidden",
  },
  chevronBtn: {
    width: 40,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: 1,
    height: 38,
    backgroundColor: Colors.border,
  },
  label: {
    flex: 1,
    textAlign: "center",
    fontSize: FontSize.sm,
    fontFamily: FontFamily.mono,
    color: Colors.foreground,
    fontWeight: "500",
  },
});
