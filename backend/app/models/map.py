from pydantic import BaseModel

from .room import Room


class Map(BaseModel):
    main_room: Room
