export interface ITransactionResponse {
  date: string;
  description: string;
  credit: number;
  debit: number;
}

export interface IStatementResponse {
  debit_total: number;
  credit_total: number;
  net_balance: number;
  number_of_transactions: number;
  top_expenses: ITransactionResponse[];
  top_incomes: ITransactionResponse[];
  transaction_list_filtered: ITransactionResponse[];
  credit_list: ITransactionResponse[];
  debit_list: ITransactionResponse[];
}
