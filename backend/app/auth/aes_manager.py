import datetime
from secrets import token_bytes
from os import urandom
import base64

from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from sqlalchemy import text

from app.auth.models import UserSession
from app.db.session import get_db_session


class AESManager:
    __BITS: int = 256
    __NONCE_SIZE: int = 16

    @staticmethod
    def generate_session() -> UserSession:
        sym_key = AESManager.__generate_key()
        exp_time = datetime.datetime.now() + datetime.timedelta(days=1)
        with get_db_session() as session:
            b64key = base64.b64encode(sym_key).decode("utf-8")
            res = session.execute(
                text(
                    "INSERT INTO public.session (key, expires_at) VALUES (:sym_key, :expires_at) RETURNING id"
                ),
                {"sym_key": b64key, "expires_at": exp_time},
            ).fetchone()
            if res is None:
                raise Exception("Failed to create session")
            res = res[0]
            session.commit()
            return UserSession(id=res, sym_key=b64key, expiration_date=exp_time)

    @staticmethod
    def __generate_key():
        return token_bytes(AESManager.__BITS // 8)

    @staticmethod
    def encrypt(data: bytes, key: bytes | str) -> bytes:
        nonce = urandom(AESManager.__NONCE_SIZE)
        algo = algorithms.AES(key)
        cipher = Cipher(algo, modes.CTR(nonce))
        encryptor = cipher.encryptor()
        cipher_text = encryptor.update(data) + encryptor.finalize()
        return nonce + cipher_text

    @staticmethod
    def decrypt(data: bytes, key: bytes) -> bytes:
        if len(data) < AESManager.__NONCE_SIZE:
            return bytes(0)
        nonce, message = (
            data[: AESManager.__NONCE_SIZE],
            data[AESManager.__NONCE_SIZE :],
        )
        algo = algorithms.AES(key)
        cipher = Cipher(algo, modes.CTR(nonce))
        decryptor = cipher.decryptor()
        return decryptor.update(message) + decryptor.finalize()
