from typing_extensions import Annotated
from fastapi import APIRouter, File, Depends, Query
from statements.service import StatementService
from sqlalchemy.orm import Session
from datetime import date
from db.database import get_db
from schemas.statement_dto import StatementDTO, TransactionDTO

router = APIRouter()


def get_statement_service(db: Session = Depends(get_db)):
    return StatementService(db=db)


@router.post("/api/statement", response_model=StatementDTO)
def generate_statement(
    file: Annotated[bytes, File()],
    service: StatementService = Depends(get_statement_service),
    date: date = Query(...),
):
    return service.generate_monthly_statement(file, date)


@router.get("/api/statement", response_model=StatementDTO)
def get_statement(
    date: date = Query(...), service: StatementService = Depends(get_statement_service)
):
    return service.get_monthly_statement(date)


@router.post("/api/ai/statement")
def classify_test(service: StatementService = Depends(get_statement_service)):
    return service.categorize_transactions()
