from db.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Date, String, Float, ForeignKey
from datetime import date as dt_date


class Statement(Base):
    __tablename__ = "statements"

    id: Mapped[int] = mapped_column(primary_key=True)
    date_uploaded: Mapped[dt_date] = mapped_column(
        Date, default=lambda: dt_date.today().replace(day=1)
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
    statement_id: Mapped[int] = mapped_column(
        ForeignKey("statements.id", ondelete="CASCADE"), nullable=False
    )

    statement = relationship("Statement", back_populates="transactions")
    date: Mapped[dt_date] = mapped_column(Date)
    description: Mapped[str] = mapped_column(String)
    category: Mapped[str] = mapped_column(String)
    type: Mapped[str] = mapped_column(String)  # DEBIT OR CREDIT
    amount: Mapped[float] = mapped_column(Float)
