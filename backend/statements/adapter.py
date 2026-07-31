from pandas import DataFrame as df
from schemas.statement_dto import TransactionDTO, TransactionType
from utils.statement_dataframe_utils import DFColumns
from utils.utils import clean_transaction


def dataframe_to_transactions(data: df) -> list[TransactionDTO]:
    transactions = []

    for row in data.to_dict(orient="records"):
        amount = row[DFColumns.CREDIT.value] or row[DFColumns.DEBIT.value]
        type = (
            TransactionType.CREDIT
            if row[DFColumns.CREDIT.value]
            else TransactionType.DEBIT
        )

        transactions.append(
            TransactionDTO(
                date=row[DFColumns.DATE.value],
                description=clean_transaction(row[DFColumns.DESCRIPTION.value]),
                amount=amount,
                type=type,
            )
        )

    return transactions
