import pandas as pd

from constants import TOP_N_TRANSACTIONS
from schema.monthly_statement import Transaction


STATEMENT_COLUMNS = ["Date", "Description", "Debit", "Credit", "Balance"]
NUMERIC_COLUMNS = ["Debit", "Credit", "Balance"]


def build_statement_dataframe(rows: list) -> pd.DataFrame:
    df = pd.DataFrame(rows)
    df = df.drop(1, axis=1)
    df.columns = STATEMENT_COLUMNS
    return df


def normalize_statement_dataframe(data: pd.DataFrame) -> pd.DataFrame:
    df = data.copy()

    for column in NUMERIC_COLUMNS:
        df[column] = df[column].str.replace(".", "", regex=False)
        df[column] = df[column].str.replace(",", ".", regex=False)
        df[column] = pd.to_numeric(df[column], errors="coerce")

    df["Credit"] = df["Credit"].fillna(0.0)
    df["Debit"] = df["Debit"].fillna(0.0)
    return df


def _df_to_transactions(df: pd.DataFrame) -> list[Transaction]:
    """Convert DataFrame rows to Transaction objects. Use debit/credit to override with fixed values."""
    return [Transaction.from_row(row) for row in df.to_dict(orient="records")]


def _df_to_daily_transactions(df: pd.DataFrame) -> list[Transaction]:
    daily = df.groupby("Date", as_index=False)[["Debit", "Credit"]].sum()
    return [Transaction.from_row(row) for row in daily.to_dict(orient="records")]


def _get_top_transactions(df: pd.DataFrame, column: str, n: int) -> pd.DataFrame:
    """Get top N transactions sorted by column descending."""
    return (
        df.loc[df[column] > 0, ["Date", "Description", column]]
        .sort_values(by=column, ascending=False)
        .head(n)
    )


def process_dataframe_data(df: pd.DataFrame) -> dict:
    total_debit = df["Debit"].sum()
    total_credit = df["Credit"].sum()

    top_expenses_df = _get_top_transactions(df, "Debit", TOP_N_TRANSACTIONS)
    top_incomes_df = _get_top_transactions(df, "Credit", TOP_N_TRANSACTIONS)

    debits_df = df.loc[df["Debit"] > 0, ["Date", "Description", "Debit"]]
    credits_df = df.loc[df["Credit"] > 0, ["Date", "Description", "Credit"]]

    return {
        "top_expenses": _df_to_transactions(top_expenses_df),
        "top_incomes": _df_to_transactions(top_incomes_df),
        "transactions": len(df),
        "total_debit": total_debit,
        "total_credit": total_credit,
        "net_balance": total_credit - total_debit,
        "transaction_list_filtered": _df_to_daily_transactions(
            df[["Date", "Description", "Debit", "Credit"]]
        ),
        "debit_list": _df_to_transactions(debits_df),
        "credit_list": _df_to_transactions(credits_df),
    }
