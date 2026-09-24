import { StyleSheet } from "react-native";
import { Radius, Spacing, Type, type ThemeColors } from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    chip: {
      minHeight: 32,
      justifyContent: "center",
      paddingHorizontal: Spacing[3],
      borderRadius: Radius.full,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    chipActive: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    },
    label: {
      ...Type.metaSmall,
      color: colors.textSecondary,
    },
    labelActive: {
      color: colors.textInverse,
    },
  });
