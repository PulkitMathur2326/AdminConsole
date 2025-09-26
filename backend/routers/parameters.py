from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.parameter import Parameter
from app.schemas.parameter import ParameterUpdate, ParameterResponse
from app.auth_utils import verify_token
 
router = APIRouter(prefix="/parameters", tags=["parameters"])
 
@router.get("/", response_model=list[ParameterResponse])
def get_parameters(db: Session = Depends(get_db), payload: dict = Depends(verify_token)):
    if payload.get("role") not in ["Admin", "Super Admin"]:
        raise HTTPException(status_code=403, detail="Not allowed")
    return db.query(Parameter).all()
 
@router.put("/")
def update_parameters(request: list[ParameterUpdate], db: Session = Depends(get_db), payload: dict = Depends(verify_token)):
    if payload.get("role") != "Super Admin":
        raise HTTPException(status_code=403, detail="Only Super Admin can update parameters")
 
    for param in request:
        db_param = db.query(Parameter).filter(Parameter.id == param.id).first()
        if db_param:
            db_param.value = param.value
    db.commit()
    return {"message": "Parameters updated"}