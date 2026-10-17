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
  id: number;
  date: string;
  expense_total: number;
  income_total: number;
  net_balance: number;
  top_expenses: ITransactionResponse[];
  top_incomes: ITransactionResponse[];
  all_transactions: ITransactionResponse[];
  income_list: ITransactionResponse[];
  expense_list: ITransactionResponse[];
  transaction_categories: ITransactionCategoryResponse[];
  income_total_growth_rate: number;
  expense_total_growth_rate: number;
  net_balance_total_growth_rate: number;
}

export interface IMonthlySummaryResponse {
  month: string;
  expenses: number;
  income: number;
  net_balance: number;
}

export interface IYearlyStatementResponse {
  year: number;
  expense_total: number;
  income_total: number;
  net_balance: number;
  top_expenses: ITransactionResponse[];
  top_incomes: ITransactionResponse[];
  all_transactions: ITransactionResponse[];
  transaction_categories: ITransactionCategoryResponse[];
  month_summaries: IMonthlySummaryResponse[];
}
