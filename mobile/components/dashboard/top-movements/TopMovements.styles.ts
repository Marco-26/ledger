import { StyleSheet } from "react-native";
import { Spacing, Type, type ThemeColors } from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    seeAll: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
      paddingVertical: Spacing[1],
      paddingLeft: Spacing[2],
    },
    seeAllLabel: {
      ...Type.metaSmall,
      color: colors.textSecondary,
    },
    empty: {
      paddingVertical: Spacing[4],
    },
    emptyLabel: {
      ...Type.meta,
      color: colors.textTertiary,
    },
    skeletonRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing[3],
      minHeight: 60,
    },
    skeletonBody: {
      flex: 1,
      gap: Spacing[1],
    },
  });
