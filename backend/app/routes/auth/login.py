import json

from fastapi import Request, Depends
from fastapi.routing import APIRouter
from fastapi.responses import JSONResponse
from jwt import InvalidTokenError
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_500_INTERNAL_SERVER_ERROR
from cryptography.hazmat.primitives import serialization

from app.auth.rsa_manager import RSAManager
from app.auth.models import Credentials
from app.auth.jwt_manager import JWTManager
from app.auth.auth_manager import AuthManager
from app.auth.models import UserSession, UserSessionResponse
from app.auth.aes_manager import AESManager

router = APIRouter(prefix="/auth")


@router.get("/public-key", response_class=JSONResponse)
def public_key() -> dict:
    public_key: str = RSAManager.get_public_key()
    return JSONResponse(content={"public_key": public_key})


@router.post("/login")
async def login(request: Request):
    data = await request.json()
    decrypted_data = json.loads(data.get("decrypted_data"))
    plain_data = data.get("plain_data")
    username = decrypted_data.get("username")
    password = decrypted_data.get("password")
    client_public_key = plain_data

    current_user = AuthManager.get_user_from_password(username, password)
    if current_user is None:
        return JSONResponse(
            content={"detail": "Incorrect username or password"},
            status_code=HTTP_401_UNAUTHORIZED,
        )

    session: UserSession = AESManager.generate_session()
    token = JWTManager.create_token(Credentials(username=username, password=password))
    res = UserSessionResponse(token=token, session=session)
    string_res = json.dumps(res.model_dump()).encode("utf-8")

    encrypted_res = RSAManager.encrypt(
        string_res,
        key=serialization.load_pem_public_key(client_public_key.encode("utf-8")),
    )
    encrypted_res_64 = RSAManager.to_base64(encrypted_res)
    return JSONResponse(content=encrypted_res_64)


@router.post("/verify-token")
async def verify_token(token: str = Depends(AuthManager.get_token_header)):
    try:
        token_data = JWTManager.decode_token(token)
        return JSONResponse(content={"detail": "Token is valid"})
    except InvalidTokenError as e:
        print('error:', e)
        return JSONResponse(
            content={"detail": "Token is invalid"}, status_code=HTTP_401_UNAUTHORIZED
        )
    except Exception as e:
        print('error:', e)
        return JSONResponse(
            content={"detail": "Server error"}, status_code=HTTP_500_INTERNAL_SERVER_ERROR
        )

