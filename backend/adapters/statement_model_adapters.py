import pandas as pd
from backend.db.models.statement import Transaction

def transaction_database_to_dataframe(transactions: list[Transaction]) -> pd.DataFrame:
  return pd.DataFrame(
    [
      {
        "Date": t.transaction_date,
        "Description": t.transaction_description,
        "Debit": t.transaction_debit or 0.0,
        "Credit": t.transaction_credit or 0.0,
        "Balance": t.transaction_balance,
      }
      for t in transactions
    ]
  )

def dataframe_to_transaction_database(row: dict) -> Transaction:
  return Transaction(
    transaction_date=row["Date"],
    transaction_description=row["Description"],
    transaction_debit=row["Debit"],
    transaction_credit=row["Credit"],
    transaction_balance=row["Balance"],
  )