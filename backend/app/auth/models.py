from pydantic import BaseModel


class Credentials(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class UserSession(BaseModel):
    ID: int
    sym_key: str


class UserSessionResponse(BaseModel):
    token: Token
    session: UserSession
