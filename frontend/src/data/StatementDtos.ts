export interface ITransaction {
  date: string;
  credit: number;
  debit: number;
}

export interface IStatement {
  debitTotal: number;
  creditTotal: number;
  netBalance: number;
  numberOfTransactions: number;
  topExpenses: [];
  topIncomes: [];
  transactionListFiltered: ITransaction[];
  creditList: [];
  debitList: [];
}
