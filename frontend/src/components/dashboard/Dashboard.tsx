import { type ChangeEvent } from "react";
import type { IStatement } from "@/data/StatementDtos";
import { SummaryCardsSection } from "@/components/dashboard/SummaryCards";
import { CashFlowChart } from "@/components/dashboard/CashFlowChart";
import { TopTransactions } from "@/components/dashboard/TopTransactions";
import { TransactionHistory } from "@/components/dashboard/TransactionHistory";
import { Header } from "./Header";
import type { Dayjs } from "dayjs";

interface DashboardProps {
  data?: IStatement;
  isUploading: boolean;
  onUploadStatement: (file: File) => void | Promise<void>;
  onMonthChange: (month: string) => void;
  selectedMonth: Dayjs;
}

export function Dashboard({
  data,
  isUploading,
  onUploadStatement,
  onMonthChange,
  selectedMonth,
}: DashboardProps) {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    await onUploadStatement(file);
    event.target.value = "";
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-4 md:p-8 space-y-8">
      <Header
        isUploading={isUploading}
        onFileChange={handleFileChange}
        onMonthChange={onMonthChange}
        selectedMonth={selectedMonth}
      />
      <SummaryCardsSection data={data} />
      <CashFlowChart data={data} />
      <TopTransactions data={data} />
      <TransactionHistory data={data} />
    </div>
  );
}
