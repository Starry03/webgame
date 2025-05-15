from pydantic import BaseModel

from .sprite import Sprite


class PlayerClass(BaseModel):
    name: str
    speed: int
    attack: int
    defence: int
    mana: int
    hp: int
    description: str | None = None
    playable: bool


class Player(BaseModel):
    id: int
    owner: int
    sprite: Sprite
    pos_x: int
    pos_y: int
    hp: int
    attack: int
    defence: int
    mana: int
    speed: int
    exp: int
    level: int
