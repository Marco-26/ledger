from datetime import date
from decimal import Decimal

from db.models.statement import Statement, Transaction
from db.models.statement import TransactionType as TransactionTypeModel
from schemas.statement import TransactionDTO
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
                    amount=Decimal(str(t.amount)),
                    type=TransactionTypeModel(t.type.value),
                )
                for t in transactions
            ]

            self.db.add(new_record)
            self.db.commit()

        except Exception:
            self.db.rollback()
            raise

        return new_record

    def delete_statement(self, statement: Statement) -> None:
        self.db.delete(statement)
        self.db.commit()

    def get_statement(self, start_date: date, user_id:int) -> Statement | None:
        stmt = select(Statement).where(Statement.user_id == user_id, Statement.date_uploaded == start_date)
        return self.db.scalars(stmt).one_or_none()
          

    def get_category_based_on_description(self, description: str) -> str | None:
        stmt = select(Transaction.category).where(
            Transaction.description == description,
        )
        return self.db.scalars(stmt).first()
