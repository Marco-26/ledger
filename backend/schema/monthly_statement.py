from pydantic import BaseModel
from typing import Dict, Any


class Transaction(BaseModel):
    date: str
    credit: float
    description: str | None
    debit: float

    @classmethod
    def from_row(cls, row: Dict[str, Any]):
        return cls(
            date=row["Date"],
            description=row.get("Description"),
            debit=row.get("Debit", 0.0),
            credit=row.get("Credit", 0.0),
        )


class MonthlyStatement(BaseModel):
    debit_total: float
    credit_total: float
    net_balance: float
    number_of_transactions: int
    top_expenses: list[Transaction]
    top_incomes: list[Transaction]
    transaction_list_filtered: list[
        Transaction
    ]  # List of daily debit and credit totals, filtered to be used in graph
    debit_list: list[Transaction]  # List of daily debit totals, unfiltered
    credit_list: list[Transaction]  # List of daily credit totals, unfiltered

    @classmethod
    def from_processed_df(cls, data: Dict[str, Any]):
        return cls(
            debit_total=data["total_debit"],
            credit_total=data["total_credit"],
            net_balance=data["net_balance"],
            number_of_transactions=data["transactions"],
            top_expenses=data["top_expenses"],
            top_incomes=data["top_incomes"],
            transaction_list_filtered=data["transaction_list_filtered"],
            debit_list=data["debit_list"],
            credit_list=data["credit_list"],
        )
