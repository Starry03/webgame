from pydantic import BaseModel

from .sprite import Sprite


class Player(BaseModel):
    id: int
    user_id: int
    sprite: Sprite
    posX: int
    posY: int
    hp: int
    attack: int
    defence: int
    mana: int
    speed: int
    exp: int
    level: int
