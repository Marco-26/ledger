from dataclasses import dataclass

@dataclass
class MontlyStatement:
  debit_total: float
  credit_total: float
  net_balance: float
  number_of_transactions: int
  top_expenses: list
  top_incomes: list
  debit_list_filtered: list # List of daily debit totals, filtered to be used in graph
  credit_list_filtered: list # List of daily credit totals, filtered to be used in graph
  debit_list: list # List of daily debit totals, unfiltered
  credit_list: list # List of daily credit totals, unfiltered
  
  def __init__(self, debit_total: float, credit_total: float, net_balance: float, number_of_transactions: int, top_expenses: list, top_incomes: list, debit_list_filtered: list[float], credit_list_filtered  : list[float], debit_list: list[float], credit_list: list[float]):
    self.debit_total = debit_total
    self.credit_total = credit_total
    self.net_balance = net_balance
    self.number_of_transactions = number_of_transactions
    self.top_expenses = top_expenses
    self.top_incomes = top_incomes
    self.debit_list_filtered = debit_list_filtered
    self.credit_list_filtered = credit_list_filtered
    self.debit_list = debit_list
    self.credit_list = credit_list