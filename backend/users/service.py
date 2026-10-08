from users.repository import UserRepository


class UserService:
  def __init__(self, user_repository: UserRepository):
    self.repo = user_repository

  def get_user_by_supabase_id(self, id: str):
    pass