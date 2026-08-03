export type TransactionTypeValues = "INCOME" | "EXPENSE"

export interface ITransactionResponse {
  date: string;
  description: string;
  category: TransactionTypeValues;
  amount: number;
  type: TransactionTypeValues
}

export interface ITransactionCategoryResponse {
  label: string;
  amount: number;
  percentage: number;
  type: TransactionTypeValues;
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
  transaction_categories: ITransactionCategoryResponse[];
  credit_total_growth_rate: number;
  debit_total_growth_rate: number;
  net_balance_total_growth_rate: number;
}
