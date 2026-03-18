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

def process_dataframe_data(df: pd.DataFrame) -> dict:
    top_expenses = (
        df.loc[df["Debit"] > 0, ["Date", "Description", "Debit"]]
        .sort_values(by="Debit", ascending=False)
        .head(TOP_N_TRANSACTIONS)
    ).to_dict(orient="records")
    
    top_expenses_class = [Transaction(date=top["Date"], description=top["Description"], debit=top["Debit"], credit=0.0) for top in top_expenses]

    top_incomes = (
        df.loc[df["Credit"] > 0, ["Date", "Description", "Credit"]]
        .sort_values(by="Credit", ascending=False)
        .head(TOP_N_TRANSACTIONS)
    ).to_dict(orient="records")

    top_incomes_class = [Transaction(date=top["Date"], description=top["Description"], credit=top["Credit"], debit=0.0) for top in top_incomes]
    
    transactions = len(df)
    total_debit = df["Debit"].sum()
    total_credit = df["Credit"].sum()
    net_balance = total_credit - total_debit
    transaction_list_filtered = [
        Transaction(date=row["Date"], description=row["Description"], debit=row["Debit"], credit=row["Credit"])
        for _, row in df.iterrows()
    ]
    debit_list = [Transaction(date=row["Date"], description=row["Description"], debit=row["Debit"], credit=0.0) for _, row in df.loc[df["Debit"] > 0, ["Date", "Description", "Debit"]].iterrows()]
    credit_list = [Transaction(date=row["Date"], description=row["Description"], credit=row["Credit"], debit=0.0) for _, row in df.loc[df["Credit"] > 0, ["Date", "Description", "Credit"]].iterrows()]
    
    return {
        "top_expenses": top_expenses_class,
        "top_incomes": top_incomes_class,
        "transactions": transactions,
        "total_debit": total_debit,
        "total_credit": total_credit,
        "net_balance": net_balance,
        "transaction_list_filtered": transaction_list_filtered,
        "debit_list": debit_list,
        "credit_list": credit_list
    }
