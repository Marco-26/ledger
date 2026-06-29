from schemas.statement_dto import TransactionDTO
import pandas as pd
from utils.statement_dataframe_utils import DFColumns


class TransactionMapper:
    @staticmethod
    def from_df(df: pd.DataFrame) -> list[TransactionDTO]:
        return [
            TransactionDTO(
                date=row[DFColumns.DATE.value],
                description=row[DFColumns.DESCRIPTION.value],
                debit=row[DFColumns.DEBIT.value],
                credit=row[DFColumns.CREDIT.value],
            )
            for row in df.to_dict(orient="records")
        ]
