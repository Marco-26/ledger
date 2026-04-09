import type { ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
  credit: {
    label: "Income",
    color: "var(--chart-1)",
  },
  debit: {
    label: "Expenses",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;
