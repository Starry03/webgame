from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.level.generation import router as generation_router
from .routes.auth.login import router as login_router
from .security.middleware.rsa_middleware import RSADecryptionMiddleware

app = FastAPI()

# middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["localhost", "localhost:5173", "localhost:8000"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)
app.add_middleware(RSADecryptionMiddleware)

# router
app.include_router(generation_router)
app.include_router(login_router)
