from db.models.statement import Transaction
from schemas.statement_dto import TransactionType, TransactionCategoryDTO
from constants import EXPENSE_CATEGORIES, INCOME_CATEGORIES


def calculate_totals(transactions: list[Transaction]) -> tuple[float, float, float]:
    credit_total = sum(
        t.amount or 0.0 for t in transactions if t.type == TransactionType.INCOME.value
    )
    debit_total = sum(
        t.amount or 0.0 for t in transactions if t.type == TransactionType.EXPENSE.value
    )
    return credit_total, debit_total, credit_total - debit_total


def process_category(
    transactions: list[Transaction],
) -> list[TransactionCategoryDTO]:
    categories: dict[str, float] = {}

    for transaction in transactions:
        amount = transaction.amount
        categories[transaction.category] = (
            categories.get(transaction.category, 0.0) + amount
        )

    sorted_categories = sorted(
        categories.items(), key=lambda item: item[1], reverse=True
    )

    return [
        TransactionCategoryDTO(
            label=label,
            amount=amount,
            percentage=calculate_category_percentage(categories, label),
            type=(
                TransactionType.EXPENSE
                if label in EXPENSE_CATEGORIES
                else TransactionType.INCOME
            ),
        )
        for label, amount in sorted_categories
    ]


def calculate_category_percentage(categories: dict[str, float], category: str):
    total = sum(categories.values())
    return round((categories.get(category) / total) * 100, 2)


def calculate_revenue_growth_rate(current_value: float, previous_value: float) -> float:
    if previous_value == 0:
        return 0

    return ((current_value - previous_value) / previous_value) * 100
