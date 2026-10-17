from datetime import date
from decimal import Decimal

from db.models.statement import Statement, Transaction
from db.models.statement import TransactionType as TransactionTypeModel
from schemas.statement import TransactionDTO
from sqlalchemy import delete, extract, select
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

    def delete_statement(self, statement_id: int, user_id: int) -> bool:
        stmt = delete(Statement).where(
            Statement.id == statement_id, Statement.user_id == user_id
        )
        result = self.db.execute(stmt)
        self.db.commit()

        return result.rowcount > 0

    def get_statement_by_date(self, date: date, user_id: int) -> Statement | None:
        stmt = select(Statement).where(
            Statement.user_id == user_id, Statement.date_uploaded == date
        )
        return self.db.scalars(stmt).one_or_none()

    def get_all_statements_in_a_year(
        self, year: int, user_id: int
    ) -> list[Statement]:
        stmt = select(Statement).where(
            Statement.user_id == user_id,
            extract("year", Statement.date_uploaded) == year,
        )
        return list(self.db.scalars(stmt).all())

    def get_category_based_on_description(self, description: str) -> str | None:
        stmt = select(Transaction.category).where(
            Transaction.description == description,
        )
        return self.db.scalars(stmt).first()
