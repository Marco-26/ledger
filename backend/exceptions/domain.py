from datetime import date


class StatementNotFoundException(Exception):
    pass


class StatementParsingException(Exception):
    pass


class StatementWrongDateSelectedException(Exception):

    def __init__(self, user_selected_date: date, statement_date: date):
        self.user_selected_date = user_selected_date
        self.statement_date = statement_date

class UserNotFoundException(Exception):
  pass