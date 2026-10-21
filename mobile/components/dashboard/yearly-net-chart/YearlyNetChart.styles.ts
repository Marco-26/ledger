import { StyleSheet } from "react-native";
import { Radius, Spacing, Type, type ThemeColors } from "@/styles/tokens";

/** Height of the bars area; the rule sits wherever gains and losses split it. */
export const PLOT_HEIGHT = 112;
const BAR_WIDTH = 10;
/** Floor for a bar, so a month that barely broke even still reads as a mark. */
const MIN_BAR = 2;

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    plot: {
      height: PLOT_HEIGHT,
      marginTop: Spacing[1],
    },
    half: {
      flexDirection: "row",
    },
    slotTop: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
    },
    slotBottom: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    bar: {
      width: BAR_WIDTH,
      minHeight: MIN_BAR,
      borderRadius: Radius.xs,
    },
    axis: {
      height: StyleSheet.hairlineWidth,
    },
    labels: {
      flexDirection: "row",
      marginTop: Spacing[2],
    },
    labelCell: {
      flex: 1,
      alignItems: "center",
    },
    monthInitial: {
      ...Type.metaSmall,
      color: colors.textTertiary,
    },
    /** A month with no statement keeps its place but steps back. */
    monthInitialEmpty: {
      opacity: 0.4,
    },
  });
