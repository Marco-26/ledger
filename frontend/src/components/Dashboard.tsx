"use client"

import {
  ArrowDown,
  ArrowUp,
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import type { IStatement } from "@/data/StatementDtos"

interface DashboardProps {
  data: IStatement;
}

export function Dashboard({ data }: DashboardProps) {
  const chartConfig = {
    credit: {
      label: "Income",
      color: "var(--chart-1)",
    },
    debit: {
      label: "Expense",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-4 md:p-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Financial Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your financial statement and recent activity.
        </p>
      </div>

      {/* 1. Summary Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money In</CardTitle>
            <ArrowUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {formatCurrency(data.creditTotal)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total credit transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money Out</CardTitle>
            <ArrowDown className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">
              {formatCurrency(data.debitTotal)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total debit transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold", data.netBalance >= 0 ? "text-primary" : "text-rose-600")}>
              {formatCurrency(data.netBalance)}
            </div>
            <p className="text-xs text-muted-foreground">
              Current balance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2. Graph Section */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Overview</CardTitle>
          <CardDescription>
            Daily income vs. expenses for the period.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={data.transactionListFiltered}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 5)} // Shorten date if needed
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="credit"
                fill="var(--color-credit)"
                radius={[4, 4, 0, 0]}
                name="Income"
              />
              <Bar
                dataKey="debit"
                fill="var(--color-debit)"
                radius={[4, 4, 0, 0]}
                name="Expense"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 3. Top Transactions Section */}
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
            {data.topIncomes.length > 0 ? (
              data.topIncomes.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg border bg-card/50 hover:bg-muted/50 transition-colors">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none truncate max-w-[200px]" title={item.Description}>
                      {item.Description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.Date}
                    </p>
                  </div>
                  <div className="font-bold text-emerald-600">
                    +{formatCurrency(item.Credit || 0)}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No income records found.</p>
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
            {data.topExpenses.length > 0 ? (
              data.topExpenses.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg border bg-card/50 hover:bg-muted/50 transition-colors">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none truncate max-w-[200px]" title={item.Description}>
                      {item.Description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.Date}
                    </p>
                  </div>
                  <div className="font-bold text-rose-600">
                    -{formatCurrency(item.Debit || 0)}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No expense records found.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 4. All Transactions Section */}
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
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {data.creditList.length > 0 ? (
                        data.creditList.map((t, i) => (
                          <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle">{t.Date}</td>
                            <td className="p-4 align-middle">{t.Description}</td>
                            <td className="p-4 align-middle text-right font-medium text-emerald-600">
                              +{formatCurrency(t.Credit || 0)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="p-4 text-center text-muted-foreground">No income transactions.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="expenses" className="mt-4">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {data.debitList.length > 0 ? (
                        data.debitList.map((t, i) => (
                          <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle">{t.Date}</td>
                            <td className="p-4 align-middle">{t.Description}</td>
                            <td className="p-4 align-middle text-right font-medium text-rose-600">
                              -{formatCurrency(t.Debit || 0)}
                            </td>
                          </tr>
                        ))
                      ) : (
                         <tr>
                          <td colSpan={3} className="p-4 text-center text-muted-foreground">No expense transactions.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
