import pandas as pd
from db.models.statement import Transaction

class TransactionMapper:
  @staticmethod
  def from_df(df: pd.DataFrame) -> list[Transaction]:
    return [Transaction(transaction_date=row["Date"], transaction_description=row["Description"], transaction_debit=row["Debit"], transaction_credit=row["Credit"], transaction_balance=row["Balance"]) for row in df.to_dict(orient="records")]
  
  @staticmethod
  def from_orm_to_df(transactions: list[Transaction]) -> pd.DataFrame:
    return pd.DataFrame([{
      "Date": t.transaction_date,
      "Description": t.transaction_description,
      "Debit": t.transaction_debit,
      "Credit": t.transaction_credit,
      "Balance": t.transaction_balance,
    } for t in transactions])
