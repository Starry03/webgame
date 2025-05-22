import datetime
import hashlib

from sqlalchemy.sql import text
from fastapi import Request, HTTPException
from fastapi.logger import logger
from starlette.status import HTTP_401_UNAUTHORIZED

from app.db.session import get_db_session
from app.auth.models import Credentials, User, UserSession, UserSessionResponse
from app.auth.aes_manager import AESManager
from app.auth.jwt_manager import JWTManager
from app.auth.hasher import Hasher



class AuthManager:
    @staticmethod
    def get_user_from_credentials(credentials: Credentials):
        username = credentials.username
        password = Hasher.get_hashed(credentials.password)
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
    def generate_session(credentials: Credentials) -> UserSessionResponse:
        session: UserSession = AESManager.generate_session()
        token = JWTManager.create_token(credentials)
        return UserSessionResponse(token=token, session=session)

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
                logger.error("Session expired")
                return None
            return session

    @staticmethod
    def get_token_header(request: Request) -> str:
        token = getattr(request.state, "Authorization_jwt", None)
        if token is None:
            raise HTTPException(
                status_code=HTTP_401_UNAUTHORIZED, detail="Token missing"
            )
        return token

    @staticmethod
    def get_user(request: Request) -> User:
        try:
            return JWTManager.decode_token(AuthManager.get_token_header(request))
        except Exception as e:
            raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail=str(e))
