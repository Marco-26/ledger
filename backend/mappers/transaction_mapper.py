import pandas as pd
from db.models.statement import Transaction
from utils.statement_dataframe import DFColumns
from schemas.statement_dto import TransactionDTO, DailyTransactionDTO
from domain.models import DailyTransaction


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
        )

    @staticmethod
    def data_to_daily_transactions(
        daily_transaction: DailyTransaction,
    ) -> DailyTransactionDTO:
        return DailyTransactionDTO(
            date=daily_transaction.date,
            credit=daily_transaction.credit,
            debit=daily_transaction.debit,
        )
