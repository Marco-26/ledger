from datetime import date

from constants import TOP_N_TRANSACTIONS
from db.models.statement import Transaction
from schemas.statement import (
    StatementDTO,
    TransactionDTO,
    TransactionType,
)
from utils import revenue_utils


def build_statement(
    transactions: list[Transaction],
    statement_date: date,
    previous_month_transactions: list[Transaction],
) -> StatementDTO:
    credit_total, debit_total, net_balance = revenue_utils.calculate_totals(
        transactions
    )
    credit_prev, debit_prev, net_prev = revenue_utils.calculate_totals(
        previous_month_transactions
    )

    return StatementDTO(
        date=statement_date,
        credit_total=float(credit_total),
        debit_total=float(debit_total),
        net_balance=float(net_balance),
        credit_list=[
            TransactionDTO.model_validate(t)
            for t in transactions
            if (t.type == TransactionType.INCOME)
        ],
        debit_list=[
            TransactionDTO.model_validate(t)
            for t in transactions
            if (t.type == TransactionType.EXPENSE)
        ],
        top_incomes=[TransactionDTO.model_validate(t) for t in _get_top_transactions(transactions, TransactionType.INCOME)],
        top_expenses=[TransactionDTO.model_validate(t) for t in _get_top_transactions(transactions, TransactionType.EXPENSE)],
        all_transactions=[TransactionDTO.model_validate(t) for t in transactions],
        transaction_categories=revenue_utils.process_category(transactions),
        credit_total_growth_rate=revenue_utils.calculate_revenue_growth_rate(
            credit_total, credit_prev
        ),
        debit_total_growth_rate=revenue_utils.calculate_revenue_growth_rate(
            debit_total, debit_prev
        ),
        net_balance_total_growth_rate=revenue_utils.calculate_revenue_growth_rate(
            net_balance, net_prev
        ),
    )


def _get_top_transactions(
    transactions: list[Transaction], transaction_type: TransactionType
) -> list[Transaction]:
    matching = [t for t in transactions if t.type == transaction_type]
    return sorted(matching, key=lambda t: t.amount, reverse=True)[:TOP_N_TRANSACTIONS]
