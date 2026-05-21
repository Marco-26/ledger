from statements.repository import StatementRepository
from schemas.statement_dto import StatementDTO
from sqlalchemy.orm import Session
from utils.statement_dataframe import (
    build_statement_dataframe,
    normalize_statement_dataframe,
)
from utils.statement_pdf import extract_table_from_pdf
from datetime import date
from mappers.transaction_mapper import TransactionMapper
from utils import date_utils
from domain.transaction_builder import build_statement
from exceptions.domain import StatementWrongDateSelected, StatementNotFoundException


class StatementService:
    def __init__(self, db: Session):
        self.db = db
        self.repository = StatementRepository(db)

    def generate_monthly_statement(
        self, file: bytes, user_selected_date: date
    ) -> StatementDTO:
        table = extract_table_from_pdf(file)
        df = normalize_statement_dataframe(build_statement_dataframe(table))

        transactions = TransactionMapper.from_df(df)
        statement_date = transactions[0].transaction_date

        # if the user wants to upload a statement from february into january, for example.
        if (statement_date.year, statement_date.month) != (
            user_selected_date.year,
            user_selected_date.month,
        ):
            raise StatementWrongDateSelected(
                user_selected_date=user_selected_date, statement_date=statement_date
            )

        record = self.repository.get_statement_via_date(user_selected_date)
        if record:
            self.repository.delete_statement(record)

        self.repository.create_statement(transactions, user_selected_date)

        return self.get_monthly_statement(user_selected_date)

    def get_monthly_statement(self, date: date) -> StatementDTO:
        end_date = date_utils.get_end_of_month(date)

        transactions = self.repository.get_transactions(date, end_date)

        if not transactions:
            raise StatementNotFoundException()

        previous_month = date_utils.get_previous_month_based_on_date(date)
        previous_month_end = date_utils.get_end_of_month(previous_month)

        return build_statement(
            transactions=transactions,
            top_credit_transactions=self.repository.get_top_credit_transactions(
                date, end_date
            ),
            top_debit_transactions=self.repository.get_top_debit_transactions(
                date, end_date
            ),
            daily_transactions=self.repository.get_daily_transactions(date, end_date),
            statement_date=date,
            previous_month_transactions=self.repository.get_transactions(
                previous_month, previous_month_end
            ),
        )
