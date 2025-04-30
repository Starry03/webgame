from hashlib import sha256
from os import getenv

class Hasher:
    __SALT: str | None = getenv("HASH_SALT")
    @staticmethod
    def get_hashed(data: str) -> str:
        if (Hasher.__SALT is not None):
            data = Hasher.__SALT + data
        return sha256(data.encode("utf-8")).hexdigest()