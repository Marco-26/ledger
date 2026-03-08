import type { IStatementResponse } from "@/data/StatementDaos";
import type { IStatement } from "@/data/StatementDtos";

export class StatementDataAdapter {
  convertToStatement(statementResponse: IStatementResponse): IStatement {
    return {
      debitTotal: statementResponse.debit_total,
      creditTotal: statementResponse.credit_total,
      netBalance: statementResponse.net_balance,
      numberOfTransactions: statementResponse.number_of_transactions,
      topExpenses: statementResponse.top_expenses,
      topIncomes: statementResponse.top_incomes,
      transactionListFiltered: statementResponse.transaction_list_filtered,
      creditList: statementResponse.credit_list,
      debitList: statementResponse.debit_list,
    };
  }
}

export default new StatementDataAdapter();
