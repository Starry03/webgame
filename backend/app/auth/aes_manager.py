import datetime
from secrets import token_bytes
from os import urandom

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
            res = session.execute(
                text(
                    "INSERT INTO public.session (key, expires_at) VALUES (:sym_key, :expires_at) RETURNING id"
                ),
                {"sym_key": sym_key.hex(), "expires_at": exp_time},
            ).fetchone()[0]
            session.commit()
            return UserSession(ID=res, sym_key=sym_key.hex(), expiration_date=exp_time)

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
        nonce, message = (
            data[: AESManager.__NONCE_SIZE],
            data[AESManager.__NONCE_SIZE :],
        )
        algo = algorithms.AES(key)
        cipher = Cipher(algo, modes.CTR(nonce))
        decryptor = cipher.decryptor()
        return decryptor.update(message) + decryptor.finalize()
