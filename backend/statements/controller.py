import uuid
from datetime import date
from typing import Annotated

import jwt
from db.database import get_db
from db.models.user import User
from fastapi import APIRouter, Depends, File, HTTPException, Query
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from integrations.supabase import verify_token
from schemas.statement import StatementDTO
from sqlalchemy.orm import Session
from users.dependencies import UserServiceDep

from statements.service import StatementService

router = APIRouter()
security = HTTPBearer()


def get_statement_service(db: Annotated[Session, Depends(get_db)]) -> StatementService:
    return StatementService(db=db)


def verify_user(credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)]) -> uuid.UUID:
	token = credentials.credentials
	try:
		payload = verify_token(token)
		return uuid.UUID(payload["sub"])
	except(jwt.InvalidTokenError, jwt.PyJWKClientError, KeyError, ValueError):
		raise HTTPException(status_code=401, detail="Not authenticated")


def get_current_user(supabase_id: Annotated[uuid.UUID, Depends(verify_user)], user_service: UserServiceDep) -> User:
  return user_service.get_or_create_user(supabase_id)


@router.post("/api/statement", response_model=StatementDTO)
def generate_statement(
    file: Annotated[bytes, File()],
    service: Annotated[StatementService, Depends(get_statement_service)],
    date: Annotated[date, Query(...)],
    user: Annotated[User, Depends(get_current_user)]
) -> StatementDTO:
    return service.generate_monthly_statement(file, date, user.id)


@router.get("/api/statement", response_model=StatementDTO)
def get_statement(
    date: Annotated[date, Query()], service: Annotated[StatementService, Depends(get_statement_service)], user: Annotated[User, Depends(get_current_user)]
) -> StatementDTO:
    return service.get_monthly_statement(date, user.id)
