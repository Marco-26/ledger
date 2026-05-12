from repository.statement_repository import StatementRepository
from dtos.statement_dto import StatementDTO
from sqlalchemy.orm import Session
from utils.statement_dataframe import (
    build_statement_dataframe,
    normalize_statement_dataframe,
)
from utils.statement_pdf import extract_table_from_pdf
from datetime import date
from mappers.transaction_mapper import TransactionMapper
from exceptions.domain import StatementNotFoundException
from utils import utils
from dtos.statement_dto import TransactionDTO

class StatementService:
    def __init__(self, db: Session):
        self.db = db
        self.repository = StatementRepository(db)

    def generate_monthly_statement(self, file: bytes, date: date) -> StatementDTO:
        table = extract_table_from_pdf(file)
        df = normalize_statement_dataframe(build_statement_dataframe(table))
        
        transactions = TransactionMapper.from_df(df)
        
        record = self.repository.get_statement_via_date(date)
        if record:
            self.repository.delete_statement(record)
        
        self.repository.create_statement(transactions, date)
        
        return self.get_monthly_statement(date)
    
    def get_monthly_statement(self, date: date) -> StatementDTO:
        end_date = utils.get_end_of_month(date)

        transactions = self.repository.get_transactions(date, end_date)
        top_transactions = self.repository.get_top_transactions(date, end_date)

        credit_total = sum(t.transaction_credit or 0.0 for t in transactions)
        debit_total = sum(t.transaction_debit or 0.0 for t in transactions)

        credit_list = [
            TransactionMapper.from_statement_orm(
                t.transaction_date,
                t.transaction_credit or 0.0,
                t.transaction_description,
                t.transaction_debit or 0.0
            )
            for t in transactions
            if (t.transaction_credit or 0.0) > 0
        ]

        debit_list = [
            TransactionMapper.from_statement_orm(
                t.transaction_date,
                t.transaction_credit or 0.0,
                t.transaction_description,
                t.transaction_debit or 0.0
            )
            for t in transactions
            if (t.transaction_debit or 0.0) > 0
        ]

        top_expenses = [
            TransactionMapper.from_statement_orm(
                t.transaction_date,
                t.transaction_credit or 0.0,
                t.transaction_description,
                t.transaction_debit or 0.0
            )
            for t in top_transactions
            if (t.transaction_debit or 0.0) > 0
        ]

        top_incomes = [
            TransactionMapper.from_statement_orm(
                t.transaction_date,
                t.transaction_credit or 0.0,
                t.transaction_description,
                t.transaction_debit or 0.0
            )
            for t in top_transactions
            if (t.transaction_credit or 0.0) > 0
        ]

        # daily aggregation
        daily_map = {}

        for t in transactions:
            day = t.transaction_date

            if day not in daily_map:
                daily_map[day] = {
                    "date": day,
                    "credit": 0.0,
                    "debit": 0.0,
                    "description": None
                }

            daily_map[day]["credit"] += t.transaction_credit or 0.0
            daily_map[day]["debit"] += t.transaction_debit or 0.0

        transaction_list_filtered = [
            TransactionMapper.from_statement_orm(
                v["date"],
                v["credit"],
                v["description"],
                v["debit"]
            )
            for v in daily_map.values()
        ]

        return StatementDTO(
            date=date,
            debit_total=debit_total,
            credit_total=credit_total,
            net_balance=credit_total - debit_total,
            number_of_transactions=len(transactions),
            top_expenses=top_expenses,
            top_incomes=top_incomes,
            transaction_list_filtered=transaction_list_filtered,
            credit_list=credit_list,
            debit_list=debit_list
        )
        