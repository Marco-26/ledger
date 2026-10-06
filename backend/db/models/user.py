from db.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from db.models.statement import Statement


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    statements: Mapped[list["Statement"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
