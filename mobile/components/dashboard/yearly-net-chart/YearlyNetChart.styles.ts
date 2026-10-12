import { StyleSheet } from "react-native";
import {
  FontWeight,
  Radius,
  Spacing,
  Type,
  type ThemeColors,
} from "@/styles/tokens";

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
    barDimmed: {
      opacity: 0.35,
    },
    axis: {
      height: StyleSheet.hairlineWidth,
    },
    hitRow: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: "row",
    },
    hit: {
      flex: 1,
    },
    labels: {
      flexDirection: "row",
      marginTop: Spacing[2],
    },
    labelCell: {
      flex: 1,
      alignItems: "center",
      gap: Spacing[1],
    },
    monthInitial: {
      ...Type.metaSmall,
      color: colors.textTertiary,
    },
    monthInitialSelected: {
      color: colors.textPrimary,
      fontWeight: FontWeight.semibold,
    },
    monthInitialEmpty: {
      opacity: 0.5,
    },
    // The brass tick under the selected month: the accent used sparingly.
    marker: {
      width: 12,
      height: 2,
      borderRadius: Radius.full,
      backgroundColor: "transparent",
    },
    readoutRule: {
      marginTop: Spacing[4],
      marginBottom: Spacing[4],
    },
    readoutHead: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: Spacing[3],
      marginBottom: Spacing[3],
    },
    readoutTitle: {
      ...Type.label,
      color: colors.textPrimary,
    },
    open: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
      paddingVertical: Spacing[1],
      paddingLeft: Spacing[2],
    },
    openLabel: {
      ...Type.metaSmall,
      color: colors.brass,
    },
    figures: {
      flexDirection: "row",
      gap: Spacing[3],
    },
    figure: {
      flex: 1,
      gap: Spacing[0.5],
    },
    figureLabel: {
      ...Type.metaSmall,
      color: colors.textTertiary,
      fontWeight: FontWeight.regular,
    },
    figureValue: {
      ...Type.amount,
    },
  });
