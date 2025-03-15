import secrets
import datetime

from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from sqlalchemy import text

from app.auth.models import UserSession
from app.db.session import get_db_session


class AESManager:
    __BITS: int = 256

    @staticmethod
    def generate_session() -> UserSession:
        sym_key = AESManager.__generate_key()
        exp_time = datetime.datetime.now() + datetime.timedelta(days=1)
        with get_db_session() as session:
            res = session.execute(
                text(
                    "INSERT INTO public.session (key, expires_at) VALUES (:sym_key, :expires_at) RETURNING id"
                ),
                {"sym_key": sym_key.hex(), "expires_at": exp_time},
            ).fetchone()[0]
            session.commit()
            return UserSession(ID=res, sym_key=sym_key.hex())

    @staticmethod
    def __generate_key():
        return secrets.token_bytes(AESManager.__BITS // 8)

    @staticmethod
    def encrypt(data: bytes, key: bytes) -> bytes:
        algo = algorithms.AES(key)
        cipher = Cipher(algo, modes.CTR())
        encryptor = cipher.encryptor()
        return encryptor.update(data) + encryptor.finalize()

    @staticmethod
    def decrypt(data: bytes, key: bytes) -> bytes:
        algo = algorithms.AES(key)
        cipher = Cipher(algo, modes.CTR())
        decryptor = cipher.decryptor()
        return decryptor.update(data) + decryptor.finalize()
