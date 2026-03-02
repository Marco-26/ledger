import pandas as pd
import camelot
import re

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
  columns = ["Date","Date", "Description", "Debit","Credit", "Balance"]
  df = pd.DataFrame(rows, columns=columns)
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

if __name__ == "__main__":
  file_path = "statement.pdf" 
  rows = extract_table_from_pdf(file_path)
  df = generate_df(rows)
  
  cleaned_df = preprocess_data(df)
  cleaned_df.to_csv("cleaned_data.csv", index=False)