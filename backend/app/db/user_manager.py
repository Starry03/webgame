from sqlalchemy.sql import text

from app.auth.models import User
from app.db.session import get_db_session
from app.auth.auth_manager import AuthManager


class UserManager:
    @staticmethod
    def user_exists(username: str) -> bool:
        with get_db_session() as db:
            res = db.execute(
                text("SELECT * FROM public.user WHERE username = :username"),
                {"username": username},
            )
            return res.fetchone() is not None

    @staticmethod
    def create_user(user: User) -> bool:
        with get_db_session() as db:
            db.execute(
                text(
                    "INSERT INTO public.user (username, password, email) VALUES (:username, :password, :email)"
                ),
                {
                    "username": user.username,
                    "password": AuthManager.get_hashed(user.password),
                    "email": user.email,
                },
            )
            db.commit()
            return True
