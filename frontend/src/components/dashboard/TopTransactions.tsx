import type { IStatement } from "@/data/StatementDtos";
import { TopTransactionsCard } from "../core/TopTransactionsCard";
import { TrendingDown, TrendingUp } from "lucide-react";

interface TopTransactionsProps {
  data?: IStatement;
}

export function TopTransactions({ data }: TopTransactionsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <TopTransactionsCard
        data={data?.topIncomes}
        title="Top Earnings"
        description="Highest income sources."
        icon={<TrendingUp className="h-5 w-5 text-emerald-500" />}
      />
      <TopTransactionsCard
        data={data?.topExpenses}
        title="Top Spending"
        description="Highest expense categories."
        icon={<TrendingDown className="h-5 w-5 text-rose-500" />}
      />
    </div>
  );
}
