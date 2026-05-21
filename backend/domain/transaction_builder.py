from db.models.statement import Transaction
from schemas.statement_dto import StatementDTO
from mappers.transaction_mapper import TransactionMapper
from datetime import date
from utils import revenue_utils
from domain.models import DailyTransaction


class TransactionBuilder:
    @staticmethod
    def _map_transactions(transactions, predicate):
        return [
            TransactionMapper.from_statement_orm(t)
            for t in transactions
            if predicate(t)
        ]

    @staticmethod
    def _calculate_totals(transactions: list[Transaction]) -> tuple:
        credit_total = sum(t.transaction_credit or 0.0 for t in transactions)
        debit_total = sum(t.transaction_debit or 0.0 for t in transactions)
        net_balance = credit_total - debit_total

        return (credit_total, debit_total, net_balance)

    @staticmethod
    def build_statement(
        transactions: list[Transaction],
        top_credit_transactions: list[Transaction],
        top_debit_transactions: list[Transaction],
        daily_transactions: list[DailyTransaction],
        date: date,
        previous_month_transactions: list[Transaction],
    ) -> StatementDTO:
        credit_total, debit_total, net_balance = TransactionBuilder._calculate_totals(
            transactions
        )

        (
            credit_total_previous_month,
            debit_total_previous_month,
            net_balance_total_previous_month,
        ) = TransactionBuilder._calculate_totals(previous_month_transactions)

        credit_growth_rate = revenue_utils.calculate_revenue_growth_rate(
            credit_total, credit_total_previous_month
        )
        debit_growth_rate = revenue_utils.calculate_revenue_growth_rate(
            debit_total, debit_total_previous_month
        )
        net_balance_growth_rate = revenue_utils.calculate_revenue_growth_rate(
            net_balance, net_balance_total_previous_month
        )

        credit_list = TransactionBuilder._map_transactions(
            transactions=transactions,
            predicate=lambda t: (t.transaction_credit or 0) > 0,
        )
        debit_list = TransactionBuilder._map_transactions(
            transactions=transactions,
            predicate=lambda t: (t.transaction_debit or 0) > 0,
        )
        top_expenses = TransactionBuilder._map_transactions(
            transactions=top_debit_transactions,
            predicate=lambda t: (t.transaction_debit or 0) > 0,
        )
        top_incomes = TransactionBuilder._map_transactions(
            transactions=top_credit_transactions,
            predicate=lambda t: (t.transaction_credit or 0) > 0,
        )

        daily_transactions = [
            TransactionMapper.data_to_daily_transactions(transaction)
            for transaction in daily_transactions
        ]

        return StatementDTO(
            date=date,
            debit_total=debit_total,
            credit_total=credit_total,
            net_balance=net_balance,
            number_of_transactions=len(transactions),
            top_expenses=top_expenses,
            top_incomes=top_incomes,
            daily_transactions=daily_transactions,
            credit_list=credit_list,
            debit_list=debit_list,
            credit_total_growth_rate=credit_growth_rate,
            debit_total_growth_rate=debit_growth_rate,
            net_balance_total_growth_rate=net_balance_growth_rate,
        )
