from pydantic import BaseModel
import datetime


class Credentials(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class UserSession(BaseModel):
    ID: int
    sym_key: str
    expiration_date: datetime.datetime


class UserSessionResponse(BaseModel):
    token: Token
    session: UserSession
