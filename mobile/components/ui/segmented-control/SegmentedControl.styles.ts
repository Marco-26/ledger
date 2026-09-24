import { StyleSheet } from "react-native";
import { Radius, Spacing, Type, type ThemeColors } from "@/styles/tokens";

export const TRACK_PADDING = 3;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    track: {
      flexDirection: "row",
      backgroundColor: colors.surfaceAlt,
      borderRadius: Radius.full,
      padding: TRACK_PADDING,
    },
    thumb: {
      position: "absolute",
      top: TRACK_PADDING,
      bottom: TRACK_PADDING,
      left: TRACK_PADDING,
      borderRadius: Radius.full,
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    segment: {
      flex: 1,
      minHeight: 34,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: Spacing[2],
    },
    label: {
      ...Type.label,
      color: colors.textSecondary,
    },
    labelActive: {
      color: colors.textPrimary,
    },
  });
