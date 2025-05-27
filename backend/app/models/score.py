from pydantic import BaseModel


class Score(BaseModel):
    id: int
    owner: int
    timeTaken: float
    level: int
    usedEnhancments: int
    defeatedEnemies: int
    health: int
    mana: int
