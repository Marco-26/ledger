import type {
  IStatementResponse,
  ITransactionResponse,
} from "../../data/StatementDaos";
import type { IStatement, ITransaction } from "../../data/StatementDtos";
import dayjs from "dayjs";

export class StatementDataAdapter {
  convertDataToTransaction(
    transactionResponse: ITransactionResponse,
  ): ITransaction {
    return {
      date: dayjs(transactionResponse.date),
      description: transactionResponse.description,
      credit: transactionResponse.credit,
      debit: transactionResponse.debit,
      category: transactionResponse.category
    };
  }

  convertDataToTransactionList(
    transactionResponseList: ITransactionResponse[],
  ): ITransaction[] {
    return transactionResponseList.map((transactionResponse) =>
      this.convertDataToTransaction(transactionResponse),
    );
  }

  convertToStatement(statementResponse: IStatementResponse): IStatement {
    return {
      date: dayjs(statementResponse.date),
      debitTotal: statementResponse.debit_total,
      creditTotal: statementResponse.credit_total,
      netBalance: statementResponse.net_balance,
      topExpenses: this.convertDataToTransactionList(
        statementResponse.top_expenses,
      ),
      topIncomes: this.convertDataToTransactionList(
        statementResponse.top_incomes,
      ),
      allTransactions: this.convertDataToTransactionList(
        statementResponse.all_transactions,
      ),
      creditList: this.convertDataToTransactionList(
        statementResponse.credit_list,
      ),
      debitList: this.convertDataToTransactionList(
        statementResponse.debit_list,
      ),
      creditTotalGrowthRate: statementResponse.credit_total_growth_rate,
      debitTotalGrowthRate: statementResponse.debit_total_growth_rate,
      netBalanceTotalGrowthRate:
        statementResponse.net_balance_total_growth_rate,
    };
  }
}

export default new StatementDataAdapter();
