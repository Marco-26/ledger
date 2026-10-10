from datetime import date

from sqlalchemy.orm import Session

from domain.transaction_builder import build_statement
from exceptions.domain import (
    StatementNotFoundException,
    StatementParsingException,
    StatementWrongDateSelectedException,
)
from integrations.openai_api import classify_transactions
from schemas.statement import StatementDTO, TransactionDTO
from statements.adapter import dataframe_to_transactions
from statements.repository import StatementRepository
from utils import date_utils
from utils.file_utils import extract_table_from_pdf_file
from utils.statement_dataframe_utils import (
    build_statement_dataframe,
    normalize_statement_dataframe,
)


class StatementService:
    def __init__(self, db: Session) -> None:
        self.db = db
        self.repository = StatementRepository(db)

    def generate_monthly_statement(
        self, file: bytes, user_selected_date: date, user_id: int
    ) -> StatementDTO:
        table = extract_table_from_pdf_file(file)
        df = normalize_statement_dataframe(build_statement_dataframe(table))
        transactions = dataframe_to_transactions(df)

        if not transactions:
            raise StatementParsingException()

        statement_date = transactions[0].date

        # if the user wants to upload a statement from february into january, for example.
        if (statement_date.year, statement_date.month) != (
            user_selected_date.year,
            user_selected_date.month,
        ):
            raise StatementWrongDateSelectedException(
                user_selected_date=user_selected_date, statement_date=statement_date
            )

        categorized_transactions = self._classify_transactions(transactions)

        record = self.repository.get_statement(user_selected_date, user_id)
        if record:
            self.repository.delete_statement(record)

        self.repository.create_statement(categorized_transactions, user_selected_date, user_id)

        return self.get_monthly_statement(user_selected_date, user_id)

    def get_monthly_statement(self, date: date, user_id: int) -> StatementDTO:
        statement = self.repository.get_statement(date, user_id)

        if not statement:
            raise StatementNotFoundException()

        previous_month = date_utils.get_previous_month_based_on_date(date)
        previous_month_statement = self.repository.get_statement(previous_month, user_id)

        return build_statement(
            transactions=list(statement.transactions),
            statement_date=date,
            previous_month_transactions=(
              list(previous_month_statement.transactions) if previous_month_statement else []
            )
        )

    def _classify_transactions(self, transactions: list[TransactionDTO]) -> list[TransactionDTO]:
        ai_candidates: list[TransactionDTO] = []
        cached_classified: list[TransactionDTO] = []

        for transaction in transactions:
            category = self.repository.get_category_based_on_description(
                transaction.description
            ) if transaction.description else None

            if category:
                transaction = transaction.model_copy(update={"category": category})
                cached_classified.append(transaction)
            else:
                ai_candidates.append(transaction)

        ai_classified = classify_transactions(ai_candidates)

        return ai_classified + cached_classified
