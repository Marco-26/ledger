import pandas as pd


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
