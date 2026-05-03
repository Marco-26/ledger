import { Colors, FontFamily, FontSize, Spacing } from "@/styles/tokens";
import React, { useMemo } from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import SectionHeader from "../section-header/SectionHeader";
import { chartStyles } from "./CashFlowChartStyles";
import { ITransaction } from "@/data/StatementDtos";

interface CashFlowChartProps {
  transactions?: ITransaction[];
}

const CHART_WIDTH = Dimensions.get("window").width - Spacing[5] * 2;
const MAX_LABELS = 7;
export const CHART_HEIGHT = 200;

function CashFlowChart({ transactions }: CashFlowChartProps) {
  const chartData = useMemo(() => {
    if (!transactions || transactions.length === 0) return null;

    // Aggregate credits and debits by day
    const byDay = new Map<string, { credit: number; debit: number }>();
    for (const tx of transactions) {
      const key = tx.date.format("DD/MM");
      const existing = byDay.get(key) ?? { credit: 0, debit: 0 };
      byDay.set(key, {
        credit: existing.credit + tx.credit,
        debit: existing.debit + tx.debit,
      });
    }

    // Sort by date ascending
    const sorted = Array.from(byDay.entries()).sort((a, b) => {
      const [da, ma] = a[0].split("/").map(Number);
      const [db, mb] = b[0].split("/").map(Number);
      return ma !== mb ? ma - mb : da - db;
    });

    if (sorted.length === 0) return null;

    // Thin labels to avoid crowding: keep at most MAX_LABELS evenly spaced
    const step = Math.max(1, Math.ceil(sorted.length / MAX_LABELS));
    const labels = sorted.map((entry, i) => (i % step === 0 ? entry[0] : ""));

    return {
      labels,
      datasets: [
        {
          data: sorted.map((e) => e[1].credit),
          color: (opacity = 1) => `rgba(74,222,128,${opacity})`,
          strokeWidth: 2,
        },
        {
          data: sorted.map((e) => e[1].debit),
          color: (opacity = 1) => `rgba(248,113,113,${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: ["Income", "Expenses"],
    };
  }, [transactions]);

  return (
    <View style={chartStyles.card}>
      <View style={chartStyles.cardHeader}>
        <SectionHeader label="Cash Flow" title="Income vs Expenses" />
      </View>

      <View style={chartStyles.divider} />

      <View style={chartStyles.chartArea}>
        {chartData ? (
          <>
            <LineChart
              data={chartData}
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              withDots={false}
              withInnerLines={true}
              withOuterLines={false}
              withShadow={false}
              segments={4}
              bezier
              chartConfig={{
                backgroundColor: Colors.card,
                backgroundGradientFrom: Colors.card,
                backgroundGradientTo: Colors.card,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(107,122,153,${opacity})`,
                labelColor: () => Colors.mutedForeground,
                propsForBackgroundLines: {
                  stroke: Colors.border,
                  strokeDasharray: "4 4",
                },
                propsForLabels: {
                  fontFamily: FontFamily.mono,
                  fontSize: FontSize.xs,
                },
              }}
              formatYLabel={(val) => {
                const n = parseFloat(val);
                if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
                return `${n}`;
              }}
              style={chartStyles.chart}
            />
          </>
        ) : (
          <View style={chartStyles.empty}>
            <Text style={chartStyles.emptyText}>
              No cash flow data for this month.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default CashFlowChart;
