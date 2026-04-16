from repository.statement_repository import StatementRepository
from dtos.statement_dto import StatementDto
from sqlalchemy.orm import Session
from utils.statement_dataframe import (
    build_statement_dataframe,
    normalize_statement_dataframe,
    compute_statement_dto,
)
from utils.statement_pdf import extract_table_from_pdf
from datetime import date
from mappers.transaction_mapper import TransactionMapper

class StatementService:
    def __init__(self, db: Session):
        self.db = db
        self.repository = StatementRepository(db)

    def generate_monthly_statement(self, file: bytes, date: date) -> StatementDto:
        table = extract_table_from_pdf(file)
        df = normalize_statement_dataframe(build_statement_dataframe(table))
        
        transactions = TransactionMapper.from_df(df)
        
        record = self.repository.get_statement_via_date(date)
        if record:
            self.repository.delete_statement(record)
        
        self.repository.create_statement(transactions, date)
        
        return compute_statement_dto(df, date)
    
    def get_monthly_statement(self, date:date) -> StatementDto | None:
        statement = self.repository.get_statement_via_date(date)
        if not statement:
            return None
        
        df = TransactionMapper.from_orm_to_df(statement.transactions)
        return compute_statement_dto(df, date)
        
        