"""Seed one statement per month of dummy transactions for a user.

Usage (from backend/, venv active):
    python -m scripts.seed_dummy_year --year 2025 [--user-id 1]

Months that already have a statement for the user are skipped.
"""

import argparse
import calendar
import random
import sys
from datetime import date
from decimal import Decimal
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy import select

from db.database import SessionLocal
from db.models.statement import Statement, Transaction, TransactionType
from db.models.user import User

# (description, category, min, max, times per month)
EXPENSES = [
    ("CONTINENTE MATOSINHOS", "groceries", 25, 110, 4),
    ("PINGO DOCE PORTO", "groceries", 8, 45, 3),
    ("LIDL GAIA", "groceries", 10, 60, 2),
    ("MCDONALDS PORTO", "restaurants", 7, 15, 2),
    ("RESTAURANTE O BUCHO", "restaurants", 18, 55, 2),
    ("UBER EATS", "restaurants", 12, 30, 1),
    ("GALP COMBUSTIVEL", "transportation", 40, 75, 2),
    ("METRO DO PORTO ANDANTE", "transportation", 40, 40, 1),
    ("BOLT RIDES", "transportation", 5, 18, 1),
    ("EDP COMERCIAL", "utilities", 45, 95, 1),
    ("AGUAS DO PORTO", "utilities", 18, 30, 1),
    ("MEO FIBRA", "utilities", 39.99, 39.99, 1),
    ("NETFLIX.COM", "entertainment", 13.99, 13.99, 1),
    ("SPOTIFY", "entertainment", 10.99, 10.99, 1),
    ("CINEMA NOS NORTESHOPPING", "entertainment", 7, 22, 1),
    ("FARMACIA ALIADOS", "healthcare", 6, 40, 1),
    ("ZARA NORTESHOPPING", "shopping", 20, 90, 1),
    ("AMAZON EU", "shopping", 10, 120, 1),
    ("RENDA HABITACAO", "rent", 850, 850, 1),
    ("LEVANTAMENTO MB", "other", 20, 60, 1),
]


def _amount(rng: random.Random, lo: float, hi: float) -> Decimal:
    return Decimal(str(round(rng.uniform(lo, hi), 2)))


def _build_transactions(rng: random.Random, year: int, month: int) -> list[Transaction]:
    days = calendar.monthrange(year, month)[1]
    txs = [
        Transaction(
            date=date(year, month, min(25, days)),
            description="TRF SALARIO ACME LDA",
            category="salary",
            type=TransactionType.INCOME,
            amount=Decimal("2150.00") + (Decimal("2150.00") if month in (6, 12) else 0),
        )
    ]
    if rng.random() < 0.4:
        txs.append(
            Transaction(
                date=date(year, month, rng.randint(1, days)),
                description="TRF MBWAY RECEBIDA",
                category="other_income",
                type=TransactionType.INCOME,
                amount=_amount(rng, 15, 200),
            )
        )

    for description, category, lo, hi, times in EXPENSES:
        for _ in range(times):
            day = 1 if category == "rent" else rng.randint(1, days)
            txs.append(
                Transaction(
                    date=date(year, month, day),
                    description=description,
                    category=category,
                    type=TransactionType.EXPENSE,
                    amount=_amount(rng, lo, hi),
                )
            )

    txs.sort(key=lambda t: t.date)
    return txs


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--year", type=int, required=True)
    parser.add_argument("--user-id", type=int, help="defaults to the first user")
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()

    rng = random.Random(args.seed)
    db = SessionLocal()
    try:
        user_id = args.user_id or db.scalars(select(User.id).order_by(User.id)).first()
        if user_id is None:
            raise SystemExit("No users found — sign in once to create one.")

        existing = set(
            db.scalars(
                select(Statement.date_uploaded).where(Statement.user_id == user_id)
            )
        )

        for month in range(1, 13):
            month_start = date(args.year, month, 1)
            if month_start in existing:
                print(f"{month_start}: already exists, skipped")
                continue
            statement = Statement(date_uploaded=month_start, user_id=user_id)
            statement.transactions = _build_transactions(rng, args.year, month)
            db.add(statement)
            print(f"{month_start}: {len(statement.transactions)} transactions")

        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
