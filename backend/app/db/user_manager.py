from sqlalchemy.sql import text

from app.auth.models import User
from app.db.session import get_db_session
from app.auth.hasher import Hasher


class UserManager:
    @staticmethod
    def get_user_by_username(username: str) -> User | None:
        with get_db_session() as db:
            res = db.execute(
                text("SELECT * FROM public.user WHERE username = :username"),
                {"username": username},
            )
            user = res.fetchone()
            if user is None:
                return None
            return User(username=user[1], password=user[2])

    @staticmethod
    def user_exists(username: str) -> bool:
        return UserManager.get_user_by_username(username) is not None

    @staticmethod
    def create_user(user: User) -> bool:
        with get_db_session() as db:
            db.execute(
                text(
                    "INSERT INTO public.user (username, password) VALUES (:username, :password)"
                ),
                {
                    "username": user.username,
                    "password": Hasher.get_hashed(user.password),
                },
            )
            db.commit()
            return True

    @staticmethod
    def delete_user(username: str) -> bool:
        with get_db_session() as db:
            res = db.execute(
                text(
                    "DELETE FROM public.user WHERE username = :username RETURNING username"
                ),
                {"username": username},
            )
            db.commit()
            deleted = res.fetchone()
            if deleted is None:
                return False
            return True
