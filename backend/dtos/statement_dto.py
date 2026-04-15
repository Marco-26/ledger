from pydantic import BaseModel
from typing import Dict, Any, Optional
from datetime import date as Date

class TransactionDto(BaseModel):
    date: Date
    credit: float
    description: str | None = None
    debit: float

    @classmethod
    def from_row(cls, row: Dict[str, Any]):
        return cls(
            date = row["Date"],
            description = row.get("Description"),
            debit = row.get("Debit", 0.0),
            credit = row.get("Credit", 0.0),
        )

class StatementDto(BaseModel):
    date: Optional[Date] = None
    debit_total: float
    credit_total: float
    net_balance: float
    number_of_transactions: int
    top_expenses: list[TransactionDto]
    top_incomes: list[TransactionDto]
    transaction_list_filtered: list[TransactionDto]
    debit_list: list[TransactionDto]
    credit_list: list[TransactionDto]
