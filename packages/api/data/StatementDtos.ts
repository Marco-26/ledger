import type { Dayjs } from "dayjs";

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export interface ITransaction {
  date: Dayjs;
  description: string;
  category: string;
  amount: number;
  type: TransactionType;
}

export interface ITransactionCategory {
  label: string;
  amount: number;
  percentage: number;
  type: TransactionType;
}

export interface IStatement {
  date: Dayjs;
  expenseTotal: number;
  incomeTotal: number;
  netBalance: number;
  topExpenses: ITransaction[];
  topIncomes: ITransaction[];
  allTransactions: ITransaction[];
  incomeList: ITransaction[];
  expenseList: ITransaction[];
  transactionCategories: ITransactionCategory[];
  incomeTotalGrowthRate: number;
  expenseTotalGrowthRate: number;
  netBalanceTotalGrowthRate: number;
}

export interface IMonthlySummary {
  month: string;
  expenses: number;
  income: number;
  netBalance: number;
}

export interface IYearlyStatement {
  year: number;
  expenseTotal: number;
  incomeTotal: number;
  netBalance: number;
  topExpenses: ITransaction[];
  topIncomes: ITransaction[];
  allTransactions: ITransaction[];
  transactionCategories: ITransactionCategory[];
  monthSummaries: IMonthlySummary[];
}
