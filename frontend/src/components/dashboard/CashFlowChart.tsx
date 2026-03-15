import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { IStatement } from "@/data/StatementDtos";

interface CashFlowChartProps {
  data?: IStatement;
}

export function CashFlowChart({ data }: CashFlowChartProps) {
  const chartConfig = {
    credit: {
      label: "Income",
      color: "var(--chart-1)",
    },
    debit: {
      label: "Expense",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Flow Overview</CardTitle>
        <CardDescription>
          Daily income vs. expenses for the period.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={data?.transactionListFiltered}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)} // Shorten date if needed
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="credit"
              fill="var(--color-credit)"
              radius={[4, 4, 0, 0]}
              name="Income"
            />
            <Bar
              dataKey="debit"
              fill="var(--color-debit)"
              radius={[4, 4, 0, 0]}
              name="Expense"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
