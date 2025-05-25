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
    body: Score = await request.json()
    username = user.get("username")
    with get_db_session() as session:
        try:
            user_id = session.execute(
                text(
                    "SELECT id FROM public.player WHERE username = :username returning id"
                ),
                username,
            ).fetchone()
            if not user_id:
                return JSONResponse(
                    content={"error": "User not found"},
                    status_code=404,
                )
            user_id = user_id[0]
            session.execute(
                text(
                    "INSERT INTO public.score (owner, time_taken, exp, life_left, boosts, kills) "
                    "VALUES (:owner, :time_taken, :exp, :life_left, :boosts, :kills)"
                ),
                {
                    "owner": user_id,
                    "time_taken": body.time_taken,
                    "exp": body.exp,
                    "life_left": body.life_left,
                    "boosts": body.boosts,
                    "kills": body.kills,
                },
            )
            session.commit()
        except Exception as e:
            session.rollback()
            return JSONResponse(
                content={"error": str(e)},
                status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            )
