from dtos.statement_dto import TransactionDto
import pandas as pd

def df_to_transactions(df: pd.DataFrame) -> list[TransactionDto]:
  """Convert DataFrame rows to Transaction objects. Use debit/credit to override with fixed values."""
  return [TransactionDto.from_row(row) for row in df.to_dict(orient="records")]


def df_to_daily_transactions(df: pd.DataFrame) -> list[TransactionDto]:
  """Convert DataFrame rows to Transaction objects. Joins the transactions by date. If we have two transactions in one day, it shows just as one."""
  daily = df.groupby("Date", as_index=False)[["Debit", "Credit"]].sum()
  return [TransactionDto.from_row(row) for row in daily.to_dict(orient="records")]
