from datetime import date
from typing import Annotated

import jwt
from fastapi import APIRouter, Depends, File, HTTPException, Query
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from db.database import get_db
from integrations.supabase import verify_token
from schemas.statement_dto import StatementDTO
from statements.service import StatementService

router = APIRouter()
security = HTTPBearer()

def get_statement_service(db: Annotated[Session, Depends(get_db)]):
    return StatementService(db=db)

def verify_user(credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)]):
	token = credentials.credentials
	try:
		payload = verify_token(token)
		return payload["sub"]
	except(jwt.InvalidTokenError, jwt.PyJWKClientError):
		raise HTTPException(status_code=401, detail="Not authenticated")

def get_current_user(user_id: Annotated[str, Depends(verify_user)]):
  #TODO: get user from db, if doesnt exist, create one
  print("USER ID: ", user_id)


@router.post("/api/statement", response_model=StatementDTO)
def generate_statement(
    file: Annotated[bytes, File()],
    service: Annotated[StatementService, Depends(get_statement_service)],
    date: Annotated[date, Query(...)],
    user: Annotated[str, Depends(get_current_user)]
):
    return service.generate_monthly_statement(file, date)


@router.get("/api/statement", response_model=StatementDTO)
def get_statement(
    date: Annotated[date, Query()], service: Annotated[StatementService, Depends(get_statement_service)], user: Annotated[str, Depends(get_current_user)]
):
    return service.get_monthly_statement(date)
