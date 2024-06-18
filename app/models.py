from sqlalchemy import Column, Integer, String
from .database import Base

class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    team1 = Column(String, index=True)
    team2 = Column(String, index=True)
    date = Column(String, index=True)
    score = Column(String, index=True, nullable=True)
