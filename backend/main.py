import pandas as pd
import camelot
import re
from dataclasses import dataclass
from constants import DATE_PATTERN_REGEX, TOP_N_TRANSACTIONS, DECIMAL_CASE_ROUND
from fastapi import FastAPI, File
from typing import Annotated
from io import BytesIO

@dataclass
class MontlyStatement:
  debit_total: float
  credit_total: float
  net_balance: float
  number_of_transactions: int
  top_expenses: list
  top_incomes: list
  debit_list_filtered: list[float] # List of daily debit totals, filtered to be used in graph
  credit_list_filtered: list[float] # List of daily credit totals, filtered to be used in graph
  debit_list: list[float] # List of daily debit totals, unfiltered
  credit_list: list[float] # List of daily credit totals, unfiltered
  
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

def extract_table_from_pdf(file: bytes):
  tables = camelot.read_pdf(file, pages="all", flavor="stream", suppress_stdout=True)
  rows = []
  
  for table in tables:
    df = table.df
    
    for _, row in df.iterrows():
      if re.match(DATE_PATTERN_REGEX, str(row[0]).strip()):
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
  top_expenses = (
    df[df["Debit"] != "-"]
    [["Date", "Description", "Debit"]]
    .sort_values(by="Debit", ascending=False)
    .head(TOP_N_TRANSACTIONS)
  )
  
  top_incomes = (
    df[df["Credit"] != "-"]
    [["Date", "Description", "Credit"]]
    .sort_values(by="Credit", ascending=False)
    .head(TOP_N_TRANSACTIONS)
  )
  
  transactions = len(df)
  total_debit = df["Debit"].replace("-", 0).sum()
  total_credit = df["Credit"].replace("-", 0).sum()
  net_balance = total_credit - total_debit
  
  df["Debit"] = df["Debit"].replace("-", 0).tolist()
  df["Credit"] = df["Credit"].replace("-", 0).tolist()
  
  statement = MontlyStatement(
    debit_total=round(total_debit, DECIMAL_CASE_ROUND),
    credit_total=round(total_credit, DECIMAL_CASE_ROUND),
    net_balance=round(net_balance, DECIMAL_CASE_ROUND),
    number_of_transactions=transactions,
    top_expenses=top_expenses,
    top_incomes=top_incomes,
    debit_list_filtered=df.groupby("Date")["Debit"].sum(),
    credit_list_filtered=df.groupby("Date")["Credit"].sum(),
    debit_list=df[df["Debit"] > 0][["Date", "Description","Debit"]],
    credit_list=df[df["Credit"] > 0][["Date", "Description","Credit"]]
  )
  
  return statement
  
app = FastAPI()

@app.get("/statement")
def generate_statement(file: Annotated[bytes, File()]):
  rows = extract_table_from_pdf(BytesIO(file))
  df = generate_df(rows)
  
  cleaned_df = preprocess_data(df)
  statement = generate_monthly_statement(cleaned_df)
  
  return statement