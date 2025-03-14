import secrets
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes


class AESManager:
    __BITS: int = 256

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
