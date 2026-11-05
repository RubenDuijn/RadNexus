from sqlalchemy import text
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import create_engine
from typing import Generator

from radnexus_intelligence.core.config import settings


def create_db_engine() -> Engine:
    return create_engine(settings.resolved_database_url(), pool_pre_ping=True)


engine = create_db_engine()
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, expire_on_commit=False)


def get_db_session() -> Generator[Session, None, None]:
    with SessionLocal() as session:
        yield session


def check_database_connection() -> None:
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
