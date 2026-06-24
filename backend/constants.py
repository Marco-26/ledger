from dotenv import load_dotenv
import os

load_dotenv()

DATE_PATTERN_REGEX = r"\d{2}-\d{2}-\d{2}"
TOP_N_TRANSACTIONS = 3
DATABASE_URL = os.getenv("DATABASE_URL")

MODEL_SYSTEM_PROMPT = """
You are a bank transaction classifier.

Return exactly one category from:

[
  "Groceries",
  "Restaurants",
  "Transportation",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Salary",
  "Rent",
  "Other"
]

Transaction:
Description: MCDONALDS PORTO
Amount: 12.50 EUR
"""
