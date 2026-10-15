from pandas import DataFrame as df

from schemas.statement import TransactionDTO, TransactionType
from utils.statement_dataframe_utils import DFColumns
from utils.utils import clean_transaction


def dataframe_to_transactions(data: df) -> list[TransactionDTO]:
    transactions: list[TransactionDTO] = []

    for row in data.to_dict(orient="records"):
        amount = row[DFColumns.INCOME.value] or row[DFColumns.EXPENSE.value]
        type = (
            TransactionType.INCOME
            if row[DFColumns.INCOME.value]
            else TransactionType.EXPENSE
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
