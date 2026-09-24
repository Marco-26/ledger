import { StyleSheet } from "react-native";
import {
  FontWeight,
  Radius,
  Spacing,
  Type,
  type ThemeColors,
} from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    column: {
      flex: 1,
      gap: Spacing[2],
    },
    head: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: Spacing[1],
    },
    marker: {
      width: 18,
      height: 18,
      borderRadius: Radius.full,
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      ...Type.metaSmall,
      color: colors.textSecondary,
    },
    value: {
      ...Type.figure,
      textAlign: "center",
    },
    delta: {
      ...Type.metaSmall,
      color: colors.textTertiary,
      fontWeight: FontWeight.regular,
      textAlign: "center",
    },
  });
