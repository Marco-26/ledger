from contextlib import asynccontextmanager

from db.database import engine
from exceptions.handlers import register_exception_handler
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from logging_config import setup_logging
from sqlalchemy import text
from statements.controller import router as statement_router

setup_logging()


@asynccontextmanager
async def lifespan(app: FastAPI):
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    yield
    engine.dispose()

app = FastAPI(lifespan=lifespan)

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

register_exception_handler(app)
