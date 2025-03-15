import json

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
            body = await request.body()
            body = json.loads(body)
            encrypted_data = body.get("encrypted_data", None)
            if encrypted_data is None:
                return JSONResponse(
                    content={"error": "encrypted_data missing"},
                    status_code=HTTP_400_BAD_REQUEST,
                )
            decrypted_data = RSAManager.decrypt(encrypted_data)
            request._body = json.dumps(dict(
                decrypted_data=decrypted_data.decode("utf-8"),
                plain_data=body.get("plain_data", ""),
            )).encode("utf-8")
        except Exception as e:
            print(e)
            return JSONResponse(
                content={"error": "Invalid encrypted message"},
                status_code=HTTP_400_BAD_REQUEST,
            )
        response = await call_next(request)
        return response
