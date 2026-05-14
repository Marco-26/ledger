import type { IStatement } from "@/data/StatementDtos";
import SummaryCard from "../core/SummaryCard";

interface SummaryCardsProps {
  data?: IStatement;
}

export function SummaryCardsSection({ data }: SummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <SummaryCard
        title="Money In"
        value={data?.creditTotal}
        description="Total credit transactions"
        variant="income"
        growthRate={data?.creditTotalGrowthRate}
      />
      <SummaryCard
        title="Money Out"
        value={data?.debitTotal}
        description="Total debit transactions"
        variant="expense"
        growthRate={data?.debitTotalGrowthRate}
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
