import datetime
import hashlib

from sqlalchemy.sql import text
from fastapi import Request, HTTPException
from starlette.status import HTTP_401_UNAUTHORIZED

from app.db.session import get_db_session
from app.auth.models import UserSession


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
    def is_session_expired(session: UserSession) -> bool:
        return session.expiration_date < datetime.datetime.now()

    @staticmethod
    def get_user_session(_id: int) -> UserSession | None:
        with get_db_session() as session:
            res = session.execute(
                text("SELECT * FROM public.session WHERE id = :id"), {"id": _id}
            ).fetchone()
            if res is None:
                return None
            session = UserSession(id=res[0], sym_key=res[1], expiration_date=res[2])
            if AuthManager.is_session_expired(session):
                return None
            return session

    @staticmethod
    def __get_hashed(data: str) -> str:
        return hashlib.sha256(data.encode("utf-8")).hexdigest()

    async def get_token_header(request: Request) -> str:
        token = getattr(request.state, "Authorization_jwt", None)
        if token is None:
            raise HTTPException(
                status_code=HTTP_401_UNAUTHORIZED, detail="Token missing"
            )
        return token
