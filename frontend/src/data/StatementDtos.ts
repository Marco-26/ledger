export interface IStatement {
  debitTotal: number;
  creditTotal: number;
  netBalance: number;
  numberOfTransactions: number;
  topExpenses: [];
  topIncomes: [];
  debitListFiltered: [];
  creditListFiltered: [];
  creditList: [];
  debitList: [];
}
