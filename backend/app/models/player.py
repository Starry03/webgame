from pydantic import BaseModel

from .sprite import Sprite


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
