from typing import Annotated

from fastapi import Depends

from db.database import DbSession
from users.repository import UserRepository
from users.service import UserService


def get_user_repository(db: DbSession) -> UserRepository:
    return UserRepository(db)

UserRepositoryDep = Annotated[UserRepository, Depends(get_user_repository)]

def get_user_service(repo: UserRepositoryDep) -> UserService:
  return UserService(repo)

UserServiceDep = Annotated[UserService, Depends(get_user_service)]