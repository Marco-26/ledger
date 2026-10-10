import { StyleSheet } from "react-native";
import { Radius, Spacing, Type, type ThemeColors } from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    sheet: {
      backgroundColor: colors.surface,
      borderRadius: Radius.xl,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      paddingHorizontal: Spacing[4],
      paddingTop: Spacing[4],
      paddingBottom: Spacing[2],
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 18 },
      shadowOpacity: 0.06,
      shadowRadius: 32,
      elevation: 2,
    },
    sheetHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: Spacing[2],
    },
    sheetLabel: {
      ...Type.section,
      color: colors.textTertiary,
    },
    rule: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
    },
  });
