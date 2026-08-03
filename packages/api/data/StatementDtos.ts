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
  debitTotal: number;
  creditTotal: number;
  netBalance: number;
  topExpenses: ITransaction[];
  topIncomes: ITransaction[];
  allTransactions: ITransaction[];
  creditList: ITransaction[];
  debitList: ITransaction[];
  transactionCategories: ITransactionCategory[];
  creditTotalGrowthRate: number;
  debitTotalGrowthRate: number;
  netBalanceTotalGrowthRate: number;
}
