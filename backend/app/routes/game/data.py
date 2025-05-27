from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse
from starlette.status import HTTP_200_OK
from sqlalchemy import text
from typing import Any
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR

from app.auth.auth_manager import AuthManager
from app.db.session import get_db_session
from app.models.player import PlayerClass
from app.models.score import Score

router = APIRouter(
    prefix="/data",
)


@router.get("/classes", response_class=JSONResponse)
async def get_classes(__: Request, _=Depends(AuthManager.get_user)):
    with get_db_session() as session:
        classes = session.execute(text("SELECT * FROM public.classe")).fetchall()
        classes_models: list[dict[str, Any]] = [
            PlayerClass(
                name=cls[0],
                speed=cls[1],
                attack=cls[2],
                defence=cls[3],
                mana=cls[4],
                hp=cls[5],
                description=cls[6],
                playable=cls[7],
            ).model_dump()
            for cls in classes
        ]
        return JSONResponse(
            content=classes_models,
            status_code=HTTP_200_OK,
        )


@router.post("/set_score", response_class=JSONResponse)
async def set_score(
    request: Request,
    user=Depends(AuthManager.get_user),
):
    body = await request.json()
    if not body:
        return JSONResponse(
            content={"error": "Invalid score data"},
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
        )
    username = user.get("username")
    with get_db_session() as session:
        try:
            user_id = session.execute(
                text("SELECT id FROM public.user WHERE username = :username"),
                {"username": username},
            ).fetchone()
            if not user_id:
                return JSONResponse(
                    content={"error": "User not found"},
                    status_code=404,
                )
            user_id = user_id[0]
            session.execute(
                text(
                    """INSERT INTO public.score (owner, time_taken, level, used_enhancments, defeated_enemies, health, mana)
                    VALUES (:owner, :timeTaken, :level, :usedEnhancments, :defeatedEnemies, :health, :mana)"""
                ),
                {
                    "owner": user_id,
                    "timeTaken": int(body.get("timeTaken", 0.0)),
                    "level": body.get("level", 0),
                    "usedEnhancments": body.get("usedEnhancments", 0),
                    "defeatedEnemies": body.get("defeatedEnemies", 0),
                    "health": body.get("health", 0),
                    "mana": body.get("mana", 0),
                },
            )
            session.commit()
            return JSONResponse(
                content={"message": "Score saved successfully"},
                status_code=HTTP_200_OK,
            )
        except Exception as e:
            session.rollback()
            print(e)
            return JSONResponse(
                content={"error": str(e)},
                status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            )
