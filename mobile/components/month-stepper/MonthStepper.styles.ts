import { StyleSheet } from "react-native";
import { Radius, Spacing, Type, type ThemeColors } from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      borderRadius: Radius.full,
      backgroundColor: colors.surfaceAlt,
      paddingHorizontal: Spacing[1],
    },
    containerFullWidth: {
      alignSelf: "stretch",
      justifyContent: "space-between",
    },
    chevron: {
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: Radius.full,
    },
    chevronDisabled: {
      opacity: 0.3,
    },
    label: {
      ...Type.metaSmall,
      color: colors.textPrimary,
      minWidth: 84,
      textAlign: "center",
      letterSpacing: 0.3,
    },
    labelCompact: {
      minWidth: 62,
    },
    labelFullWidth: {
      flex: 1,
    },
  });
