import { Colors } from "@/styles/tokens";
import React, { useMemo } from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ITransaction } from "@/data/StatementDtos";
import { styles } from "./CashFlowChartStyles";

interface CashFlowChartProps {
  transactions?: ITransaction[];
}

const SCREEN_WIDTH = Dimensions.get("window").width;
export const CHART_HEIGHT = 180;

function CashFlowChart({ transactions }: CashFlowChartProps) {
  const chartData = useMemo(() => {
    if (!transactions || transactions.length === 0) return null;

    return {
      labels: transactions.map(() => ""),
      datasets: [
        {
          data: transactions.map((e) => e.credit),
          color: (opacity = 1) => `rgba(74,222,128,${opacity})`,
          strokeWidth: 2,
          withDots: true,
        },
        {
          data: transactions.map((e) => e.debit),
          color: (opacity = 1) => `rgba(248,113,113,${opacity})`,
          strokeWidth: 2,
          withDots: true,
        },
      ],
    };
  }, [transactions]);

  return chartData ? (
    <View>
      <View style={styles.header}>
        <Text style={styles.label}>CASH FLOW</Text>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: Colors.income }]}
            />
            <Text style={styles.legendText}>Income</Text>
          </View>

          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: Colors.expense }]}
            />
            <Text style={styles.legendText}>Expenses</Text>
          </View>
        </View>
      </View>

      <LineChart
        data={chartData}
        width={SCREEN_WIDTH}
        height={CHART_HEIGHT}
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}
        withHorizontalLabels={true}
        withVerticalLabels={false}
        withShadow={true}
        bezier
        chartConfig={{
          backgroundColor: Colors.background,
          backgroundGradientFrom: Colors.background,
          backgroundGradientTo: Colors.background,
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          decimalPlaces: 0,
          color: () => "transparent",
          labelColor: () => Colors.mutedForeground,
          fillShadowGradientOpacity: 0.15,
          fillShadowGradientToOpacity: 0,
          propsForLabels: {
            fontFamily: "Geist",
            fontSize: 10,
          },
        }}
        formatYLabel={(val) => {
          const n = parseFloat(val);
          if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
          return `${Math.round(n)}`;
        }}
        style={styles.chart}
      />
    </View>
  ) : (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>No cash flow data for this month.</Text>
    </View>
  );
}

export default CashFlowChart;
