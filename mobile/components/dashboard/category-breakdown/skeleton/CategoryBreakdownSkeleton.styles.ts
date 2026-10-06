import { StyleSheet } from "react-native";
import { Spacing } from "@/styles/tokens";

export const styles = StyleSheet.create({
  list: {
    gap: Spacing[4],
  },
  row: {
    gap: Spacing[2],
  },
  rowHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[3],
  },
});
