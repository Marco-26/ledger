from datetime import date
import calendar

def get_end_of_month(d: date) -> date:
    last_day = calendar.monthrange(d.year, d.month)[1]
    return date(d.year, d.month, last_day)

def get_previous_month_based_on_date(d: date) -> date:
    if d.month == 1:
        year = d.year - 1
        month = 12
    else:
        year = d.year
        month = d.month - 1

    last_day = calendar.monthrange(year, month)[1]
    day = min(d.day, last_day)

    return date(year, month, day)

def calculate_revenue_growth_rate(current_value, previous_value):
    if previous_value == 0:
        return 0

    return ((current_value - previous_value) / previous_value) * 100