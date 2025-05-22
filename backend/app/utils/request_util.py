from typing import Any
from types import CoroutineType
import json
from fastapi.logger import logger

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
            logger.error("encryption failed")
            raise ValueError("Invalid credentials")
        return Credentials(username=username, password=password)

    @staticmethod
    def get_plain_data(body: CoroutineType[Any, Any, Any]) -> dict[str, str] | None:
        return body.get("plain_data")
