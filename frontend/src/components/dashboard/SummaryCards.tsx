import type { IStatement } from "@ledger/api";
import SummaryCard from "../core/SummaryCard";

interface SummaryCardsProps {
  data?: IStatement;
}

export function SummaryCardsSection({ data }: SummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <SummaryCard
        title="Money In"
        value={data?.incomeTotal}
        description="Total income transactions"
        variant="income"
        growthRate={data?.incomeTotalGrowthRate}
      />
      <SummaryCard
        title="Money Out"
        value={data?.expenseTotal}
        description="Total expense transactions"
        variant="expense"
        growthRate={data?.expenseTotalGrowthRate}
      />
      <SummaryCard
        title="Net Balance"
        value={data?.netBalance}
        description="Income minus expenses"
        variant="neutral"
        growthRate={data?.netBalanceTotalGrowthRate}
      />
    </div>
  );
}
