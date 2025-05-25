from pydantic import BaseModel


class Score(BaseModel):
    id: int
    owner: int
    time_taken: int
    exp: int
    life_left: int
    boosts: int
    kills: int
