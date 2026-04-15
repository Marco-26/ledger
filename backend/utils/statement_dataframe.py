import pandas as pd
from datetime import date
from constants import TOP_N_TRANSACTIONS
from dtos.statement_dto import TransactionDto, StatementDto

STATEMENT_COLUMNS = ["Date", "Description", "Debit", "Credit", "Balance"]
NUMERIC_COLUMNS = ["Debit", "Credit", "Balance"]

def build_statement_dataframe(rows: list) -> pd.DataFrame:
    df = pd.DataFrame(rows)
    df = df.drop(1, axis=1)
    df.columns = STATEMENT_COLUMNS
    return df

def normalize_statement_dataframe(data: pd.DataFrame) -> pd.DataFrame:
    df = data.copy()

    df["Date"] = pd.to_datetime(df["Date"], format="%d-%m-%y").dt.date

    for column in NUMERIC_COLUMNS:
        df[column] = df[column].str.replace(".", "", regex=False)
        df[column] = df[column].str.replace(",", ".", regex=False)
        df[column] = pd.to_numeric(df[column], errors="coerce")

    df["Credit"] = df["Credit"].fillna(0.0)
    df["Debit"] = df["Debit"].fillna(0.0)
    return df

def _get_top_transactions(df: pd.DataFrame, column: str, n: int) -> pd.DataFrame:
    """Get top N transactions sorted by column descending."""
    return (
        df.loc[df[column] > 0, ["Date", "Description", column]]
        .sort_values(by=column, ascending=False)
        .head(n)
    )

def _df_to_transactions_dto(df: pd.DataFrame) -> list[TransactionDto]:
    return [TransactionDto.from_row(row) for row in df.to_dict(orient="records")]

def compute_statement_dto(df: pd.DataFrame, statement_date: date) -> StatementDto:
    debit_total = df["Debit"].sum()
    credit_total = df["Credit"].sum()

    top_expenses_df = _get_top_transactions(df, "Debit", TOP_N_TRANSACTIONS)
    top_incomes_df = _get_top_transactions(df, "Credit", TOP_N_TRANSACTIONS)

    debits_df = df.loc[df["Debit"] > 0, ["Date", "Description", "Debit"]]
    credits_df = df.loc[df["Credit"] > 0, ["Date", "Description", "Credit"]]
    
    transactions_df = df[["Date", "Description", "Debit", "Credit"]]
    daily_transactions = transactions_df.groupby("Date", as_index=False)[["Debit", "Credit"]].sum()

    return StatementDto(
        date=statement_date,
        debit_total=debit_total,
        credit_total=credit_total,
        net_balance=credit_total - debit_total,
        number_of_transactions=len(df),
        top_expenses=_df_to_transactions_dto(top_expenses_df),
        top_incomes=_df_to_transactions_dto(top_incomes_df),
        transaction_list_filtered=_df_to_transactions_dto(daily_transactions),
        debit_list=_df_to_transactions_dto(debits_df),
        credit_list=_df_to_transactions_dto(credits_df),
    )
