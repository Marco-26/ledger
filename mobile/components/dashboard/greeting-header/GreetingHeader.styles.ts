import { StyleSheet } from "react-native";
import {
  FontSize,
  FontWeight,
  Radius,
  Spacing,
  Type,
  type ThemeColors,
} from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: Spacing[4],
      paddingTop: Spacing[3],
      paddingBottom: Spacing[7],
    },
    text: {
      flex: 1,
      gap: Spacing[0.5],
    },
    salutation: {
      ...Type.label,
      color: colors.textSecondary,
    },
    name: {
      ...Type.greeting,
      color: colors.textPrimary,
    },
    monogram: {
      width: 42,
      height: 42,
      borderRadius: Radius.full,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.borderStrong,
    },
    monogramText: {
      fontSize: FontSize.base,
      fontWeight: FontWeight.semibold,
      color: colors.brass,
      letterSpacing: 0.5,
    },
  });
