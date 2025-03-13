from fastapi.routing import APIRouter

import random
from ..models.room import Room

router = APIRouter(prefix="/generation")


def generate_next_room(room: Room) -> Room:
    new_room = Room()
    prev_room: Room = random.choice(
        [
            "up" if room.up_room is not None else None,
            "bottom" if room.bottom_room is not None else None,
            "left" if room.left_room is not None else None,
            "right" if room.right_room is not None else None,
        ]
    )


@router.post("/map")
def generate_map():
    MAX_ROOMS: int = 9
    MIN_ROOM: int = 5
    ROOM_COUNT: int = random.randint(MIN_ROOM, MAX_ROOMS)

    root: Room = Room(cod=0)

