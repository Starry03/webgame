from pydantic import BaseModel
from datetime import datetime


class User(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool

class Credentials(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class UserSession(BaseModel):
    id: int
    sym_key: str
    expiration_date: datetime


class UserSessionResponse(BaseModel):
    token: Token
    session: UserSession
