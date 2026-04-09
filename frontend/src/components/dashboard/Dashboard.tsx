import { type ChangeEvent } from "react";
import type { IStatement } from "@/data/StatementDtos";
import { SummaryCardsSection } from "@/components/dashboard/SummaryCards";
import { CashFlowChart } from "@/components/dashboard/CashFlowChart";
import { TopTransactions } from "@/components/dashboard/TopTransactions";
import { TransactionHistory } from "@/components/dashboard/TransactionHistory";
import { Header } from "./Header";
import type { Dayjs } from "dayjs";
import { Constants } from "@/utils/Constants";

interface DashboardProps {
  data?: IStatement;
  isUploading: boolean;
  onUploadStatement: (file: File, date: string) => void;
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
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onUploadStatement(
      file,
      selectedMonth.date(1).format(Constants.UI.DATE_FORMAT),
    );
    event.target.value = "";
  };

  return (
    <div className="relative min-h-screen w-full bg-background bg-grid">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--income)] to-transparent opacity-60" />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10 space-y-8">
        <div className="animate-fade-up delay-0">
          <Header
            isUploading={isUploading}
            onFileChange={handleFileChange}
            onMonthChange={onMonthChange}
            selectedMonth={selectedMonth}
          />
        </div>

        <div className="animate-fade-up delay-1">
          <SummaryCardsSection data={data} />
        </div>

        <div className="animate-fade-up delay-2">
          <CashFlowChart data={data} />
        </div>

        <div className="animate-fade-up delay-3">
          <TopTransactions data={data} />
        </div>

        <div className="animate-fade-up delay-4 pb-12">
          <TransactionHistory data={data} />
        </div>
      </div>
    </div>
  );
}
