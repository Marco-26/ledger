import pandas as pd
from enum import Enum


class DFColumns(Enum):
    DATE = "Date"
    DESCRIPTION = "Description"
    EXPENSE = "Expense"
    INCOME = "Income"
    BALANCE = "Balance"


STATEMENT_COLUMNS = [col.value for col in DFColumns]

NUMERIC_COLUMNS = [
    DFColumns.EXPENSE.value,
    DFColumns.INCOME.value,
    DFColumns.BALANCE.value,
]


def build_statement_dataframe(rows: list[list[str]]) -> pd.DataFrame:
    df = pd.DataFrame(rows)
    df = df.drop(1, axis=1)
    df.columns = STATEMENT_COLUMNS

    df = df.astype({col: str for col in STATEMENT_COLUMNS})

    return df


def normalize_statement_dataframe(data: pd.DataFrame) -> pd.DataFrame:
    df = data.copy()

    df[DFColumns.DATE.value] = pd.to_datetime(
        df[DFColumns.DATE.value], format="%d-%m-%y"
    ).dt.date

    for column in NUMERIC_COLUMNS:
        df[column] = df[column].str.replace(".", "", regex=False)
        df[column] = df[column].str.replace(",", ".", regex=False)
        df[column] = pd.to_numeric(df[column], errors="coerce")

    df[DFColumns.INCOME.value] = df[DFColumns.INCOME.value].fillna(0.0)
    df[DFColumns.EXPENSE.value] = df[DFColumns.EXPENSE.value].fillna(0.0)
    return df
