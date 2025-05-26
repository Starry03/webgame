from pydantic import BaseModel


class Score(BaseModel):
    id: int
    owner: int
    timeTaken: int
    level: int
    usedEnhancments: int
    defeatedEnemies: int
    health: int
    mana: int
