from app.models.level import Level
from app.models.room import Room
from app.models.item import ItemData
from app.db.session import get_db_session
from sqlalchemy.sql import text


class MapGenerator:
    __MAX_ROOMS: int = 9

    def __get_random_items(self) -> tuple[ItemData]:
        with get_db_session() as db:
            items = db.execute(text("SELECT * FROM public.object")).fetchall()

    def __generate_rooms(self) -> Room:
        pass

    def get_level(self, name: str) -> Level:
        return Level(name=name, head_room=self.__generate_rooms())
