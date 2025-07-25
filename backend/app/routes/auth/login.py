from types import CoroutineType
from typing import Any

from fastapi import Request, Depends

from fastapi.logger import logger
from fastapi.routing import APIRouter
from fastapi.responses import JSONResponse
from jwt import InvalidTokenError
from starlette.status import (
    HTTP_401_UNAUTHORIZED,
    HTTP_409_CONFLICT,
    HTTP_404_NOT_FOUND,
    HTTP_500_INTERNAL_SERVER_ERROR,
)
from cryptography.hazmat.primitives import serialization

from app.auth.rsa_manager import RSAManager
from app.auth.models import Credentials, User, UserSession, UserSessionResponse, Token
from app.auth.jwt_manager import JWTManager
from app.auth.auth_manager import AuthManager
from app.utils.request_util import RequestUtil
from app.db.user_manager import UserManager

router = APIRouter(prefix="/auth")


@router.post("/delete", response_class=JSONResponse)
async def delete(request: Request):
    body: CoroutineType[Any, Any, Any] = await request.json()
    credentials: Credentials = RequestUtil.get_credentials(body)
    plain_data = RequestUtil.get_plain_data(body)
    if plain_data is None:
        logger.error("data is missing")
        return JSONResponse(
            content={"detail": "data is missing"},
            status_code=HTTP_401_UNAUTHORIZED,
        )
    client_public_key_pem = plain_data.get("client_public_key")
    if client_public_key_pem is None:
        logger.error("client public key is missing")
        return JSONResponse(
            content={"detail": "client public key is missing"},
            status_code=HTTP_401_UNAUTHORIZED,
        )
    current_user = AuthManager.get_user_from_credentials(credentials)
    if current_user is None:
        logger.error("user not found")
        return JSONResponse(
            content={"detail": "Incorrect username or password"},
            status_code=HTTP_401_UNAUTHORIZED,
        )
    username = current_user[1]
    if (not UserManager.delete_user(username)):
        return JSONResponse(status_code=HTTP_404_NOT_FOUND, content={"detail": "user not found"})
    return JSONResponse(content={"detail": "user deleted"})


@router.get("/public-key", response_class=JSONResponse)
async def public_key() -> JSONResponse:
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
    if plain_data is None:
        logger.error("data is missing")
        return JSONResponse(
            content={"detail": "data is missing"},
            status_code=HTTP_401_UNAUTHORIZED,
        )
    email: str | None = plain_data.get("email", None)
    client_public_key_pem: str | None = plain_data.get("client_public_key")
    if client_public_key_pem is None:
        logger.error("client public key is missing")
        return JSONResponse(
            content={"detail": "client public key is missing"},
            status_code=HTTP_401_UNAUTHORIZED,
        )
    if UserManager.user_exists(credentials.username):
        logger.error("User already exists")
        return JSONResponse(
            content={"detail": "User already exists"},
            status_code=HTTP_409_CONFLICT,
        )
    if not UserManager.create_user(
        User(
            username=credentials.username,
            password=credentials.password,
            email=email,
            money=0,
            online=True,
        )
    ):
        logger.error("Failed to create user")
        return JSONResponse(
            content={"detail": "Failed to create user"},
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
        )
    session: UserSessionResponse = AuthManager.generate_session(credentials)
    try:
        client_public_key = serialization.load_pem_public_key(
            client_public_key_pem.encode()
        )
        crypted_token: str = RSAManager.to_base64(
            RSAManager.encrypt(
                session.token.access_token.encode("utf-8"),
                key=client_public_key,
            )
        )
        encrypted_sym_key = RSAManager.to_base64(
            RSAManager.encrypt(
                session.session.sym_key.encode("utf-8"),
                key=client_public_key,
            )
        )
        encrypted_session: UserSessionResponse = UserSessionResponse(
            token=Token(access_token=crypted_token, token_type="bearer"),
            session=UserSession(
                id=session.session.id,
                sym_key=encrypted_sym_key,
                expiration_date=session.session.expiration_date,
            ),
        )
        return JSONResponse(content=encrypted_session.to_json())
    except Exception as e:
        logger.error(e)
        return JSONResponse(
            content={"detail": "client public key is invalid or missing"},
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
        )


@router.post("/login")
async def login(request: Request):
    body: CoroutineType[Any, Any, Any] = await request.json()
    credentials: Credentials = RequestUtil.get_credentials(body)
    plain_data = RequestUtil.get_plain_data(body)
    if plain_data is None:
        logger.error("data is missing")
        return JSONResponse(
            content={"detail": "data is missing"},
            status_code=HTTP_401_UNAUTHORIZED,
        )
    client_public_key_pem = plain_data.get("client_public_key")
    if client_public_key_pem is None:
        logger.error("client public key is missing")
        return JSONResponse(
            content={"detail": "client public key is missing"},
            status_code=HTTP_401_UNAUTHORIZED,
        )
    current_user = AuthManager.get_user_from_credentials(credentials)
    if current_user is None:
        return JSONResponse(
            content={"detail": "Incorrect username or password"},
            status_code=HTTP_401_UNAUTHORIZED,
        )
    session: UserSessionResponse = AuthManager.generate_session(credentials)
    try:
        client_public_key = serialization.load_pem_public_key(
            client_public_key_pem.encode()
        )
        crypted_token: str = RSAManager.to_base64(
            RSAManager.encrypt(
                session.token.access_token.encode("utf-8"),
                key=client_public_key,
            )
        )
        encrypted_sym_key = RSAManager.to_base64(
            RSAManager.encrypt(
                session.session.sym_key.encode("utf-8"),
                key=client_public_key,
            )
        )
        encrypted_session: UserSessionResponse = UserSessionResponse(
            token=Token(access_token=crypted_token, token_type="bearer"),
            session=UserSession(
                id=session.session.id,
                sym_key=encrypted_sym_key,
                expiration_date=session.session.expiration_date,
            ),
        )
        return JSONResponse(content=encrypted_session.to_json())
    except Exception as e:
        logger.error(e)
        return JSONResponse(
            content={"detail": "client public key is invalid or missing"},
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
        )


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
