export interface ITransactionResponse {
  date: string;
  credit: number;
  debit: number;
}

export interface IStatementResponse {
  debit_total: number;
  credit_total: number;
  net_balance: number;
  number_of_transactions: number;
  top_expenses: [];
  top_incomes: [];
  transaction_list_filtered: ITransactionResponse[];
  credit_list: [];
  debit_list: [];
}
