import { ArrowUp, ArrowDown, Scale } from "lucide-react";
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
        icon={ArrowUp}
        variant="income"
      />
      <SummaryCard
        title="Money Out"
        value={data?.debitTotal}
        description="Total debit transactions"
        icon={ArrowDown}
        variant="expense"
      />
      <SummaryCard
        title="Net Balance"
        value={data?.netBalance}
        description="Income minus expenses"
        icon={Scale}
        variant="neutral"
      />
    </div>
  );
}
