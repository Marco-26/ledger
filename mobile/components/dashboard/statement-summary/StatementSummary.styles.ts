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
      gap: Spacing[5],
    },
    balanceBlock: {
      gap: Spacing[2],
    },
    captionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    deleteButton: {
      width: Spacing[8],
      height: Spacing[8],
      marginVertical: -Spacing[2],
      marginRight: -Spacing[1],
      borderRadius: Radius.full,
      alignItems: "center",
      justifyContent: "center",
    },
    deleteButtonPressed: {
      backgroundColor: colors.expenseSoft,
    },
    caption: {
      ...Type.label,
      color: colors.textSecondary,
    },
    heroRow: {
      flexDirection: "row",
      alignItems: "baseline",
      flexWrap: "nowrap",
    },
    heroValue: {
      ...Type.hero,
      color: colors.textPrimary,
      flexShrink: 1,
    },
    heroSymbol: {
      ...Type.hero,
      fontSize: FontSize.xl,
      lineHeight: 46,
      color: colors.textTertiary,
      fontWeight: FontWeight.medium,
      letterSpacing: 0,
    },
    heroFraction: {
      ...Type.hero,
      fontSize: FontSize.xl,
      lineHeight: 46,
      color: colors.textTertiary,
      letterSpacing: -0.4,
    },
    deltaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing[1],
    },
    deltaValue: {
      ...Type.metaSmall,
    },
    deltaCaption: {
      ...Type.metaSmall,
      color: colors.textTertiary,
      fontWeight: FontWeight.regular,
    },
    splitRow: {
      flexDirection: "row",
      alignItems: "stretch",
      gap: Spacing[4],
    },
  });
