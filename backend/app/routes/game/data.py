from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse
from starlette.status import HTTP_200_OK
from sqlalchemy import text

from app.auth.auth_manager import AuthManager
from app.db.session import get_db_session
from app.models.player import PlayerClass

router = APIRouter(
    prefix="/data",
)


@router.get("/classes", response_class=JSONResponse)
async def get_classes(__: Request, _=Depends(AuthManager.get_user)):
    with get_db_session() as session:
        classes: list[tuple] = session.execute(text("SELECT * FROM public.classe")).fetchall()
        classes_models: list[PlayerClass] = [
            PlayerClass(
                name=cls[0],
                speed=cls[1],
                attack=cls[2],
                defence=cls[3],
                mana=cls[4],
                hp=cls[5],
                description=cls[6],
                playable=cls[7]
            ).model_dump()
            for cls in classes
        ]
        print(classes_models)
        return JSONResponse(
            content=classes_models,
            status_code=HTTP_200_OK,
        )

