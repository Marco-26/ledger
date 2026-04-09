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
        description="Highest income sources this period"
        icon={<TrendingUp className="h-3.5 w-3.5 text-[var(--income)]" />}
        variant="income"
      />
      <TopTransactionsCard
        data={data?.topExpenses}
        title="Top Spending"
        description="Highest expense categories this period"
        icon={<TrendingDown className="h-3.5 w-3.5 text-[var(--expense)]" />}
        variant="expense"
      />
    </div>
  );
}
