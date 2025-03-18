from pydantic import BaseModel


class Level(BaseModel):
    id: int
    name: str
    difficulty: int
