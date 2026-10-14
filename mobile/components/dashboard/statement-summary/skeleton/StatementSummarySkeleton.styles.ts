import { StyleSheet } from "react-native";
import { Spacing } from "@/styles/tokens";

export const styles = StyleSheet.create({
  container: {
    gap: Spacing[5],
  },
  group: {
    gap: Spacing[3],
  },
  splitRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: Spacing[4],
  },
  column: {
    flex: 1,
    gap: Spacing[2],
  },
});
