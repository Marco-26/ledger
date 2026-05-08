from fastapi import FastAPI, Request
from exceptions.domain import StatementNotFoundException
from fastapi.responses import JSONResponse

async def statement_not_found_handler(request: Request, exc: StatementNotFoundException):
  return JSONResponse(status_code=404, content={"detail": "Content not found"})

def register_exception_handler(app: FastAPI):
  app.add_exception_handler(StatementNotFoundException, statement_not_found_handler)