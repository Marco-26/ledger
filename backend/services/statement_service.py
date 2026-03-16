import re
from io import BytesIO

import camelot
import pandas as pd
from schema.monthly_statement import MontlyStatement, Transaction
from constants import DATE_PATTERN_REGEX, DECIMAL_CASE_ROUND, TOP_N_TRANSACTIONS
from sqlalchemy.orm import Session


class StatementService:
    def __init__(self):
        pass

    def extract_table_from_pdf(self, file: bytes):
        pdf_stream = BytesIO(file)
        tables = camelot.read_pdf(
            pdf_stream, pages="all", flavor="stream", suppress_stdout=True
        )
        rows = []

        for table in tables:
            df = table.df

            for _, row in df.iterrows():
                if re.match(DATE_PATTERN_REGEX, str(row[0]).strip()):
                    rows.append(row.tolist())

        return rows

    def generate_df(self, rows: list) -> pd.DataFrame:
        df = pd.DataFrame(rows)
        df = df.drop(1, axis=1)
        df.columns = ["Date", "Description", "Debit", "Credit", "Balance"]
        return df

    def preprocess_data(self, data: pd.DataFrame) -> pd.DataFrame:
        numeric_columns = ["Debit", "Credit", "Balance"]
        df = data.copy()

        for col in numeric_columns:
            df[col] = df[col].str.replace(".", "", regex=False)
            df[col] = df[col].str.replace(",", ".", regex=False)
            df[col] = pd.to_numeric(df[col], errors="coerce")

        df["Credit"] = df["Credit"].fillna(0.0)
        df["Debit"] = df["Debit"].fillna(0.0)
        return df

    def generate_monthly_statement(self, file: bytes, db: Session) -> MontlyStatement:
        table = self.extract_table_from_pdf(file)
        df = self.generate_df(table)
        df = self.preprocess_data(df)

        top_expenses = (
            df.loc[df["Debit"] > 0, ["Date", "Description", "Debit"]]
            .sort_values(by="Debit", ascending=False)
            .head(TOP_N_TRANSACTIONS)
        ).to_dict(orient="records")

        top_incomes = (
            df.loc[df["Credit"] > 0, ["Date", "Description", "Credit"]]
            .sort_values(by="Credit", ascending=False)
            .head(TOP_N_TRANSACTIONS)
        ).to_dict(orient="records")

        transactions = len(df)
        total_debit = df["Debit"].sum()
        total_credit = df["Credit"].sum()
        net_balance = total_credit - total_debit

        statement = MontlyStatement(
            debit_total=round(total_debit, DECIMAL_CASE_ROUND),
            credit_total=round(total_credit, DECIMAL_CASE_ROUND),
            net_balance=round(net_balance, DECIMAL_CASE_ROUND),
            number_of_transactions=transactions,
            top_expenses=top_expenses,
            top_incomes=top_incomes,
            transaction_list_filtered=[
                Transaction(date=row["Date"], debit=row["Debit"], credit=row["Credit"])
                for _, row in df.iterrows()
            ],
            debit_list=df.loc[
                df["Debit"] > 0, ["Date", "Description", "Debit"]
            ].to_dict(orient="records"),
            credit_list=df.loc[
                df["Credit"] > 0, ["Date", "Description", "Credit"]
            ].to_dict(orient="records"),
        )

        return statement
