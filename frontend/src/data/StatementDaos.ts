export interface ITransactionResponse {
  date: string;
  credit: number;
  debit: number;
}

export interface ITransactionDetailResponse {
  Date: string;
  Description: string;
  Credit?: number;
  Debit?: number;
}

export interface IStatementResponse {
  debit_total: number;
  credit_total: number;
  net_balance: number;
  number_of_transactions: number;
  top_expenses: ITransactionDetailResponse[];
  top_incomes: ITransactionDetailResponse[];
  transaction_list_filtered: ITransactionResponse[];
  credit_list: ITransactionDetailResponse[];
  debit_list: ITransactionDetailResponse[];
}
