from fastapi import APIRouter

from .data import router as datarouter

router = APIRouter(
    prefix="/game",
)

router.include_router(datarouter)