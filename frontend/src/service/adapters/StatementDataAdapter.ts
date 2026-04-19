import type {
  IStatementResponse,
  ITransactionResponse,
} from "@/data/StatementDaos";
import type { IStatement, ITransaction } from "@/data/StatementDtos";
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
      numberOfTransactions: statementResponse.number_of_transactions,
      topExpenses: this.convertDataToTransactionList(
        statementResponse.top_expenses,
      ),
      topIncomes: this.convertDataToTransactionList(
        statementResponse.top_incomes,
      ),
      transactionListFiltered: this.convertDataToTransactionList(
        statementResponse.transaction_list_filtered,
      ),
      creditList: this.convertDataToTransactionList(
        statementResponse.credit_list,
      ),
      debitList: this.convertDataToTransactionList(
        statementResponse.debit_list,
      ),
    };
  }
}

export default new StatementDataAdapter();
