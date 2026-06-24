from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import date as Date


class TransactionDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    date: Date
    credit: float
    description: str | None = None
    debit: float
    category: str


class StatementDTO(BaseModel):
    date: Optional[Date] = None
    debit_total: float
    credit_total: float
    net_balance: float
    number_of_transactions: int
    top_expenses: list[TransactionDTO]
    top_incomes: list[TransactionDTO]
    all_transactions: list[TransactionDTO]
    debit_list: list[TransactionDTO]
    credit_list: list[TransactionDTO]

    credit_total_growth_rate: float
    debit_total_growth_rate: float
    net_balance_total_growth_rate: float
