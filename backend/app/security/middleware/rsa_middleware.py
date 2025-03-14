from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.status import HTTP_400_BAD_REQUEST
from starlette.middleware.base import BaseHTTPMiddleware
from app.auth.rsa_manager import RSAManager


class RSADecryptionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        METHOD: str = request.method
        URL: str = request.url.path
        valid_urls = ["/auth/login"]
        valid_methods = ["POST"]
        if (METHOD not in valid_methods) or (URL not in valid_urls):
            response = await call_next(request)
            return response
        try:
            encrypted_body = await request.body()
            decrypted_body = RSAManager.decrypt(encrypted_body)
            request._body = decrypted_body
        except Exception as e:
            return JSONResponse(
                content={"error": "Invalid encrypted message"},
                status_code=HTTP_400_BAD_REQUEST,
            )
        response = await call_next(request)
        return response
