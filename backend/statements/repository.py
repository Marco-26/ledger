from datetime import date
from db.models.statement import Statement, Transaction
from sqlalchemy.orm import Session
from sqlalchemy import select
from constants import TOP_N_TRANSACTIONS
from schemas.statement_dto import TransactionDTO


class StatementRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def create_statement(
        self, transactions: list[TransactionDTO], date: date
    ) -> Statement:
        try:
            new_record = Statement(date_uploaded=date)
            new_record.transactions = [
                Transaction(
                    date=t.date,
                    description=t.description,
                    debit=t.debit,
                    credit=t.credit,
                    category=t.category,
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
        return self.db.execute(stmt).unique().scalar_one_or_none()

    def delete_statement(self, statement: Statement):
        self.db.delete(statement)
        self.db.commit()

    def get_transactions(self, start_date: date, end_date: date):
        stmt = select(Transaction).where(Transaction.date.between(start_date, end_date))
        return self.db.execute(stmt).scalars().all()

    def get_top_credit_transactions(self, start_date: date, end_date: date):
        stmt = (
            select(Transaction)
            .where(
                Transaction.date.between(start_date, end_date),
                Transaction.credit > 0,
            )
            .order_by(Transaction.credit.desc())
            .limit(TOP_N_TRANSACTIONS)
        )
        return self.db.execute(stmt).scalars().all()

    def get_top_debit_transactions(self, start_date: date, end_date: date):
        stmt = (
            select(Transaction)
            .where(
                Transaction.date.between(start_date, end_date),
                Transaction.debit > 0,
            )
            .order_by(Transaction.debit.desc())
            .limit(TOP_N_TRANSACTIONS)
        )
        return self.db.execute(stmt).scalars().all()

    def get_category_based_on_description(self, description: str):
        stmt = select(Transaction.category).where(
            Transaction.description == description,
        )
        return self.db.execute(stmt).scalars().first()
