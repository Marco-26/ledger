import { StyleSheet } from "react-native";
import {
  FontSize,
  MAX_CONTENT_WIDTH,
  Radius,
  Spacing,
  Type,
  type ThemeColors,
} from "@/styles/tokens";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      width: "100%",
      maxWidth: MAX_CONTENT_WIDTH,
      alignSelf: "center",
      paddingHorizontal: Spacing[6],
      paddingTop: Spacing[3],
      paddingBottom: Spacing[4],
    },
    masthead: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing[2],
    },
    brassDot: {
      width: 10,
      height: 10,
      borderRadius: Radius.full,
      backgroundColor: colors.brass,
    },
    // A real title, so the screen steps title → sheet → headline instead of
    // jumping from tiny caps straight to the sheet.
    wordmark: {
      ...Type.hero,
      fontSize: FontSize["2xl"],
      lineHeight: 32,
      letterSpacing: -0.8,
      color: colors.textPrimary,
    },
    specimen: {
      flex: 1,
      justifyContent: "center",
      paddingVertical: Spacing[6],
    },
    headline: {
      ...Type.hero,
      fontSize: FontSize["3xl"],
      lineHeight: 38,
      letterSpacing: -1.2,
      color: colors.textPrimary,
    },
    headlineMuted: {
      color: colors.textTertiary,
    },
    brassRule: {
      width: Spacing[8],
      height: 2,
      marginVertical: Spacing[4],
      backgroundColor: colors.brass,
    },
    body: {
      ...Type.meta,
      fontSize: FontSize.base,
      lineHeight: 22,
      color: colors.textSecondary,
    },
    actions: {
      marginTop: Spacing[8],
      gap: Spacing[3],
    },
    footnote: {
      ...Type.metaSmall,
      textAlign: "center",
      color: colors.textTertiary,
    },
  });
