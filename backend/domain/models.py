from dataclasses import dataclass
from datetime import date as Date

@dataclass
class DailyTransaction:
    date: Date
    credit: float
    debit: float
