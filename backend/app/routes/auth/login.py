from fastapi import Request
from fastapi.routing import APIRouter
from fastapi.responses import JSONResponse
from app.auth.rsa_manager import RSAManager

from app.auth.models import Credentials
from app.auth.jwt_manager import JWTManager

router = APIRouter(prefix="/auth")


@router.get("/public-key", response_class=JSONResponse)
def public_key() -> dict:
    public_key: str = RSAManager.get_public_key()
    return JSONResponse(content={"public_key": public_key})


@router.post("/login")
async def login(request: Request) -> JSONResponse:
    data = await request.json()
    username = data.get("username")
    password = data.get("password")
    # validation
    token = JWTManager.create_token(Credentials(username=username, password=password))
    return JSONResponse(content=token)
