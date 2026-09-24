import { StyleSheet } from "react-native";
import { MAX_CONTENT_WIDTH, Spacing, type ThemeColors } from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    bar: {
      backgroundColor: colors.surface,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      paddingTop: Spacing[2],
    },
    row: {
      flexDirection: "row",
      alignItems: "flex-start",
      width: "100%",
      maxWidth: MAX_CONTENT_WIDTH,
      alignSelf: "center",
    },
  });
