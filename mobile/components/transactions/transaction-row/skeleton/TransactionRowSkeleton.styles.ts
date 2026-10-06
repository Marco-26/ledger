import { StyleSheet } from "react-native";
import { Spacing } from "@/styles/tokens";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[3],
    minHeight: 60,
  },
  body: {
    flex: 1,
    gap: Spacing[1],
  },
});
