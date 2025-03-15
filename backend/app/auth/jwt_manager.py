from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
import jwt

from os import getenv
from datetime import datetime, timedelta, timezone

from app.auth.models import Credentials, Token


class JWTManager:
    __passoauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
    __pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    __EXPIRATION_TIME_MIN = getenv("JWT_EXPIRES_IN_MIN", default=60)

    @staticmethod
    def __get_token(to_encode: dict, delta_time: timedelta) -> str:
        expire = datetime.now(timezone.utc) + delta_time
        to_encode.update({"exp": expire})
        return jwt.encode(
            to_encode, getenv("JWT_SECRET"), algorithm=getenv("JWT_ALGORITHM")
        )

    @staticmethod
    def create_token(data: Credentials) -> Token:
        expiration_time_min = timedelta(minutes=JWTManager.__EXPIRATION_TIME_MIN)
        token = JWTManager.__get_token(data.model_dump(), expiration_time_min)
        return Token(access_token=token, token_type="bearer")
