import uuid

from db.models.user import User
from exceptions.domain import UserNotFoundException
from users.repository import UserRepository


class UserService:
  def __init__(self, user_repository: UserRepository):
    self.repo = user_repository

  def get_user_by_supabase_id(self, supabase_id: uuid.UUID) -> User:
    user = self.repo.get_user_by_supabase_id(supabase_id)
    if not user:
      raise UserNotFoundException()
    return user

  def create_user(self, supabase_id: uuid.UUID) -> User:
    user = self.repo.get_user_by_supabase_id(supabase_id)
    if user:
      return user
      
    return self.repo.create_user(supabase_id)