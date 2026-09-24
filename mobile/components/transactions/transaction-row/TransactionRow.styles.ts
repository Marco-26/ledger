import { StyleSheet } from "react-native";
import { Spacing, Type, type ThemeColors } from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing[3],
      minHeight: 60,
      paddingVertical: Spacing[2],
    },
    body: {
      flex: 1,
      gap: 3,
    },
    description: {
      ...Type.body,
      color: colors.textPrimary,
    },
    meta: {
      ...Type.metaSmall,
      color: colors.textTertiary,
      fontWeight: "400",
    },
    amount: {
      ...Type.amount,
      textAlign: "right",
    },
  });
