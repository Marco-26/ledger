from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import date as Date
from enum import Enum


class TransactionType(Enum):
    INCOME = "INCOME"
    EXPENSE = "EXPENSE"


class TransactionDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    date: Date
    description: str | None = None
    category: str | None = None
    type: TransactionType
    amount: float


class TransactionCategoryDTO(BaseModel):
    label: str
    amount: float
    percentage: float
    type: TransactionType


class StatementDTO(BaseModel):
    date: Optional[Date] = None
    debit_total: float
    credit_total: float
    net_balance: float
    top_expenses: list[TransactionDTO]
    top_incomes: list[TransactionDTO]
    all_transactions: list[TransactionDTO]
    debit_list: list[TransactionDTO]
    credit_list: list[TransactionDTO]
    transaction_categories: list[TransactionCategoryDTO]

    credit_total_growth_rate: float
    debit_total_growth_rate: float
    net_balance_total_growth_rate: float
