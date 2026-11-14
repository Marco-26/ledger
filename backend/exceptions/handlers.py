import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from exceptions.domain import (
    StatementNotFoundException,
    StatementParsingException,
    UserNotFoundException,
)
from exceptions.error_codes import ErrorCodes

logger = logging.getLogger(__name__)


async def statement_not_found_handler(
    request: Request, exc: Exception
) -> JSONResponse:
    logger.error("Statement not found", exc_info=exc)
    return JSONResponse(status_code=404, content={"detail": "Content not found"})


async def statement_parsing_error_handler(
    request: Request, exc: Exception
) -> JSONResponse:
    logger.error("Failed to parse statement", exc_info=exc)
    return JSONResponse(
        status_code=500, content={"detail": "Failed to parse statement"}
    )


async def user_not_found_handler(
    request: Request, exc: Exception
) -> JSONResponse:
    logger.error("User not found", exc_info=exc)
    return JSONResponse(status_code=404, content={"detail": "User not found"})


def register_exception_handler(app: FastAPI) -> None:
    app.add_exception_handler(StatementNotFoundException, statement_not_found_handler)
    app.add_exception_handler(
        StatementParsingException, statement_parsing_error_handler
    )
    app.add_exception_handler(
        UserNotFoundException, user_not_found_handler
    )
