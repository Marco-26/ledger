"use client"

import type { IStatement } from "@/data/StatementDtos"
import { SummaryCards } from "@/components/dashboard/SummaryCards"
import { CashFlowChart } from "@/components/dashboard/CashFlowChart"
import { TopTransactions } from "@/components/dashboard/TopTransactions"
import { TransactionHistory } from "@/components/dashboard/TransactionHistory"

interface DashboardProps {
  data: IStatement;
}

export function Dashboard({ data }: DashboardProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-4 md:p-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Financial Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your financial statement and recent activity.
        </p>
      </div>

      <SummaryCards data={data} />
      <CashFlowChart data={data} />
      <TopTransactions data={data} />
      <TransactionHistory data={data} />
    </div>
  )
}
