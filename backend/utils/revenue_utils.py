from decimal import Decimal

from constants import EXPENSE_CATEGORIES
from db.models.statement import Transaction
from schemas.statement_dto import TransactionCategoryDTO, TransactionType


def calculate_totals(
    transactions: list[Transaction],
) -> tuple[Decimal, Decimal, Decimal]:
    credit_total = sum(
        t.amount or Decimal(0) for t in transactions if t.type == TransactionType.INCOME
    )
    debit_total = sum(
        t.amount or Decimal(0) for t in transactions if t.type == TransactionType.EXPENSE
    )
    return credit_total, debit_total, credit_total - debit_total


def process_category(
    transactions: list[Transaction],
) -> list[TransactionCategoryDTO]:
    categories: dict[str, Decimal] = {}

    for transaction in transactions:
        amount = transaction.amount
        categories[transaction.category] = (
            categories.get(transaction.category, Decimal(0)) + amount
        )

    sorted_categories = sorted(
        categories.items(), key=lambda item: item[1], reverse=True
    )

    return [
        TransactionCategoryDTO(
            label=label,
            amount=amount,
            percentage=calculate_category_percentage(categories, label),
            type=get_category_type(label),
        )
        for label, amount in sorted_categories
    ]


def get_category_type(category: str) -> TransactionType:
    return (
        TransactionType.EXPENSE
        if category in EXPENSE_CATEGORIES
        else TransactionType.INCOME
    )


def calculate_category_percentage(
    categories: dict[str, Decimal], category: str
) -> float:
    category_type = get_category_type(category)
    total = sum(
        amount
        for label, amount in categories.items()
        if get_category_type(label) == category_type
    )
    return round(float(categories[category] / total * 100), 2)


def calculate_revenue_growth_rate(
    current_value: Decimal, previous_value: Decimal
) -> float:
    if previous_value == 0:
        return 0

    return float((current_value - previous_value) / previous_value * 100)
