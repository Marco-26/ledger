from pydantic import BaseModel
import json

class Transaction(BaseModel):
  date: str
  credit: float
  debit: float

class MontlyStatement(BaseModel):
  debit_total: float
  credit_total: float
  net_balance: float
  number_of_transactions: int
  top_expenses: list
  top_incomes: list
  transaction_list_filtered: list[Transaction] # List of daily debit and credit totals, filtered to be used in graph 
  debit_list: list # List of daily debit totals, unfiltered
  credit_list: list # List of daily credit totals, unfiltered