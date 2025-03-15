from sqlalchemy.sql import text
import hashlib
from app.db.session import get_db_session

class AuthManager:
    @staticmethod
    def get_user_from_password(username: str, password: str):
        password = AuthManager.__get_hashed(password)
        with get_db_session() as db:
            result = db.execute(
                text(
                    "SELECT * FROM public.user WHERE username = :username AND password = :password"
                ),
                params={"username": username, "password": password},
            )
            return result.fetchone()

    @staticmethod
    def __get_hashed(data: str) -> str:
        return hashlib.sha256(data.encode("utf-8")).hexdigest()
