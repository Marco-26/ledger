from repository.statement_repository import StatementRepository
from models.statement import Statement
from schema.monthly_statement import MontlyStatement, Transaction
from constants import DECIMAL_CASE_ROUND, TOP_N_TRANSACTIONS
from sqlalchemy.orm import Session
from utils.statement_dataframe import (
    build_statement_dataframe,
    normalize_statement_dataframe,
)
from utils.statement_pdf import extract_table_from_pdf

class StatementService:
    def __init__(self, db: Session):
        self.db = db
        self.repository = StatementRepository(db)

    def generate_monthly_statement(self, file: bytes) -> Statement:
        table = extract_table_from_pdf(file)
        df = build_statement_dataframe(table)
        df = normalize_statement_dataframe(df)

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

        monthly_statement = MontlyStatement(
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

        record = self.repository.create_statement(statement=monthly_statement)

        return record
