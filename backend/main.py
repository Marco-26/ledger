import pandas as pd
import camelot
import re
from dataclasses import dataclass

@dataclass
class MontlyStatement:
  debit: float
  credit: float
  net_balance: float
  number_of_transactions: int
  top_expenses: list
  top_incomes: list
  
  def __init__(self, debit: float, credit: float, net_balance: float, number_of_transactions: int, top_expenses: list, top_incomes: list):
    self.debit = debit
    self.credit = credit
    self.net_balance = net_balance
    self.number_of_transactions = number_of_transactions
    self.top_expenses = top_expenses
    self.top_incomes = top_incomes

def extract_table_from_pdf(filepath: str):
  date_pattern = r'\d{2}-\d{2}-\d{2}'

  tables = camelot.read_pdf(filepath, pages="all", flavor="stream", suppress_stdout=True)
  rows = []
  
  for table in tables:
    df = table.df
    
    for _, row in df.iterrows():
      if re.match(date_pattern, str(row[0]).strip()):
        rows.append(row.tolist())
  
  return rows

def generate_df(rows:list) -> pd.DataFrame:
  df = pd.DataFrame(rows)
  df = df.drop(1, axis=1)
  df.columns = ["Date", "Description", "Debit", "Credit", "Balance"]
  return df

def preprocess_data(data: pd.DataFrame) -> pd.DataFrame:
  numeric_columns = ["Debit", "Credit", "Balance"]
  df = data.copy()
  
  for col in numeric_columns:
    df[col] = df[col].str.replace(".", "")
    df[col] = df[col].str.replace(",", ".")
    df[col] = pd.to_numeric(df[col], errors="coerce")
    
  df["Credit"] = df["Credit"].fillna("-")
  df["Debit"] = df["Debit"].fillna("-")
  return df

def generate_monthly_statement(df: pd.DataFrame) -> MontlyStatement:
  top3_expenses = df[df["Debit"] != "-"].sort_values(by="Debit", ascending=False).head(3)
  top3_incomes = df[df["Credit"] != "-"].sort_values(by="Credit", ascending=False).head(3)
  transactions = len(df)
  total_debit = df["Debit"].replace("-", 0).sum()
  total_credit = df["Credit"].replace("-", 0).sum()
  net_balance = total_credit - total_debit
  
  statement = MontlyStatement(
    debit=round(total_debit, 2),
    credit=round(total_credit, 2),
    net_balance=round(net_balance, 2),
    number_of_transactions=transactions,
    top_expenses=top3_expenses,
    top_incomes=top3_incomes
  )
  
  return statement
  

if __name__ == "__main__":
  file_path = "statement.pdf" 
  rows = extract_table_from_pdf(file_path)
  df = generate_df(rows)
  
  cleaned_df = preprocess_data(df)
  generate_monthly_statement(cleaned_df)
  
  statement = generate_monthly_statement(cleaned_df)
  
  print("Statement: ", statement)