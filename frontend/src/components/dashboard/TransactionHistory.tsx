import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionType, type IStatement } from "@ledger/api";
import { TransactionTable } from "../core/TransactionTable";

type Tab = "income" | "expenses";

interface TransactionHistoryProps {
  data?: IStatement;
}

export function TransactionHistory({ data }: TransactionHistoryProps) {
  const [activeTab, setActiveTab] = useState<Tab>("expenses");

  const count =
    activeTab === "income"
      ? (data?.creditList?.length ?? 0)
      : (data?.debitList?.length ?? 0);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
          History
        </p>
        <h2 className="text-base font-semibold text-foreground mt-1">
          All Transactions
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Tab)} className="w-full">
        <div className="px-5 py-3 border-b border-border flex items-center gap-2">
          <TabsList className="h-8 p-0.5 bg-muted/60 rounded-lg border border-border/60 w-auto inline-flex gap-0.5">
            <TabsTrigger
              value="income"
              className="hover:cursor-pointer text-xs px-4 h-7 font-medium tracking-wide rounded-md data-[state=active]:bg-card data-[state=active]:text-[var(--income)] data-[state=active]:shadow-sm transition-all"
            >
              Income
            </TabsTrigger>
            <TabsTrigger
              value="expenses"
              className="hover:cursor-pointer text-xs px-4 h-7 font-medium tracking-wide rounded-md data-[state=active]:bg-card data-[state=active]:text-[var(--expense)] data-[state=active]:shadow-sm transition-all"
            >
              Expenses
            </TabsTrigger>
          </TabsList>

          <span className="ml-auto text-xs font-semibold font-mono text-muted-foreground bg-muted border border-border rounded-full px-2 py-0.5 min-w-7 text-center tabular-nums">
            {count}
          </span>
        </div>

        <TabsContent value="income" className="mt-0">
          <TransactionTable
            transactions={data?.creditList}
            type={TransactionType.INCOME}
            emptyMessage="No income transactions found."
          />
        </TabsContent>

        <TabsContent value="expenses" className="mt-0">
          <TransactionTable
            transactions={data?.debitList}
            type={TransactionType.EXPENSE}
            emptyMessage="No expense transactions found."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
