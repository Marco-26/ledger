import { StyleSheet } from "react-native";
import { Radius, Spacing, Type, type ThemeColors } from "@/styles/tokens";

export const BAR_HEIGHT = 3;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    list: {
      gap: Spacing[4],
    },
    row: {
      gap: Spacing[2],
    },
    rowHead: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing[3],
    },
    label: {
      ...Type.label,
      color: colors.textPrimary,
      flex: 1,
    },
    share: {
      ...Type.metaSmall,
      color: colors.textTertiary,
      fontWeight: "400",
      minWidth: 34,
      textAlign: "right",
    },
    amount: {
      ...Type.metaSmall,
      color: colors.textSecondary,
      textAlign: "right",
    },
    track: {
      height: BAR_HEIGHT,
      borderRadius: Radius.full,
      backgroundColor: colors.surfaceAlt,
      overflow: "hidden",
    },
    fill: {
      height: BAR_HEIGHT,
      borderRadius: Radius.full,
    },
    footnote: {
      ...Type.metaSmall,
      color: colors.textTertiary,
      fontWeight: "400",
      paddingTop: Spacing[1],
    },
    empty: {
      ...Type.meta,
      color: colors.textTertiary,
      paddingVertical: Spacing[4],
    },
  });
