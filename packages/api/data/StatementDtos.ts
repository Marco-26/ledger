import type { Dayjs } from "dayjs";

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export interface ITransaction {
  date: Dayjs;
  credit: number;
  debit: number;
  description: string;
  category: string;
}

export interface ICategorySpending {
  label: string;
  value: number;
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
  spendingByCategory: ICategorySpending[];
  creditTotalGrowthRate: number;
  debitTotalGrowthRate: number;
  netBalanceTotalGrowthRate: number;
}
