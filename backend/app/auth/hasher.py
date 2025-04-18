from hashlib import sha256

class Hasher:
    @staticmethod
    def get_hashed(data: str) -> str:
        return sha256(data.encode("utf-8")).hexdigest()