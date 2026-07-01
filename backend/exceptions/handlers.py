from fastapi import FastAPI, Request
from exceptions.domain import (
    StatementNotFoundException,
    StatementWrongDateSelected,
    StatementParsingException,
)
from fastapi.responses import JSONResponse


async def statement_not_found_handler(
    request: Request, exc: StatementNotFoundException
):
    return JSONResponse(status_code=404, content={"detail": "Content not found"})


async def statement_parsing_error_handler(
    request: Request, exc: StatementParsingException
):
    return JSONResponse(
        status_code=500, content={"detail": "Failed to parse statement"}
    )


async def statement_wrong_date_selected_handler(
    request: Request, exc: StatementWrongDateSelected
):
    return JSONResponse(
        status_code=400,
        content={
            "detail": f"Selected month: {exc.user_selected_date.strftime("%B %Y")} does not match statement month: {exc.statement_date.strftime("%B %Y")}"
        },
    )


def register_exception_handler(app: FastAPI):
    app.add_exception_handler(StatementNotFoundException, statement_not_found_handler)
    app.add_exception_handler(
        StatementWrongDateSelected, statement_wrong_date_selected_handler
    )
    app.add_exception_handler(
        StatementParsingException, statement_parsing_error_handler
    )
