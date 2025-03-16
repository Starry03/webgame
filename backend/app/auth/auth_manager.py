from sqlalchemy.sql import text
import hashlib
from app.db.session import get_db_session
from fastapi import Request, HTTPException
from starlette.status import HTTP_401_UNAUTHORIZED


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

    async def get_token_header(request: Request) -> str:
        token = getattr(request.state, "Authorization_jwt", None)
        if token is None:
            raise HTTPException(
                status_code=HTTP_401_UNAUTHORIZED, detail="Token missing"
            )
        return token
