from pydantic import BaseModel

from .sprite import Sprite


class Item(BaseModel):
    name: str
    sprite: Sprite


class ItemData(BaseModel):
    posX: int
    posY: int
    item: Item
