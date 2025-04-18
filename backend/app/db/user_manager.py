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
            return User(id=user[0], username=user[1], password=user[2], email=user[3])

    @staticmethod
    def user_exists(username: str) -> bool:
        return UserManager.get_user_by_username(username) is not None

    @staticmethod
    def create_user(user: User) -> bool:
        with get_db_session() as db:
            db.execute(
                text(
                    "INSERT INTO public.user (username, password, email) VALUES (:username, :password, :email)"
                ),
                {
                    "username": user.username,
                    "password": Hasher.get_hashed(user.password),
                    "email": user.email,
                },
            )
            db.commit()
            return True
