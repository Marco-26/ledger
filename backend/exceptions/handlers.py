import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from exceptions.domain import (
    StatementNotFoundException,
    StatementParsingException,
    StatementWrongDateSelectedException,
    UserNotFoundException,
)
from exceptions.error_codes import ErrorCodes

logger = logging.getLogger(__name__)


async def statement_not_found_handler(
    request: Request, exc: StatementNotFoundException
):
    logger.error("Statement not found", exc_info=exc)
    return JSONResponse(status_code=404, content={"detail": "Content not found"})


async def statement_parsing_error_handler(
    request: Request, exc: StatementParsingException
):
    logger.error("Failed to parse statement", exc_info=exc)
    return JSONResponse(
        status_code=500, content={"detail": "Failed to parse statement"}
    )


async def statement_wrong_date_selected_handler(
    request: Request, exc: StatementWrongDateSelectedException
):
    logger.error(
        f"Selected month: {exc.user_selected_date.strftime("%B %Y")} does not match statement month: {exc.statement_date.strftime("%B %Y")}",
        exc_info=exc,
    )
    return JSONResponse(
        status_code=400,
        content={
            "detail": f"Selected month: {exc.user_selected_date.strftime("%B %Y")} does not match statement month: {exc.statement_date.strftime("%B %Y")}",
            "code": ErrorCodes.DATE_MISMATCH,
        },
    )


async def user_not_found_handler(
    request: Request, exc: UserNotFoundException
):
    logger.error("User not found", exc_info=exc)
    return JSONResponse(status_code=404, content={"detail": "User not found"})


def register_exception_handler(app: FastAPI):
    app.add_exception_handler(StatementNotFoundException, statement_not_found_handler)
    app.add_exception_handler(
        StatementWrongDateSelectedException, statement_wrong_date_selected_handler
    )
    app.add_exception_handler(
        StatementParsingException, statement_parsing_error_handler
    )
    app.add_exception_handler(
        UserNotFoundException, user_not_found_handler
    )
