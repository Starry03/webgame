from pydantic import BaseModel
from datetime import datetime
import json

from fastapi.encoders import jsonable_encoder


class User(BaseModel):
    username: str
    password: str
    email: str | None
    online: bool
    money: int

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

    def to_json(self):
        return json.dumps(jsonable_encoder(self))
