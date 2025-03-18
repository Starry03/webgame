from typing import Any
from types import CoroutineType
import json

from app.auth.models import Credentials


class RequestUtil:
    @staticmethod
    def get_credentials(
        body: CoroutineType[Any, Any, Any],
    ) -> Credentials:
        decrypted_data = json.loads(body.get("decrypted_data"))
        username = decrypted_data.get("username")
        password = decrypted_data.get("password")
        if username is None or password is None:
            raise ValueError("Invalid credentials")
        return Credentials(username=username, password=password)

    def get_plain_data(body: CoroutineType[Any, Any, Any]) -> dict[str, str]:
        return body.get("plain_data")
