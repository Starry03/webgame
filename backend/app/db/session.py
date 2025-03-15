from typing import Generator
from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import Session

from dotenv import load_dotenv, find_dotenv
from os import getenv

load_dotenv(dotenv_path=find_dotenv())
USER = getenv("DB_USER")
PASSWORD = getenv("DB_PASSWORD")
HOST = getenv("DB_HOST")
PORT = getenv("DB_PORT")
DATABASE = getenv("DB_NAME")
SQLALCHEMY_DATABASE_URL = f"postgresql://{USER}:{PASSWORD}@{HOST}/{DATABASE}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

try:
    engine.connect()
    print(f"Database connected at {HOST}:{PORT}")
except Exception as e:
    print(f"Error: {e}")


@contextmanager
def get_db_session() -> Generator[Session]:
    db = session()
    try:
        yield db
    finally:
        db.close()
