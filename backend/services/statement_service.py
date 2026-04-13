
from repository.statement_repository import StatementRepository
from models.statement import Statement
from schema.monthly_statement import MonthlyStatement
from sqlalchemy.orm import Session
from utils.statement_dataframe import (
    build_statement_dataframe,
    normalize_statement_dataframe,
    process_dataframe_data,
    transactions_to_dataframe,
)
from utils.statement_pdf import extract_table_from_pdf
from datetime import date
from models.statement import Transaction

class StatementService:
    def __init__(self, db: Session):
        self.db = db
        self.repository = StatementRepository(db)

    def generate_monthly_statement(self, file: bytes, date: date) -> Statement:
        table = extract_table_from_pdf(file)
        df = build_statement_dataframe(table)
        df = normalize_statement_dataframe(df)

        processed_df = process_dataframe_data(df)
        monthly_statement = MonthlyStatement.from_processed_df(processed_df)

        transactions = [Transaction.from_df(row) for row in df.to_dict(orient="records")]
        self.repository.create_statement(transactions=transactions, date=date)

        return monthly_statement

    def get_statement_via_date(self, date: date) -> Statement | None:
        statement = self.repository.get_statement_via_date(date)
        
        if not statement:
            return None

        df = transactions_to_dataframe(statement.transactions)
        processed_df = process_dataframe_data(df)
        monthly_statement = MonthlyStatement.from_processed_df(processed_df)

        return monthly_statement
