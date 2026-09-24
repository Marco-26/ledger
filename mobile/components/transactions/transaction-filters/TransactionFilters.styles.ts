import { StyleSheet } from "react-native";
import {
  FontFamily,
  FontSize,
  Radius,
  Spacing,
  TOUCH_TARGET,
  type ThemeColors,
} from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      gap: Spacing[3],
    },
    searchField: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing[2],
      minHeight: TOUCH_TARGET,
      paddingHorizontal: Spacing[3],
      borderRadius: Radius.md,
      backgroundColor: colors.surfaceAlt,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 0,
      fontFamily: FontFamily.sans,
      fontSize: FontSize.base,
      color: colors.textPrimary,
    },
    clearButton: {
      width: 24,
      height: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    chipRow: {
      gap: Spacing[2],
      paddingRight: Spacing[5],
    },
  });
