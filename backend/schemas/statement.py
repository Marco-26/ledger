from datetime import date as Date
from enum import Enum
from typing import Optional

from pydantic import BaseModel, ConfigDict


class TransactionType(str, Enum):
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
    id: int
    date: Optional[Date] = None
    expense_total: float
    income_total: float
    net_balance: float
    top_expenses: list[TransactionDTO]
    top_incomes: list[TransactionDTO]
    all_transactions: list[TransactionDTO]
    expense_list: list[TransactionDTO]
    income_list: list[TransactionDTO]
    transaction_categories: list[TransactionCategoryDTO]

    income_total_growth_rate: float
    expense_total_growth_rate: float
    net_balance_total_growth_rate: float


# object that holds month summaries for the yearly statement
class MonthlySummaryRead(BaseModel):
    month: str
    expenses: float
    income: float
    net_balance: float
    

class YearlyStatementRead(BaseModel):
    year: int
    expense_total: float
    income_total: float
    net_balance: float
    top_expenses: list[TransactionDTO]
    top_incomes: list[TransactionDTO]
    transaction_categories: list[TransactionCategoryDTO]
    all_transactions: list[TransactionDTO]
    month_summaries: list[MonthlySummaryRead]

