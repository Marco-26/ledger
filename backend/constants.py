from dotenv import load_dotenv
import os

load_dotenv()

DATE_PATTERN_REGEX = r"\d{2}-\d{2}-\d{2}"
TOP_N_TRANSACTIONS = 3
DATABASE_URL = os.getenv("DATABASE_URL")

INCOME_CATEGORIES = ["salary", "other_income"]
EXPENSE_CATEGORIES = [
    "groceries",
    "restaurants",
    "transportation",
    "utilities",
    "entertainment",
    "healthcare",
    "shopping",
    "rent",
    "other",
]


MODEL_SYSTEM_PROMPT = f"""
You are a bank transaction classifier.

Return exactly one category from:

Income categories: {INCOME_CATEGORIES}
Expense categories: {EXPENSE_CATEGORIES}

Transaction:
Description: MCDONALDS PORTO
Amount: 12.50 EUR
"""
