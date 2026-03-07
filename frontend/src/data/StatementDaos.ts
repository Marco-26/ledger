export interface IStatementResponse {
  debit_total: number;
  credit_total: number;
  net_balance: number;
  number_of_transactions: number;
  top_expenses: [];
  top_incomes: [];
  debit_list_filtered: [];
  credit_list_filtered: [];
  credit_list: [];
  debit_list: [];
}
