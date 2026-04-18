import pandas as pd
from db.models.statement import Transaction
from utils.statement_dataframe import DFColumns

class TransactionMapper:
  @staticmethod
  def from_df(df: pd.DataFrame) -> list[Transaction]:
    return [Transaction(transaction_date=row[DFColumns.DATE.value], transaction_description=row[DFColumns.DESCRIPTION.value], transaction_debit=row[DFColumns.DEBIT.value], transaction_credit=row[DFColumns.CREDIT.value], transaction_balance=row[DFColumns.BALANCE.value]) for row in df.to_dict(orient="records")]
  
  @staticmethod
  def from_orm_to_df(transactions: list[Transaction]) -> pd.DataFrame:
    return pd.DataFrame([{
      DFColumns.DATE.value: t.transaction_date,
      DFColumns.DESCRIPTION.value: t.transaction_description,
      DFColumns.DEBIT.value: t.transaction_debit,
      DFColumns.CREDIT.value: t.transaction_credit,
      DFColumns.BALANCE.value: t.transaction_balance,
    } for t in transactions])
