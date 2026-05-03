import { Colors, FontFamily, FontSize, Spacing } from "@/styles/tokens";
import { StyleSheet } from "react-native";
import { CHART_HEIGHT } from "./CashFlowChart";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[3],
  },
  label: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.sans,
    color: Colors.mutedForeground,
    letterSpacing: 1.2,
    fontWeight: "600",
  },
  legend: {
    flexDirection: "row",
    gap: Spacing[4],
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing[1],
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.sans,
    color: Colors.mutedForeground,
  },
  chart: {
    alignSelf: "center",
    marginLeft: -26,
  },
  empty: {
    height: CHART_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing[5],
  },
  emptyText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.sans,
    color: Colors.mutedForeground,
    textAlign: "center",
  },
});
