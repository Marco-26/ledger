import { StyleSheet } from "react-native";
import { Radius, Spacing, Type, type ThemeColors } from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: Spacing[9],
      paddingHorizontal: Spacing[6],
      gap: Spacing[2],
    },
    iconRing: {
      width: 44,
      height: 44,
      borderRadius: Radius.full,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surfaceAlt,
      marginBottom: Spacing[1],
    },
    title: {
      ...Type.body,
      color: colors.textPrimary,
      textAlign: "center",
    },
    message: {
      ...Type.meta,
      color: colors.textTertiary,
      textAlign: "center",
      maxWidth: 280,
      lineHeight: 19,
    },
    action: {
      marginTop: Spacing[3],
      minHeight: 40,
      justifyContent: "center",
      paddingHorizontal: Spacing[5],
      borderRadius: Radius.full,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.borderStrong,
      backgroundColor: colors.surface,
    },
    actionLabel: {
      ...Type.label,
      color: colors.textPrimary,
    },
  });
