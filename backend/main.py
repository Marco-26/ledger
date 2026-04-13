from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.statement_controller import router as statement_router

app = FastAPI()

origins = [
  "http://localhost:5173",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(statement_router)