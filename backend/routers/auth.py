from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db import get_db
from app.models.user import User
from app.auth_utils import create_access_token
 
router = APIRouter(prefix="/auth", tags=["auth"])
 
class LoginRequest(BaseModel):
    username: str
    password: str
 
class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
 
@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = (
        db.query(User)
        .filter(User.username == request.username, User.password == request.password)
        .first()
    )
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
 
    token = create_access_token({"sub": user.username, "role": user.role})
    return {"access_token": token, "token_type": "bearer"}