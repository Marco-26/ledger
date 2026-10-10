from decimal import Decimal

from db.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Date, Numeric, String, ForeignKey, UniqueConstraint, Enum as SQLEnum
from datetime import date as dt_date
from enum import Enum
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from db.models.user import User


class Statement(Base):
    __tablename__ = "statements"
    __table_args__ = (
        UniqueConstraint("user_id", "date_uploaded", name="uq_statements_user_month"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    date_uploaded: Mapped[dt_date] = mapped_column(
        Date, default=lambda: dt_date.today().replace(day=1)
    )

    transactions: Mapped[list["Transaction"]] = relationship(
        back_populates="statement",
        lazy="selectin",
        cascade="all, delete-orphan",
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    user: Mapped["User"] = relationship(back_populates="statements")


class TransactionType(str, Enum):
    EXPENSE = "EXPENSE"
    INCOME = "INCOME"


class Transaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(primary_key=True)
    statement_id: Mapped[int] = mapped_column(
        ForeignKey("statements.id", ondelete="CASCADE"), nullable=False
    )

    statement: Mapped["Statement"] = relationship(
        "Statement", back_populates="transactions"
    )
    date: Mapped[dt_date] = mapped_column(Date)
    description: Mapped[str] = mapped_column(String)
    category: Mapped[str] = mapped_column(String)
    type: Mapped[TransactionType] = mapped_column(SQLEnum(TransactionType))
    amount: Mapped[Decimal] = mapped_column(Numeric(12, 2))
