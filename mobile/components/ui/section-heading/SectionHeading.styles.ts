import { StyleSheet } from "react-native";
import { Spacing, Type, type ThemeColors } from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: Spacing[3],
      marginBottom: Spacing[3],
    },
    title: {
      ...Type.section,
      color: colors.textTertiary,
      flexShrink: 1,
    },
  });
