import uuid

from db.models.user import User
from users.repository import UserRepository


class UserService:
  def __init__(self, user_repository: UserRepository):
    self.repo = user_repository

  def get_user_by_supabase_id(self, supabase_id: uuid.UUID) -> User:
    return self.repo.get_user_by_supabase_id(supabase_id)

  def create_user(self, supabase_id: uuid.UUID) -> None:
    self.repo.create_user(supabase_id)