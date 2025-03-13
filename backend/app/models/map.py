from pydantic import BaseModel

from .room import Room


class Map(BaseModel):
    rooms: tuple[Room]
