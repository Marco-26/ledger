from db.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

class Statement(Base):
  __tablename__ = "statements"
  
  id: Mapped[int] = mapped_column(primary_key=True)
  date: Mapped[str] = mapped_column(default=datetime.now) 
  debit_total: Mapped[float] = mapped_column()
  credit_total: Mapped[float] = mapped_column()
  net_balance: Mapped[float] = mapped_column()
  number_of_transactions: Mapped[int] = mapped_column()
  # JSON strings
  top_expenses: Mapped[str] = mapped_column()
  top_incomes: Mapped[str] = mapped_column()
  transaction_list_filtered: Mapped[str] = mapped_column()
  debit_list: Mapped[str] = mapped_column()
  credit_list: Mapped[str] = mapped_column()