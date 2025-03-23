from fastapi import APIRouter, Depends, Request
from sqlalchemy import text

from app.auth.auth_manager import AuthManager
from app.db.session import get_db_session

router = APIRouter(
    prefix="/data",
)


@router.get("/classes")
async def get_classes(request: Request, _=Depends(AuthManager.get_user)):
    with get_db_session() as session:
        classes = session.execute(text("SELECT * FROM public.classe")).fetchall()
        print(classes)
        return classes
