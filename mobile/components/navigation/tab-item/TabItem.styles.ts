import { StyleSheet } from "react-native";
import { Radius, Spacing, Type, type ThemeColors } from "@/styles/tokens";

export const DOT_SIZE = 4;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    item: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      minHeight: 48,
      paddingTop: Spacing[1],
      gap: 3,
    },
    label: {
      ...Type.tab,
    },
    dot: {
      width: DOT_SIZE,
      height: DOT_SIZE,
      borderRadius: Radius.full,
      backgroundColor: colors.brass,
      marginTop: 1,
    },
  });
