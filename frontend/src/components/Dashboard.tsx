"use client";

import { useRef, type ChangeEvent } from "react";
import { Upload } from "lucide-react";

import type { IStatement } from "@/data/StatementDtos";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { CashFlowChart } from "@/components/dashboard/CashFlowChart";
import { TopTransactions } from "@/components/dashboard/TopTransactions";
import { TransactionHistory } from "@/components/dashboard/TransactionHistory";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  data?: IStatement;
  isUploading: boolean;
  uploadError?: string;
  onUploadStatement: (file: File) => void | Promise<void>;
}

export function Dashboard({
  data,
  isUploading,
  uploadError,
  onUploadStatement,
}: DashboardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

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
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Financial Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your financial statement and recent activity.
          </p>
          {uploadError ? (
            <p className="text-sm text-destructive">{uploadError}</p>
          ) : null}
        </div>

        <>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            type="button"
            size="lg"
            className="w-full md:ml-auto md:w-auto hover:cursor-pointer"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload />
            {isUploading ? "Uploading..." : "Upload Statement"}
          </Button>
        </>
      </div>

      <SummaryCards data={data} />
      <CashFlowChart data={data} />
      <TopTransactions data={data} />
      <TransactionHistory data={data} />
    </div>
  );
}
