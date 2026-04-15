import pandas as pd
from db.models.statement import Transaction

class TransactionMapper:
  @staticmethod
  def from_df(df: pd.DataFrame) -> list[Transaction]:
    return [Transaction(transaction_date=row["Date"], transaction_description=row["Description"], transaction_debit=row["Debit"], transaction_credit=row["Credit"], transaction_balance=row["Balance"]) for row in df.to_dict(orient="records")]
