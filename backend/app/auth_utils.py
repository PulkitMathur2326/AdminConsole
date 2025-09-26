from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.user import User
from pydantic import BaseModel
 
router = APIRouter(prefix="/auth", tags=["auth"])
 
class LoginRequest(BaseModel):
    username: str
    password: str
 
class LoginResponse(BaseModel):
    id: int
    username: str
    email: str
    role: str
 
    class Config:
        orm_mode = True
 
@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = (
        db.query(User)
        .filter(User.username == request.username, User.password == request.password)
        .first()
    )
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return user