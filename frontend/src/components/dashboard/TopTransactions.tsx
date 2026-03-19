import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { IStatement } from "@/data/StatementDtos";

interface TopTransactionsProps {
  data?: IStatement;
}

export function TopTransactions({ data }: TopTransactionsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Top Earnings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Top Earnings
          </CardTitle>
          <CardDescription>Highest income sources.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {data?.topIncomes && data.topIncomes.length > 0 ? (
            data.topIncomes.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg border bg-card/50 hover:bg-muted/50 transition-colors"
              >
                <div className="grid gap-1">
                  <p
                    className="text-sm font-medium leading-none "
                    title={item.description}
                  >
                    {item.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <div className="font-bold text-emerald-600">
                  +{formatCurrency(item.credit || 0)}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No income records found.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Top Expenses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-rose-500" />
            Top Spending
          </CardTitle>
          <CardDescription>Highest expense categories.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {data?.topExpenses && data.topExpenses.length > 0 ? (
            data.topExpenses.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg border bg-card/50 hover:bg-muted/50 transition-colors"
              >
                <div className="grid gap-1">
                  <p
                    className="text-sm font-medium leading-none truncate"
                    title={item.description}
                  >
                    {item.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <div className="font-bold text-rose-600">
                  -{formatCurrency(item.debit || 0)}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No expense records found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
