from pydantic import BaseModel

from .sprite import Sprite


class Item(BaseModel):
    name: str
    sprite: Sprite
