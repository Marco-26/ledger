import type {
  IStatementResponse,
  ITransactionCategoryResponse,
  ITransactionResponse,
  TransactionTypeValues,
} from "../../data/StatementDaos";
import type {
  IStatement,
  ITransaction,
  ITransactionCategory,
} from "../../data/StatementDtos";
import { TransactionType } from "../../data/StatementDtos";
import dayjs from "dayjs";

type StatementDataMapper = {
  TRANSACTION_DATA_INBOUD: Record<TransactionTypeValues, TransactionType>;
}

export class StatementDataAdapter {
  private readonly dataMapping: StatementDataMapper = {
    TRANSACTION_DATA_INBOUD : {
      INCOME: TransactionType.INCOME,
      EXPENSE: TransactionType.EXPENSE 
    }
  }

  convertDataToTransaction(
    transactionResponse: ITransactionResponse,
  ): ITransaction {
    return {
      date: dayjs(transactionResponse.date),
      description: transactionResponse.description,
      amount: transactionResponse.amount,
      category: transactionResponse.category,
      type: this.dataMapping.TRANSACTION_DATA_INBOUD[transactionResponse.type]
    };
  }

  convertDataToTransactionList(
    transactionResponseList: ITransactionResponse[],
  ): ITransaction[] {
    return transactionResponseList.map((transactionResponse) =>
      this.convertDataToTransaction(transactionResponse),
    );
  }

  convertDataToTransactionCategory(
    categoryResponse: ITransactionCategoryResponse,
  ): ITransactionCategory {
    return {
      label: categoryResponse.label,
      amount: categoryResponse.amount,
      percentage: categoryResponse.percentage,
      type: this.dataMapping.TRANSACTION_DATA_INBOUD[categoryResponse.type],
    };
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
      transactionCategories: statementResponse.transaction_categories.map(
        (category) => this.convertDataToTransactionCategory(category),
      ),
      creditTotalGrowthRate: statementResponse.credit_total_growth_rate,
      debitTotalGrowthRate: statementResponse.debit_total_growth_rate,
      netBalanceTotalGrowthRate:
        statementResponse.net_balance_total_growth_rate,
    };
  }
}

export default new StatementDataAdapter();
