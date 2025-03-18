from pydantic import BaseModel
from .item import ItemData
from .sprite import Sprite


class Room(BaseModel):
    id: int
    level_id: int
    items: tuple[ItemData]
    bg_texture: tuple[Sprite]
    left_room: 'Room' | None = None
    right_room: 'Room' | None = None
    up_room: 'Room' | None = None
    bottom_room: 'Room' | None = None
