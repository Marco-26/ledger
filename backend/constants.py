from dotenv import load_dotenv
import os

load_dotenv()

DATE_PATTERN_REGEX = r"\d{2}-\d{2}-\d{2}"
TOP_N_TRANSACTIONS = 3
DATABASE_URL = os.getenv("DATABASE_URL")
