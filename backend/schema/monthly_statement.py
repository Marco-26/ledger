from dataclasses import dataclass

@dataclass
class Transaction():
  date: str
  credit: float
  debit: float

@dataclass
class MontlyStatement:
  debit_total: float
  credit_total: float
  net_balance: float
  number_of_transactions: int
  top_expenses: list
  top_incomes: list
  transaction_list_filtered: list[Transaction] # List of daily debit and credit totals, filtered to be used in graph 
  debit_list: list # List of daily debit totals, unfiltered
  credit_list: list # List of daily credit totals, unfiltered
  
  def __init__(self, debit_total: float, credit_total: float, net_balance: float, number_of_transactions: int, top_expenses: list, top_incomes: list, transaction_list_filtered: list[Transaction], debit_list: list[float], credit_list: list[float]):
    self.debit_total = debit_total
    self.credit_total = credit_total
    self.net_balance = net_balance
    self.number_of_transactions = number_of_transactions
    self.top_expenses = top_expenses
    self.top_incomes = top_incomes
    self.transaction_list_filtered = transaction_list_filtered
    self.debit_list = debit_list
    self.credit_list = credit_list