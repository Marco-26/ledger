from datetime import date
from db.models.statement import Transaction
from schemas.statement_dto import (
    TransactionCategoryDTO,
    StatementDTO,
    TransactionDTO,
    TransactionType,
)
from utils import revenue_utils


def build_statement(
    transactions: list[Transaction],
    top_credit_transactions: list[Transaction],
    top_debit_transactions: list[Transaction],
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
        credit_list=[
            TransactionDTO.model_validate(t)
            for t in transactions
            if (t.type == TransactionType.CREDIT.value)
        ],
        debit_list=[
            TransactionDTO.model_validate(t)
            for t in transactions
            if (t.type == TransactionType.DEBIT.value)
        ],
        top_incomes=[TransactionDTO.model_validate(t) for t in top_credit_transactions],
        top_expenses=[TransactionDTO.model_validate(t) for t in top_debit_transactions],
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
