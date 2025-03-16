import base64
import json

from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from starlette.middleware.base import BaseHTTPMiddleware
from app.auth.aes_manager import AESManager
from sqlalchemy import text
from app.db.session import get_db_session


class AESDecryptionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        excluded_paths = ["/auth/public-key", "/auth/login"]
        if request.url.path in excluded_paths:
            response = await call_next(request)
            return response
        try:
            headers = request.headers
            bearer_token = headers.get("Authorization", None)
            if bearer_token is None:
                return JSONResponse(
                    content={"detail": "Token missing"},
                    status_code=HTTP_401_UNAUTHORIZED,
                )
            encrypted_token = bearer_token.split(" ")[1]
            session_id = headers.get("SessionID", None)
            if session_id is None:
                return JSONResponse(
                    content={"detail": "SessionID missing"},
                    status_code=HTTP_401_UNAUTHORIZED,
                )
            with get_db_session() as db:
                session_found = db.execute(
                    text("SELECT * FROM public.session WHERE id = :id"),
                    {"id": session_id},
                ).fetchone()
                session_key = session_found[1]
                decrypted_token = AESManager.decrypt(
                    base64.b64decode(encrypted_token), bytes.fromhex(session_key)
                ).decode("utf-8")
                request.state.Authorization_jwt = decrypted_token
        except Exception as e:
            return JSONResponse(
                content={"detail": "bad request"},
                status_code=HTTP_400_BAD_REQUEST,
            )
        response = await call_next(request)
        return response
