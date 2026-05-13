from repository.statement_repository import StatementRepository
from dtos.statement_dto import StatementDTO
from sqlalchemy.orm import Session
from utils.statement_dataframe import (
    build_statement_dataframe,
    normalize_statement_dataframe,
)
from utils.statement_pdf import extract_table_from_pdf
from datetime import date
from mappers.transaction_mapper import TransactionMapper
from utils import utils
from domain.transaction_builder import TransactionBuilder

class StatementService:
  def __init__(self, db: Session):
    self.db = db
    self.repository = StatementRepository(db)

  def generate_monthly_statement(self, file: bytes, date: date) -> StatementDTO:
    table = extract_table_from_pdf(file)
    df = normalize_statement_dataframe(build_statement_dataframe(table))
    
    transactions = TransactionMapper.from_df(df)
    
    record = self.repository.get_statement_via_date(date)
    if record:
      self.repository.delete_statement(record)
    
    self.repository.create_statement(transactions, date)
    
    return self.get_monthly_statement(date)
  
  def get_monthly_statement(self, date: date) -> StatementDTO:
    end_date = utils.get_end_of_month(date)
    
    transactions = self.repository.get_transactions(date, end_date)
    top_credit_transactions = self.repository.get_top_credit_transactions(date, end_date)
    top_debit_transactions = self.repository.get_top_debit_transactions(date, end_date)
    daily_transactions = self.repository.get_daily_transactions(date, end_date)
    
    return TransactionBuilder.build_statement(transactions=transactions, top_credit_transactions=top_credit_transactions, top_debit_transactions=top_debit_transactions, daily_transactions=daily_transactions, date=date)
        
        
        