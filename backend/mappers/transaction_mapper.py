import pandas as pd
from db.models.statement import Transaction
from utils.statement_dataframe_utils import DFColumns


class TransactionMapper:
    @staticmethod
    def from_df(df: pd.DataFrame) -> list[Transaction]:
        return [
            Transaction(
                date=row[DFColumns.DATE.value],
                description=row[DFColumns.DESCRIPTION.value],
                debit=row[DFColumns.DEBIT.value],
                credit=row[DFColumns.CREDIT.value],
                balance=row[DFColumns.BALANCE.value],
                category=row[DFColumns.CATEGORY.value],
            )
            for row in df.to_dict(orient="records")
        ]
