from datetime import date
from db.models.statement import Statement, Transaction
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from constants import TOP_N_TRANSACTIONS
class StatementRepository:
  def __init__(self, db: Session) -> None:
    self.db = db

  def create_statement(self, transactions: list[Transaction], date: date) -> Statement:
    try:
      new_record = Statement(date_uploaded=date)
      new_record.transactions = transactions
     
      self.db.add(new_record)
      self.db.commit()

    except Exception:
      self.db.rollback()
      raise

    return new_record

  def get_statement_via_date(self, date: date) -> Statement | None:
    stmt = select(Statement).where(Statement.date_uploaded == date)
    return self.db.execute(stmt).unique().scalar_one_or_none()
  
  def delete_statement(self, statement: Statement):
    self.db.delete(statement)
    self.db.commit()
    
  def get_total_credit_value(self, start_date:date, end_date: date):
    return self.db.query(func.sum(Transaction.transaction_credit)).where(Transaction.transaction_date.between(start_date, end_date)).scalar()
  
  def get_total_debit_value(self, start_date:date ,end_date: date):
    return self.db.query(func.sum(Transaction.transaction_debit)).where(Transaction.transaction_date.between(start_date, end_date)).scalar()
  
  def get_top_credit_transactions(self, start_date:date, end_date:date):
    return self.db.query(Transaction).where(Transaction.transaction_date.between(start_date, end_date), Transaction.transaction_credit > 0).order_by(Transaction.transaction_credit.desc()).limit(TOP_N_TRANSACTIONS).all()
  
  def get_top_debit_transactions(self, start_date:date, end_date:date):
    return self.db.query(Transaction).where(Transaction.transaction_date.between(start_date, end_date), Transaction.transaction_debit > 0).order_by(Transaction.transaction_debit.desc()).limit(TOP_N_TRANSACTIONS).all()
  
  def get_credit_transaction_list(self,start_date:date, end_date:date):
    return self.db.query(Transaction).where(Transaction.transaction_date.between(start_date, end_date), Transaction.transaction_credit > 0).all()
  
  def get_debit_transaction_list(self,start_date:date, end_date:date):
    return self.db.query(Transaction).where(Transaction.transaction_date.between(start_date, end_date), Transaction.transaction_debit > 0).all()
  
  def get_daily_transactions(self,start_date:date, end_date:date):
    return self.db.query(Transaction).where(Transaction.transaction_date.between(start_date, end_date)).group_by(Transaction.transaction_date).all()