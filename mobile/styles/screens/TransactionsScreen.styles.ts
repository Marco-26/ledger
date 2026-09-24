import { StyleSheet } from "react-native";
import {
  FontSize,
  MAX_CONTENT_WIDTH,
  Spacing,
  Type,
  type ThemeColors,
} from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    header: {
      width: "100%",
      maxWidth: MAX_CONTENT_WIDTH,
      alignSelf: "center",
      paddingHorizontal: Spacing[5],
      paddingTop: Spacing[3],
      gap: Spacing[2],
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: Spacing[3],
    },
    title: {
      ...Type.greeting,
      color: colors.textPrimary,
      flexShrink: 1,
      minWidth: 0,
    },
    titleCompact: {
      fontSize: FontSize.xl,
      lineHeight: 28,
    },
    summaryLine: {
      ...Type.metaSmall,
      color: colors.textSecondary,
      fontWeight: "400",
    },
    filters: {
      paddingTop: Spacing[3],
      paddingBottom: Spacing[4],
    },
    headerSkeleton: {
      gap: Spacing[3],
      paddingTop: Spacing[1],
      paddingBottom: Spacing[4],
    },
    body: {
      flex: 1,
    },
    listContent: {
      width: "100%",
      maxWidth: MAX_CONTENT_WIDTH,
      alignSelf: "center",
      paddingHorizontal: Spacing[5],
      paddingBottom: Spacing[8],
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: Spacing[3],
      paddingTop: Spacing[4],
      paddingBottom: Spacing[2],
      backgroundColor: colors.background,
    },
    sectionTitle: {
      ...Type.section,
      color: colors.textTertiary,
    },
    sectionTotal: {
      ...Type.metaSmall,
      color: colors.textTertiary,
      fontWeight: "400",
      fontVariant: ["tabular-nums"],
    },
    sectionTail: {
      height: Spacing[2],
    },
    skeletonList: {
      width: "100%",
      maxWidth: MAX_CONTENT_WIDTH,
      alignSelf: "center",
      paddingHorizontal: Spacing[5],
      paddingTop: Spacing[2],
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
