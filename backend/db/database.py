from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from constants import DATABASE_URL

engine = create_engine(DATABASE_URL)

# factory to create db sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    # actual db session
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
