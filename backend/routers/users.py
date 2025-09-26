from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate, UserResponse
from app.auth_utils import verify_token
 
router = APIRouter(prefix="/users", tags=["users"])
 
@router.get("/", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db), payload: dict = Depends(verify_token)):
    if payload.get("role") != "Super Admin":
        raise HTTPException(status_code=403, detail="Only Super Admin can view users")
    return db.query(User).all()
 
@router.post("/", response_model=UserResponse)
def create_user(request: UserCreate, db: Session = Depends(get_db), payload: dict = Depends(verify_token)):
    if payload.get("role") != "Super Admin":
        raise HTTPException(status_code=403, detail="Only Super Admin can create users")
 
    default_password = "superadmin" if request.role == "Super Admin" else "admin"
    new_user = User(username=request.username, email=request.email, role=request.role, password=default_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
 
@router.put("/{user_id}")
def update_user(user_id: int, request: UserUpdate, db: Session = Depends(get_db), payload: dict = Depends(verify_token)):
    if payload.get("role") != "Super Admin":
        raise HTTPException(status_code=403, detail="Only Super Admin can update users")
 
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.email = request.email
    user.role = request.role
    db.commit()
    return {"message": "User updated"}
 
@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db), payload: dict = Depends(verify_token)):
    if payload.get("role") != "Super Admin":
        raise HTTPException(status_code=403, detail="Only Super Admin can delete users")
 
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}