from db.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Date, String, Float, ForeignKey
from datetime import date
from typing import Optional
import pandas as pd


class Statement(Base):
    __tablename__ = "statements"

    id: Mapped[int] = mapped_column(primary_key=True)
    date_uploaded: Mapped[date] = mapped_column(
        Date, default=lambda: date.today().replace(day=1)
    )
    transactions = relationship(
        "Transaction", back_populates="statement", lazy="joined"
    )


class Transaction(Base):
    __tablename__ = "transaction"

    id: Mapped[int] = mapped_column(primary_key=True)
    statement_id = mapped_column(ForeignKey("statements.id"))
    statement = relationship("Statement", back_populates="transactions")
    transaction_date: Mapped[date] = mapped_column(Date)
    transaction_description: Mapped[str] = mapped_column(String)
    transaction_debit: Mapped[Optional[float]] = mapped_column(Float)
    transaction_credit: Mapped[Optional[float]] = mapped_column(Float)
    transaction_balance: Mapped[float] = mapped_column(Float)

    @classmethod
    def from_df(cls, row: pd.DataFrame):
        return cls(
            transaction_date=row["Date"],
            transaction_description=row["Description"],
            transaction_debit=row["Debit"],
            transaction_credit=row["Credit"],
            transaction_balance=row["Balance"],
        )
