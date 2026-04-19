import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { IStatement } from "@/data/StatementDtos";
import { chartConfig } from "@/utils/chartUtils";
import { useMemo } from "react";

interface CashFlowChartProps {
  data?: IStatement;
}

export function CashFlowChart({ data }: CashFlowChartProps) {
  // need to turn the date into a string for the XAxis, reacharts doesn't work well with Dayjs objects as data keys
  const formattedData = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.transactionListFiltered.map((t) => ({
      ...t,
      date: t.date.format("DD-MM"),
    }));
  }, [data]);

  const chartDataAvailable = formattedData.length > 0;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
            Analysis
          </p>
          <h2 className="text-base font-semibold text-foreground">Cash Flow</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Daily income vs. expenses
        </p>
      </div>

      <div className="p-5">
        {chartDataAvailable ? (
          <ChartContainer config={chartConfig} className="h-[280px] w-full">
            <BarChart data={formattedData} barCategoryGap="30%" barGap={2}>
              <CartesianGrid
                vertical={false}
                strokeDasharray="none"
                stroke="var(--border)"
                strokeOpacity={0.6}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{
                  fontSize: 11,
                  fill: "var(--muted-foreground)",
                  fontFamily: "DM Mono, monospace",
                }}
                tickFormatter={(value) => value}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 11,
                  fill: "var(--muted-foreground)",
                  fontFamily: "DM Mono, monospace",
                }}
                tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`}
                width={48}
              />
              <ChartTooltip
                cursor={{ fill: "var(--muted)", opacity: 0.5 }}
                content={<ChartTooltipContent />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="credit"
                fill="var(--color-credit)"
                radius={[3, 3, 0, 0]}
                maxBarSize={24}
              />
              <Bar
                dataKey="debit"
                fill="var(--color-debit)"
                radius={[3, 3, 0, 0]}
                maxBarSize={24}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="h-[280px] flex flex-col items-center justify-center gap-2">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <div className="h-5 w-5 rounded border-2 border-muted-foreground/30" />
            </div>
            <p className="text-sm text-muted-foreground">
              No transaction data available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
