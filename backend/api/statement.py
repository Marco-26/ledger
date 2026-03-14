from typing_extensions import Annotated
from fastapi import APIRouter, File, Depends
from services.statement_service import StatementService

router = APIRouter()

def get_statement_service():
  return StatementService()

@router.post("/api/statement")
def generate_statement(file: Annotated[bytes, File()], service: StatementService = Depends(get_statement_service)):
  return service.generate_monthly_statement(file)