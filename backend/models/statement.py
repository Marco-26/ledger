from db.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from sqlalchemy import JSON

class Statement(Base):
  __tablename__ = "statements"
  
  id: Mapped[int] = mapped_column(primary_key=True)
  date: Mapped[str] = mapped_column(default=datetime.now) 
  debit_total: Mapped[float] = mapped_column()
  credit_total: Mapped[float] = mapped_column()
  net_balance: Mapped[float] = mapped_column()
  number_of_transactions: Mapped[int] = mapped_column()
  # JSON strings
  top_expenses: Mapped[list] = mapped_column(JSON)
  top_incomes: Mapped[list] = mapped_column(JSON)
  transaction_list_filtered: Mapped[list] = mapped_column(JSON)
  debit_list: Mapped[list] = mapped_column(JSON)
  credit_list: Mapped[list] = mapped_column(JSON)