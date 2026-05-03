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
}

export interface IStatement {
  date: Dayjs;
  debitTotal: number;
  creditTotal: number;
  netBalance: number;
  numberOfTransactions: number;
  topExpenses: ITransaction[];
  topIncomes: ITransaction[];
  transactionListFiltered: ITransaction[];
  creditList: ITransaction[];
  debitList: ITransaction[];
}
