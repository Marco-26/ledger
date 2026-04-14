from repository.statement_repository import StatementRepository
from dtos.statement_dto import StatementDto
from sqlalchemy.orm import Session
from utils.statement_dataframe import (
    build_statement_dataframe,
    normalize_statement_dataframe,
    process_dataframe_data,
)
from utils.statement_pdf import extract_table_from_pdf
from datetime import date

from adapters.statement_model_adapters import dataframe_to_transaction_database, transaction_database_to_dataframe 

class StatementService:
    def __init__(self, db: Session):
        self.db = db
        self.repository = StatementRepository(db)

    def generate_monthly_statement(self, file: bytes, date: date) -> StatementDto:
        table = extract_table_from_pdf(file)
        df = build_statement_dataframe(table)
        df = normalize_statement_dataframe(df)

        processed_df = process_dataframe_data(df)
        monthly_statement = StatementDto.from_processed_df(processed_df)
        monthly_statement.date = date

        transactions = [dataframe_to_transaction_database(row=row) for row in df.to_dict(orient="records")]
        self.repository.create_statement(transactions=transactions, date=date)

        return monthly_statement

    def get_statement_via_date(self, date: date) -> StatementDto | None:
        statement = self.repository.get_statement_via_date(date)
        
        if not statement:
            return None

        df = transaction_database_to_dataframe(statement.transactions)
        processed_df = process_dataframe_data(df)
        monthly_statement = StatementDto.from_processed_df(processed_df)
        monthly_statement.date = statement.date_uploaded

        return monthly_statement
