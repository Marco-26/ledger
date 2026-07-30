export interface ITransactionResponse {
  date: string;
  description: string;
  credit: number;
  debit: number;
  category: string;
}

export interface ICategorySpendingResponse {
  label: string;
  value: number;
}

export interface IStatementResponse {
  date: string;
  debit_total: number;
  credit_total: number;
  net_balance: number;
  top_expenses: ITransactionResponse[];
  top_incomes: ITransactionResponse[];
  all_transactions: ITransactionResponse[];
  credit_list: ITransactionResponse[];
  debit_list: ITransactionResponse[];
  spending_by_category: ICategorySpendingResponse[];
  credit_total_growth_rate: number;
  debit_total_growth_rate: number;
  net_balance_total_growth_rate: number;
}
