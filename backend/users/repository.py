import uuid

from fastapi import HTTPException
from sqlalchemy.orm import Session

from db.models.user import User


class UserRepository:
  def __init__(self, db: Session):
    self.db = db

  def get_user_by_supabase_id(self, supabase_id: uuid.UUID) -> User:
    user = self.db.get(User, supabase_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

  def create_user(self, supabase_id: uuid.UUID) -> User:
    user = User(supabase_id=supabase_id)
    self.db.add(user)
    self.db.commit()
    self.db.refresh(user)
    return user
