from types import CoroutineType
from typing import Any

from fastapi import Request, Depends

from fastapi.logger import logger
from fastapi.routing import APIRouter
from fastapi.responses import JSONResponse
from jwt import InvalidTokenError
from starlette.status import (
    HTTP_401_UNAUTHORIZED,
    HTTP_500_INTERNAL_SERVER_ERROR,
)
from cryptography.hazmat.primitives import serialization

from app.auth.rsa_manager import RSAManager
from app.auth.models import Credentials, User
from app.auth.jwt_manager import JWTManager
from app.auth.auth_manager import AuthManager
from app.utils.request_util import RequestUtil
from app.db.user_manager import UserManager

router = APIRouter(prefix="/auth")


@router.get("/public-key", response_class=JSONResponse)
def public_key() -> dict:
    public_key: str = RSAManager.get_public_key()
    return JSONResponse(content={"public_key": public_key})


@router.post("/register")
async def register(request: Request):
    body: CoroutineType[Any, Any, Any] = await request.json()
    try:
        credentials: Credentials = RequestUtil.get_credentials(body)
    except ValueError as e:
        logger.error(e)
        return JSONResponse(
            content={"detail": "Invalid credentials"},
            status_code=HTTP_401_UNAUTHORIZED,
        )
    plain_data = RequestUtil.get_plain_data(body)
    email: str | None = plain_data.get("email", None)
    client_public_key = plain_data.get("client_public_key")
    if UserManager.user_exists(credentials.username):
        logger.error("User already exists")
        return JSONResponse(
            content={"detail": "User already exists"},
            status_code=HTTP_401_UNAUTHORIZED,
        )
    if not UserManager.create_user(
        User(
            username=credentials.username,
            password=credentials.password,
            email=email,
            is_active=True,
        )
    ):
        logger.error("Failed to create user")
        return JSONResponse(
            content={"detail": "Failed to create user"},
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
        )
    session = AuthManager.generate_session(credentials)
    string_res = session.to_json()
    encrypted_res = RSAManager.encrypt(
        string_res,
        key=serialization.load_pem_public_key(client_public_key.encode("utf-8")),
    )
    encrypted_res_64 = RSAManager.to_base64(encrypted_res)
    return JSONResponse(content=encrypted_res_64)


@router.post("/login")
async def login(request: Request):
    body: CoroutineType[Any, Any, Any] = await request.json()
    credentials: Credentials = RequestUtil.get_credentials(body)
    plain_data = RequestUtil.get_plain_data(body)
    client_public_key = plain_data.get("client_public_key")
    current_user = AuthManager.get_user_from_credentials(credentials)
    if current_user is None:
        return JSONResponse(
            content={"detail": "Incorrect username or password"},
            status_code=HTTP_401_UNAUTHORIZED,
        )
    session = AuthManager.generate_session(credentials)
    string_res = session.to_json()
    encrypted_res = RSAManager.encrypt(
        string_res,
        key=serialization.load_pem_public_key(client_public_key.encode("utf-8")),
    )
    encrypted_res_64 = RSAManager.to_base64(encrypted_res)
    return JSONResponse(content=encrypted_res_64)


@router.post("/verify-token")
async def verify_token(user: str = Depends(AuthManager.get_token_header)):
    try:
        t = JWTManager.decode_token(user)
        print(t)
        return JSONResponse(content={"detail": "Valid token"})
    except InvalidTokenError as e:
        logger.error(e)
        return JSONResponse(
            content={"detail": "Invalid token"}, status_code=HTTP_401_UNAUTHORIZED
        )
    except Exception as e:
        logger.error(e)
        return JSONResponse(
            content={"detail": "Server error"},
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
        )
