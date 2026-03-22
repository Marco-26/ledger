import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionType, type IStatement } from "@/data/StatementDtos";
import { TransactionTable } from "../core/TransactionTable";

interface TransactionHistoryProps {
  data?: IStatement;
}

export function TransactionHistory({ data }: TransactionHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
        <CardDescription>
          Detailed list of all your income and expenses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>

          <TabsContent value="income" className="mt-4">
            <TransactionTable
              transactions={data?.creditList}
              type={TransactionType.INCOME}
              emptyMessage="No income transactions."
            />
          </TabsContent>

          <TabsContent value="expenses" className="mt-4">
            <TransactionTable
              transactions={data?.debitList}
              type={TransactionType.EXPENSE}
              emptyMessage="No expense transactions."
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
