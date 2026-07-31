from db.models.statement import Transaction
from schemas.statement_dto import TransactionType


def calculate_totals(transactions: list[Transaction]) -> tuple[float, float, float]:
    credit_total = sum(
        t.amount or 0.0 for t in transactions if t.type == TransactionType.CREDIT.value
    )
    debit_total = sum(
        t.amount or 0.0 for t in transactions if t.type == TransactionType.DEBIT.value
    )
    return credit_total, debit_total, credit_total - debit_total


def process_category(
    transactions: list[Transaction],
) -> list[tuple[str, float]]:
    categories: dict[str, float] = {}

    for transaction in transactions:
        amount = transaction.amount
        categories[transaction.category] = (
            categories.get(transaction.category, 0.0) + amount
        )

    return sorted(categories.items(), key=lambda item: item[1], reverse=True)


def calculate_revenue_growth_rate(current_value: float, previous_value: float) -> float:
    if previous_value == 0:
        return 0

    return ((current_value - previous_value) / previous_value) * 100
