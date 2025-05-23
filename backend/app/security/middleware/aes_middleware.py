import base64

from fastapi import Request
from fastapi.logger import logger
from fastapi.responses import JSONResponse
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from starlette.middleware.base import BaseHTTPMiddleware

from app.auth.aes_manager import AESManager
from app.auth.auth_manager import AuthManager
from app.auth.models import UserSession
from app.security.middleware.rsa_middleware import RSADecryptionMiddleware


class AESDecryptionMiddleware(BaseHTTPMiddleware):
    __excluded_paths: tuple[str] = RSADecryptionMiddleware.allowed_paths + (
        "/auth/public-key",
    )

    async def dispatch(self, request: Request, call_next):
        if (
            request.url.path in AESDecryptionMiddleware.__excluded_paths
            or request.method == "OPTIONS"
        ):
            return await call_next(request)
        try:
            headers = request.headers
            session_id = headers.get("sessionid", None)
            if session_id is None:
                logger.error("SessionID missing")
                return JSONResponse(
                    content={"detail": "SessionID missing"},
                    status_code=HTTP_401_UNAUTHORIZED,
                )
            bearer_token = headers.get("authorization", None)
            if bearer_token is None:
                logger.error("Authorization header missing")
                return JSONResponse(
                    content={"detail": "Token error"},
                    status_code=HTTP_401_UNAUTHORIZED,
                )
            encrypted_token = bearer_token.split(" ")[1]
            user_session: UserSession | None = AuthManager.get_user_session(
                int(session_id)
            )
            if user_session is None:
                print("Session not found")
                return JSONResponse(
                    content={"detail": "Session not found"},
                    status_code=HTTP_401_UNAUTHORIZED,
                )
            self.decrypt_token(
                request=request,
                session_key=user_session.sym_key,
                encrypted_token=encrypted_token,
            )
            await self.decrypt_body(request=request, session_key=user_session.sym_key)
        except Exception as e:
            logger.error(e)
            return JSONResponse(
                content={"detail": "bad request"},
                status_code=HTTP_400_BAD_REQUEST,
            )
        return await call_next(request)

    async def decrypt_body(self, request: Request, session_key: str):
        body = await request.body()
        if len(body) == 0:
            return
        decrypted_body = AESManager.decrypt(
            base64.b64decode(body), base64.b64decode(session_key)
        ).decode()
        request._body = decrypted_body

    def decrypt_token(self, request: Request, session_key: str, encrypted_token: str):
        try:
            decrypted_token = AESManager.decrypt(
                base64.b64decode(encrypted_token), base64.b64decode(session_key)
            ).decode("utf-8")
            request.state.Authorization_jwt = decrypted_token
        except Exception as e:
            print(e)
