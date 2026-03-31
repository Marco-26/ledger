from typing_extensions import Annotated
from fastapi import APIRouter, File, Depends, Query
from services.statement_service import StatementService
from db.database import SessionLocal
from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import date

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_statement_service(db: Session = Depends(get_db)):
    return StatementService(db=db)

@router.post("/api/statement")
def generate_statement(
    file: Annotated[bytes, File()],
    service: StatementService = Depends(get_statement_service),
    date: date = Query(...)
):
    return service.generate_monthly_statement(file,date)

@router.get("/api/statement")
def get_statement(date: date = Query(...), service: StatementService = Depends(get_statement_service)):
    statement =  service.get_statement_via_date(date)
    
    if not statement:
        raise HTTPException(status_code=400, detail="Statement not found")
    
    return statement
