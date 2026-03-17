from repository.statement_repository import StatementRepository
from models.statement import Statement
from schema.monthly_statement import MonthlyStatement, Transaction
from constants import DECIMAL_CASE_ROUND, TOP_N_TRANSACTIONS
from sqlalchemy.orm import Session
from utils.statement_dataframe import (
    build_statement_dataframe,
    normalize_statement_dataframe,
    process_dataframe_data
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
        processed_df = process_dataframe_data(df)
        monthly_statement = MonthlyStatement.from_processed_df(processed_df)

        record = self.repository.create_statement(statement=monthly_statement)

        return record
