from datetime import date
from backend.db.models.statement import Statement, Transaction
from sqlalchemy.orm import Session
from sqlalchemy import select


class StatementRepository:
  def __init__(self, db: Session) -> None:
    self.db = db

  def create_statement(
    self, transactions: list[Transaction], date: date
  ) -> Statement:
    try:
      record = self.get_statement_via_date(date)
      if record:
        self.db.delete(record)

      new_record = Statement(date_uploaded=date)
      self.db.add(new_record)

      transactions = [
        Transaction(
          statement=new_record,
          transaction_date=t.transaction_date,
          transaction_description=t.transaction_description,
          transaction_debit=t.transaction_debit,
          transaction_credit=t.transaction_credit,
          transaction_balance=t.transaction_balance,
        )
        for t in transactions
      ]

      self.db.add_all(transactions)
      self.db.commit()
    except Exception:
      self.db.rollback()
      raise

    return new_record

  def get_statement_via_date(self, date: date):
    stmt = select(Statement).where(Statement.date_uploaded == date)
    record = self.db.execute(stmt).unique().scalar_one_or_none()
    return record
