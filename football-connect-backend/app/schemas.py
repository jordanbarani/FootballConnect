from pydantic import BaseModel
from typing import Optional

class MatchBase(BaseModel):
    team1: str
    team2: str
    date: str

class MatchCreate(MatchBase):
    pass

class Match(MatchBase):
    id: int
    score: Optional[str] = None

    class Config:
        orm_mode = True
