from schema.monthly_statement import MontlyStatement
from models.statement import Statement
from sqlalchemy.orm import Session

class StatementRepository:
  def __init__(self, db: Session) -> None:
    self.db = db

  def create_statement(self, statement: MontlyStatement) -> None:
    record = Statement(**statement.model_dump())
    
    self.db.add(record)
    self.db.commit()
    self.db.refresh(record)
    return record