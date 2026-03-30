export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export interface ITransaction {
  date: string;
  credit: number;
  debit: number;
  description: string;
}

export interface IStatement {
  date: string;
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
