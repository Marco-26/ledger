import pandas as pd
from typing import Callable
from db.models.statement import Transaction
from utils.statement_dataframe import DFColumns
from schemas.statement_dto import TransactionDTO


def map_transactions_with_callback(
    transactions: list[Transaction], predicate: Callable[[Transaction], bool]
) -> list[TransactionDTO]:
    return [
        TransactionMapper.from_statement_orm(t) for t in transactions if predicate(t)
    ]


def map_transactions(transactions: list[Transaction]) -> list[TransactionDTO]:
    return [TransactionMapper.from_statement_orm(t) for t in transactions]


class TransactionMapper:
    @staticmethod
    def from_df(df: pd.DataFrame) -> list[Transaction]:
        return [
            Transaction(
                transaction_date=row[DFColumns.DATE.value],
                transaction_description=row[DFColumns.DESCRIPTION.value],
                transaction_debit=row[DFColumns.DEBIT.value],
                transaction_credit=row[DFColumns.CREDIT.value],
                transaction_balance=row[DFColumns.BALANCE.value],
                transaction_category="test",
            )
            for row in df.to_dict(orient="records")
        ]

    @staticmethod
    def from_statement_orm(transaction: Transaction) -> TransactionDTO:
        return TransactionDTO(
            date=transaction.transaction_date,
            credit=transaction.transaction_credit,
            description=transaction.transaction_description,
            debit=transaction.transaction_debit,
            category=transaction.transaction_category,
        )
