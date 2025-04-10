from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.auth.login import router as auth_router
from .routes.game.router import router as game_router
from .security.middleware.rsa_middleware import RSADecryptionMiddleware
from .security.middleware.aes_middleware import AESDecryptionMiddleware

app = FastAPI()

# middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["localhost", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)
app.add_middleware(RSADecryptionMiddleware)
app.add_middleware(AESDecryptionMiddleware)

# router
app.include_router(auth_router)
app.include_router(game_router)
