from pydantic import BaseModel
import json

class Transaction(BaseModel):
  date: str
  credit: float
  debit: float

class MonthlyStatement(BaseModel):
  debit_total: float
  credit_total: float
  net_balance: float
  number_of_transactions: int
  top_expenses: list
  top_incomes: list
  transaction_list_filtered: list[Transaction] # List of daily debit and credit totals, filtered to be used in graph 
  debit_list: list # List of daily debit totals, unfiltered
  credit_list: list # List of daily credit totals, unfiltered
  
  @classmethod
  def from_processed_df(cls, data: dict) -> MonthlyStatement:
    return cls(
      debit_total=data["total_debit"],
      credit_total=data["total_credit"],
      net_balance=data["net_balance"],
      number_of_transactions=data["transactions"],
      top_expenses=data["top_expenses"],
      top_incomes=data["top_incomes"],
      transaction_list_filtered=data["transaction_list_filtered"],
      debit_list=data["debit_list"],
      credit_list=data["credit_list"]
    )