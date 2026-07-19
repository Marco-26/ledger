from db.models.statement import Transaction


def calculate_totals(transactions: list[Transaction]) -> tuple[float, float, float]:
    credit_total = sum(t.credit or 0.0 for t in transactions)
    debit_total = sum(t.debit or 0.0 for t in transactions)
    return credit_total, debit_total, credit_total - debit_total


def calculate_spending_by_category(
    transactions: list[Transaction],
) -> list[tuple[str, float]]:
    totals: dict[str, float] = {}

    for transaction in transactions:
        debit = transaction.debit or 0.0
        if debit <= 0:
            continue
        totals[transaction.category] = totals.get(transaction.category, 0.0) + debit

    return sorted(totals.items(), key=lambda item: item[1], reverse=True)


def calculate_revenue_growth_rate(current_value: float, previous_value: float) -> float:
    if previous_value == 0:
        return 0

    return ((current_value - previous_value) / previous_value) * 100
