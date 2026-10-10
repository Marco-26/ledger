import uuid

from sqlalchemy import select
from sqlalchemy.orm import Session

from db.models.user import User


class UserRepository:
  def __init__(self, db: Session):
    self.db = db

  def get_user_by_supabase_id(self, supabase_id: uuid.UUID) -> User | None:
    stmt = select(User).where(User.supabase_id == supabase_id)
    user = self.db.scalars(stmt).one_or_none()
    return user

  def create_user(self, supabase_id: uuid.UUID) -> User:
    try:
      user = User(supabase_id=supabase_id)
      self.db.add(user)
      self.db.commit()
      self.db.refresh(user)
    except Exception:
      self.db.rollback()
      raise
      
    return user
