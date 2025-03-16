import base64

from fastapi import Request
from fastapi.logger import logger
from fastapi.responses import JSONResponse
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from starlette.middleware.base import BaseHTTPMiddleware

from app.auth.aes_manager import AESManager
from app.auth.auth_manager import AuthManager
from app.auth.models import UserSession


class AESDecryptionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        excluded_paths = ["/auth/public-key", "/auth/login"]
        if request.url.path in excluded_paths:
            response = await call_next(request)
            return response
        try:
            headers = request.headers
            session_id = headers.get("SessionID", None)
            if session_id is None:
                return JSONResponse(
                    content={"detail": "SessionID missing"},
                    status_code=HTTP_401_UNAUTHORIZED,
                )
            bearer_token = headers.get("Authorization", None)
            if bearer_token is None:
                return JSONResponse(
                    content={"detail": "Token missing"},
                    status_code=HTTP_401_UNAUTHORIZED,
                )
            encrypted_token = bearer_token.split(" ")[1]
            user_session: UserSession = AuthManager.get_user_session(int(session_id))
            if user_session is None:
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
        response = await call_next(request)
        return response

    async def decrypt_body(self, request: Request, session_key: str):
        body = await request.body()
        decrypted_body = AESManager.decrypt(
            base64.b64decode(body), bytes.fromhex(session_key)
        ).decode()
        request._body = decrypted_body

    def decrypt_token(self, request: Request, session_key: str, encrypted_token: str):
        decrypted_token = AESManager.decrypt(
            base64.b64decode(encrypted_token), bytes.fromhex(session_key)
        ).decode("utf-8")
        request.state.Authorization_jwt = decrypted_token
