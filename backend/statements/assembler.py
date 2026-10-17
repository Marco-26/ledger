from datetime import date

from constants import TOP_N_TRANSACTIONS
from db.models.statement import Statement, Transaction
from schemas.statement import (
    MonthlySummaryRead,
    StatementDTO,
    TransactionDTO,
    TransactionType,
    YearlyStatementRead,
)
from utils import revenue_utils


def build_monthly_statement(
    statement_id: int,
    transactions: list[Transaction],
    statement_date: date,
    previous_month_transactions: list[Transaction],
) -> StatementDTO:
    income_total, expense_total, net_balance = revenue_utils.calculate_totals(
        transactions
    )

    income_prev, expense_prev, net_prev = revenue_utils.calculate_totals(
        previous_month_transactions
    )
    
    return StatementDTO(
        id=statement_id,
        date=statement_date,
        income_total=float(income_total),
        expense_total=float(expense_total),
        net_balance=float(net_balance),
        income_list=[
            TransactionDTO.model_validate(t)
            for t in transactions
            if (t.type == TransactionType.INCOME)
        ],
        expense_list=[
            TransactionDTO.model_validate(t)
            for t in transactions
            if (t.type == TransactionType.EXPENSE)
        ],
        top_incomes=[
            TransactionDTO.model_validate(t)
            for t in _get_top_transactions(transactions, TransactionType.INCOME)
        ],
        top_expenses=[
            TransactionDTO.model_validate(t)
            for t in _get_top_transactions(transactions, TransactionType.EXPENSE)
        ],
        all_transactions=[TransactionDTO.model_validate(t) for t in transactions],
        transaction_categories=revenue_utils.process_category(transactions),
        income_total_growth_rate=revenue_utils.calculate_revenue_growth_rate(
            income_total, income_prev
        ),
        expense_total_growth_rate=revenue_utils.calculate_revenue_growth_rate(
            expense_total, expense_prev
        ),
        net_balance_total_growth_rate=revenue_utils.calculate_revenue_growth_rate(
            net_balance, net_prev
        ),
    )


def build_yearly_statement(
    statements: list[Statement],
    statement_year: int,
) -> YearlyStatementRead:

    all_year_transactions =  [transaction for statement in statements for transaction in statement.transactions]
  
    income_total, expense_total, net_balance = revenue_utils.calculate_totals(all_year_transactions)

    return YearlyStatementRead(
        year=statement_year,
        income_total=float(income_total),
        expense_total=float(expense_total),
        net_balance=float(net_balance),
        top_incomes=[
            TransactionDTO.model_validate(t)
            for t in _get_top_transactions(all_year_transactions, TransactionType.INCOME)
        ],
        top_expenses=[
            TransactionDTO.model_validate(t)
            for t in _get_top_transactions(all_year_transactions, TransactionType.EXPENSE)
        ],
        all_transactions=[TransactionDTO.model_validate(t) for t in all_year_transactions],
        transaction_categories=revenue_utils.process_category(all_year_transactions),
        month_summaries=[build_monthly_summary(statement) for statement in statements]
    )

def build_monthly_summary(statement: Statement) -> MonthlySummaryRead:
  income_total, expense_total, net_balance = revenue_utils.calculate_totals(
      statement.transactions
  )
  return MonthlySummaryRead(month=statement.date_uploaded.strftime("%B"), expenses=float(expense_total), income=float(income_total), net_balance=float(net_balance))

def _get_top_transactions(
    transactions: list[Transaction], transaction_type: TransactionType
) -> list[Transaction]:
    matching = [transaction for transaction in transactions if transaction.type == transaction_type]
    return sorted(matching, key=lambda t: t.amount, reverse=True)[:TOP_N_TRANSACTIONS]
