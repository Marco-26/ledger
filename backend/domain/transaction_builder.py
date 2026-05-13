from db.models.statement import Transaction
from dtos.statement_dto import StatementDTO
from mappers.transaction_mapper import TransactionMapper
from datetime import date

class TransactionBuilder:
  @staticmethod
  def _map_transactions(transactions, predicate):
    return [
      TransactionMapper.from_statement_orm(t)
      for t in transactions
      if predicate(t)
    ]

  @staticmethod
  def build_statement(
    transactions: list[Transaction],
    top_credit_transactions: list[Transaction],
    top_debit_transactions: list[Transaction],
    daily_transactions: list[Transaction],
    date: date,
  ) -> StatementDTO:
    credit_total = sum(t.transaction_credit or 0.0 for t in transactions)
    debit_total = sum(t.transaction_debit or 0.0 for t in transactions)

    credit_list = TransactionBuilder._map_transactions(
      transactions=transactions,
      predicate=lambda t: (t.transaction_credit or 0) > 0,
    )
    debit_list = TransactionBuilder._map_transactions(
      transactions=transactions,
      predicate=lambda t: (t.transaction_debit or 0) > 0,
    )
    top_expenses = TransactionBuilder._map_transactions(
      transactions=top_debit_transactions,
      predicate=lambda t: (t.transaction_debit or 0) > 0,
    )
    top_incomes = TransactionBuilder._map_transactions(
      transactions=top_credit_transactions,
      predicate=lambda t: (t.transaction_credit or 0) > 0,
    )

    daily_transactions = [
      TransactionMapper.from_statement_orm(transaction)
      for transaction in daily_transactions
    ]

    return StatementDTO(
      date=date,
      debit_total=debit_total,
      credit_total=credit_total,
      net_balance=credit_total - debit_total,
      number_of_transactions=len(transactions),
      top_expenses=top_expenses,
      top_incomes=top_incomes,
      transaction_list_filtered=daily_transactions,
      credit_list=credit_list,
      debit_list=debit_list,
    )
