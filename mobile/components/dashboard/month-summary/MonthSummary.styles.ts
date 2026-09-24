import { StyleSheet } from "react-native";
import {
  FontSize,
  FontWeight,
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
    skeletonGroup: {
      gap: Spacing[3],
    },
    skeletonColumn: {
      flex: 1,
      gap: Spacing[2],
    },
  });
