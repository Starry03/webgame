from pydantic import BaseModel

from .sprite import Sprite


class Item(BaseModel):
    name: str
    sprite: Sprite


class ItemData(BaseModel):
    pos: tuple[int, int]
    item: Item
