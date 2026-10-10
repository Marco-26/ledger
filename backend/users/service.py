import uuid

from sqlalchemy.exc import IntegrityError

from db.models.user import User
from exceptions.domain import UserNotFoundException
from users.repository import UserRepository


class UserService:
  def __init__(self, user_repository: UserRepository) -> None:
    self.repo = user_repository

  def get_user_by_supabase_id(self, supabase_id: uuid.UUID) -> User:
    user = self.repo.get_user_by_supabase_id(supabase_id)
    if not user:
      raise UserNotFoundException()
    return user

  def get_or_create_user(self, supabase_id: uuid.UUID) -> User:
    user = self.repo.get_user_by_supabase_id(supabase_id)
    if user:
      return user
      
    try:
      return self.repo.create_user(supabase_id)
    except IntegrityError:
      # A concurrent request created the user between the lookup and the insert.
      return self.get_user_by_supabase_id(supabase_id)