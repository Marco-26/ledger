from pandas import DataFrame as df
from schemas.statement_dto import TransactionDTO
from utils.statement_dataframe_utils import DFColumns
from utils.utils import clean_transaction


def dataframe_to_transactions(data: df) -> list[TransactionDTO]:
    return [
        TransactionDTO(
            date=row[DFColumns.DATE.value],
            description=clean_transaction(row[DFColumns.DESCRIPTION.value]),
            debit=row[DFColumns.DEBIT.value],
            credit=row[DFColumns.CREDIT.value],
        )
        for row in data.to_dict(orient="records")
    ]
