from datetime import date
from db.models.statement import Statement, Transaction
from sqlalchemy.orm import Session
from sqlalchemy import select

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
    