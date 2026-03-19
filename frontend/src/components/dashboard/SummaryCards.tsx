import { ArrowUp, ArrowDown, Wallet } from "lucide-react";
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
        iconColor="text-emerald-500"
        valueColor="text-emerald-600"
      />
      <SummaryCard
        title="Money Out"
        value={data?.debitTotal}
        description="Total debit transactions"
        icon={ArrowDown}
        iconColor="text-rose-500"
        valueColor="text-rose-600"
      />
      <SummaryCard
        title="Net Revenue"
        value={data?.netBalance}
        description="Current balance"
        icon={Wallet}
        valuePositive={data?.netBalance !== undefined && data.netBalance >= 0}
      />
    </div>
  );
}
