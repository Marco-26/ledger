from typing_extensions import Annotated
from fastapi import APIRouter, File, Depends
from services.statement_service import StatementService
from db.database import SessionLocal
from sqlalchemy.orm import Session

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
):
    return service.generate_monthly_statement(file)
