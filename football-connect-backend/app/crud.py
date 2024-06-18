from sqlalchemy.orm import Session
from . import models, schemas

def get_matches(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Match).offset(skip).limit(limit).all()

def create_match(db: Session, match: schemas.MatchCreate):
    db_match = models.Match(**match.dict())
    db.add(db_match)
    db.commit()
    db.refresh(db_match)
    return db_match
