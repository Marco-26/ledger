import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionType, type IStatement } from "@/data/StatementDtos";
import { TransactionTable } from "../core/TransactionTable";

interface TransactionHistoryProps {
  data?: IStatement;
}

export function TransactionHistory({ data }: TransactionHistoryProps) {
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

      <div className="p-5">
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="h-8 p-0.5 bg-muted/60 rounded-lg border border-border/60 w-auto inline-flex gap-0.5">
            <TabsTrigger
              value="income"
              className="text-xs px-4 h-7 font-medium tracking-wide rounded-md data-[state=active]:bg-card data-[state=active]:text-[var(--income)] data-[state=active]:shadow-sm transition-all"
            >
              Income
            </TabsTrigger>
            <TabsTrigger
              value="expenses"
              className="text-xs px-4 h-7 font-medium tracking-wide rounded-md data-[state=active]:bg-card data-[state=active]:text-[var(--expense)] data-[state=active]:shadow-sm transition-all"
            >
              Expenses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="income" className="mt-4">
            <TransactionTable
              transactions={data?.creditList}
              type={TransactionType.INCOME}
              emptyMessage="No income transactions found."
            />
          </TabsContent>

          <TabsContent value="expenses" className="mt-4">
            <TransactionTable
              transactions={data?.debitList}
              type={TransactionType.EXPENSE}
              emptyMessage="No expense transactions found."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
