from db.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Date, String, Float, ForeignKey
from datetime import date
from typing import Optional


class Statement(Base):
    __tablename__ = "statements"

    id: Mapped[int] = mapped_column(primary_key=True)
    date_uploaded: Mapped[date] = mapped_column(
        Date, default=lambda: date.today().replace(day=1)
    )
    transactions = relationship(
        "Transaction",
        back_populates="statement",
        lazy="joined",
        cascade="all, delete-orphan",
    )


class Transaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(primary_key=True)
    statement_id = mapped_column(
        ForeignKey("statements.id", ondelete="CASCADE"), nullable=False
    )
    statement = relationship("Statement", back_populates="transactions")
    transaction_date: Mapped[date] = mapped_column(Date)
    transaction_description: Mapped[str] = mapped_column(String)
    transaction_debit: Mapped[Optional[float]] = mapped_column(Float)
    transaction_credit: Mapped[Optional[float]] = mapped_column(Float)
    transaction_balance: Mapped[float] = mapped_column(Float)
