from datetime import date

from constants import TOP_N_TRANSACTIONS
from db.models.statement import Statement, Transaction
from schemas.statement import TransactionDTO, TransactionType
from sqlalchemy import select
from sqlalchemy.orm import Session


class StatementRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def create_statement(
        self, transactions: list[TransactionDTO], date: date, user_id: int
    ) -> Statement:
        try:
            new_record = Statement(date_uploaded=date, user_id=user_id)
            new_record.transactions = [
                Transaction(
                    date=t.date,
                    description=t.description,
                    category=t.category,
                    amount=t.amount,
                    type=t.type.value,
                )
                for t in transactions
            ]

            self.db.add(new_record)
            self.db.commit()

        except Exception:
            self.db.rollback()
            raise

        return new_record

    def get_statement_via_date(self, date: date) -> Statement | None:
        stmt = select(Statement).where(Statement.date_uploaded == date)
        return self.db.scalars(stmt).one_or_none()

    def delete_statement(self, statement: Statement):
        self.db.delete(statement)
        self.db.commit()

    def get_statement(self, start_date: date, user_id:int):
        stmt = select(Statement).where(Statement.user_id == user_id, Statement.date_uploaded == start_date)
        return self.db.scalars(stmt).unique().one_or_none()
          

    def get_top_credit_transactions(self, start_date: date, end_date: date):
        stmt = (
            select(Transaction)
            .where(
                Transaction.date.between(start_date, end_date),
                Transaction.type == TransactionType.INCOME,
            )
            .order_by(Transaction.amount.desc())
            .limit(TOP_N_TRANSACTIONS)
        )
        return self.db.scalars(stmt).all()

    def get_top_debit_transactions(self, start_date: date, end_date: date):
        stmt = (
            select(Transaction)
            .where(
                Transaction.date.between(start_date, end_date),
                Transaction.type == TransactionType.EXPENSE,
            )
            .order_by(Transaction.amount.desc())
            .limit(TOP_N_TRANSACTIONS)
        )
        return self.db.scalars(stmt).all()

    def get_category_based_on_description(self, description: str):
        stmt = select(Transaction.category).where(
            Transaction.description == description,
        )
        return self.db.scalars(stmt).first()
