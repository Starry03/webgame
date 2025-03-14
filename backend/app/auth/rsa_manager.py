from os import path
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives import hashes
import base64


class RSAManager:
    __PUBLIC_KEY_PATH: str = "public_key.pem"
    __PRIVATE_KEY_PATH: str = "private_key.pem"
    __PUBLIC_EXPONENT: int = 65537
    __KEY_SIZE: int = 2048

    @staticmethod
    def get_public_key() -> str:
        if not path.exists(RSAManager.__PUBLIC_KEY_PATH):
            RSAManager.__generate_key_pair()
        with open(RSAManager.__PUBLIC_KEY_PATH, "r") as file:
            return file.read()

    @staticmethod
    def get_private_key() -> str:
        if not path.exists(RSAManager.__PRIVATE_KEY_PATH):
            RSAManager.__generate_key_pair()
        with open(RSAManager.__PRIVATE_KEY_PATH, "r") as file:
            return file.read()

    @staticmethod
    def decrypt(encrypted_message64: bytes) -> bytes:
        encrypted_message = base64.b64decode(encrypted_message64)
        with open(RSAManager.__PRIVATE_KEY_PATH, "rb") as file:
            private_key: rsa.RSAPrivateKey = serialization.load_pem_private_key(
                file.read(), password=None
            )
        return private_key.decrypt(
            encrypted_message,
            padding=padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA1()),
                algorithm=hashes.SHA1(),
                label=None,
            ),
        )

    @staticmethod
    def __generate_key_pair():
        private_key: rsa.RSAPrivateKey = rsa.generate_private_key(
            public_exponent=RSAManager.__PUBLIC_EXPONENT, key_size=RSAManager.__KEY_SIZE
        )
        private_key_bytes: bytes = private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption(),
        )
        public_key: rsa.RSAPublicKey = private_key.public_key()
        public_key_bytes: bytes = public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo,
        )
        with open(RSAManager.__PRIVATE_KEY_PATH, "wb") as file:
            file.write(private_key_bytes)
        with open(RSAManager.__PUBLIC_KEY_PATH, "wb") as file:
            file.write(public_key_bytes)
