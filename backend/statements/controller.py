from datetime import date
from typing import Annotated

from db.database import get_db
from fastapi import APIRouter, Depends, File, Query
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from integrations.supabase import verify_token
from schemas.statement_dto import StatementDTO
from sqlalchemy.orm import Session

from statements.service import StatementService

router = APIRouter()
security = HTTPBearer()

def get_statement_service(db: Session = Depends(get_db)):
    return StatementService(db=db)

def verify_user(credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)]):
	token = credentials.credentials
	try:
		verify_token(token)
	except:
		print("Token is not valid")


@router.post("/api/statement", response_model=StatementDTO)
def generate_statement(
    file: Annotated[bytes, File()],
    service: StatementService = Depends(get_statement_service),
    date: date = Query(...),
    user = Depends(verify_user)
):
    return service.generate_monthly_statement(file, date)


@router.get("/api/statement", response_model=StatementDTO)
def get_statement(
    date: date = Query(...), service: StatementService = Depends(get_statement_service), user = Depends(verify_user)
):
    return service.get_monthly_statement(date)
