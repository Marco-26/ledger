from datetime import date

def get_previous_month(date: date):
  if date.month == 1:
      last_month_date = date.replace(
          year=date.year - 1,
          month=12
      )
  else:
      last_month_date = date.replace(
          month=date.month - 1
      )
      
  return last_month_date

def calculate_growth(current: float, previous: float) -> float | None:
    if previous is None or previous == 0:
        return None

    return ((current - previous) / previous) * 100