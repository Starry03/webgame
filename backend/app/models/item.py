from pydantic import BaseModel

from .sprite import Sprite


class Item(BaseModel):
    kind: str
    sprite: Sprite


class ItemData(BaseModel):
    kind: str
    sprite: Sprite
    value: int
    pos_x: int
    pos_y: int
    takeable: bool
