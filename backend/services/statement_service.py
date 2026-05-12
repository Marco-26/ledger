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
    
    def get_monthly_statement(self, date:date) -> StatementDTO:
        statement = self.repository.get_statement_via_date(date)
        
        if not statement or not statement.transactions:
            raise StatementNotFoundException
        
        end_date = utils.get_end_of_month(date)
        
        credit_transaction_list: list[TransactionDTO] = [TransactionMapper.from_statement_orm(transaction.transaction_date, transaction.transaction_credit or 0.0,transaction.transaction_description, transaction.transaction_debit or 0.0) for transaction in self.repository.get_credit_transaction_list(date, end_date)]
        debit_transaction_list: list[TransactionDTO] = [TransactionMapper.from_statement_orm(transaction.transaction_date, transaction.transaction_credit or 0.0,transaction.transaction_description, transaction.transaction_debit or 0.0) for transaction in self.repository.get_debit_transaction_list(date, end_date)]
        top_credit_transaction_list: list[TransactionDTO] = [TransactionMapper.from_statement_orm(transaction.transaction_date, transaction.transaction_credit or 0.0,transaction.transaction_description, transaction.transaction_debit or 0.0) for transaction in self.repository.get_top_credit_transactions(date, end_date)]
        top_debit_transaction_list: list[TransactionDTO] = [TransactionMapper.from_statement_orm(transaction.transaction_date, transaction.transaction_credit or 0.0,transaction.transaction_description, transaction.transaction_debit or 0.0) for transaction in self.repository.get_top_debit_transactions(date, end_date)]
        total_credit_value =  self.repository.get_total_credit_value(date, end_date)
        total_debit_value =  self.repository.get_total_debit_value(date,end_date)
        daily_transaction_list: list[TransactionDTO] = [TransactionMapper.from_statement_orm(transaction.transaction_date, transaction.transaction_credit or 0.0,transaction.transaction_description, transaction.transaction_debit or 0.0) for transaction in self.repository.get_daily_transactions(date, end_date)]
        
        return StatementDTO(
            date=date,
            debit_total=total_debit_value,
            credit_total=total_credit_value,
            net_balance=total_credit_value - total_debit_value,
            number_of_transactions=10,
            top_expenses=top_debit_transaction_list,
            top_incomes=top_credit_transaction_list,
            transaction_list_filtered=daily_transaction_list,
            credit_list=credit_transaction_list,
            debit_list=debit_transaction_list
        )
        