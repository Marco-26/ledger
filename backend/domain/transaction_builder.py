from datetime import date
from db.models.statement import Transaction
from schemas.statement_dto import StatementDTO
from mappers.transaction_mapper import TransactionMapper, map_transactions
from utils import revenue_utils
from domain.models import DailyTransaction


def build_statement(
    transactions: list[Transaction],
    top_credit_transactions: list[Transaction],
    top_debit_transactions: list[Transaction],
    daily_transactions: list[DailyTransaction],
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
        credit_total=credit_total,
        debit_total=debit_total,
        net_balance=net_balance,
        number_of_transactions=len(transactions),
        credit_list=map_transactions(
            transactions, predicate=lambda t: (t.transaction_credit or 0) > 0
        ),
        debit_list=map_transactions(
            transactions, predicate=lambda t: (t.transaction_debit or 0) > 0
        ),
        top_incomes=map_transactions(
            top_credit_transactions, predicate=lambda t: (t.transaction_credit or 0) > 0
        ),
        top_expenses=map_transactions(
            top_debit_transactions, predicate=lambda t: (t.transaction_debit or 0) > 0
        ),
        daily_transactions=[
            TransactionMapper.from_daily_transaction(t) for t in daily_transactions
        ],
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
