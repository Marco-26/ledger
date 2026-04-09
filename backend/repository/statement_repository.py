from datetime import date
from schema.monthly_statement import MonthlyStatement
from models.statement import Statement
from sqlalchemy.orm import Session
from sqlalchemy import select

class StatementRepository:
  def __init__(self, db: Session) -> None:
    self.db = db

  def create_statement(self, statement: MonthlyStatement, date:date) -> Statement:
    record = self.get_statement_via_date(date)
    if record:
      self.db.delete(record)
      
    new_record = Statement(**statement.model_dump(), date = date)
    self.db.add(new_record)
    self.db.commit()
    self.db.refresh(new_record)
    
    return new_record
  
  def get_statement_via_date(self, date:date):
    stmt = select(Statement).where(Statement.date == date)
    record = self.db.execute(stmt).scalar_one_or_none()
    return record