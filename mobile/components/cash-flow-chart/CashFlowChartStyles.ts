import { Colors, FontFamily, FontSize, Radius, Spacing } from "@/styles/tokens";
import { CHART_HEIGHT } from "./CashFlowChart";
import { StyleSheet } from "react-native";

export const chartStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  cardHeader: {
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[4],
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  chartArea: {
    paddingVertical: Spacing[4],
  },
  chart: {
    // negative horizontal margin to let chart fill card edge-to-edge while
    // keeping the card's own horizontal padding for the header/legend
    alignSelf: "center",
    marginLeft: -40,
  },
  empty: {
    height: CHART_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing[4],
  },
  emptyText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.sans,
    color: Colors.mutedForeground,
    textAlign: "center",
  },
});
