from pydantic import BaseModel

from .room import Room


class Level(BaseModel):
    name: str
    description: str
    head_room: Room
