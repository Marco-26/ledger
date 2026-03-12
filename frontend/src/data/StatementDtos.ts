export interface ITransaction {
  date: string;
  credit: number;
  debit: number;
}

export interface ITransactionDetail {
  Date: string;
  Description: string;
  Credit?: number;
  Debit?: number;
}

export interface IStatement {
  debitTotal: number;
  creditTotal: number;
  netBalance: number;
  numberOfTransactions: number;
  topExpenses: ITransactionDetail[];
  topIncomes: ITransactionDetail[];
  transactionListFiltered: ITransaction[];
  creditList: ITransactionDetail[];
  debitList: ITransactionDetail[];
}
