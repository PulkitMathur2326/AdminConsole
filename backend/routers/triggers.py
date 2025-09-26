from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.trigger import Trigger
from app.schemas.trigger import TriggerCreate, TriggerUpdate, TriggerResponse
from app.auth_utils import verify_token
 
router = APIRouter(prefix="/triggers", tags=["triggers"])
 
@router.post("/", response_model=TriggerResponse)
def create_trigger(request: TriggerCreate, db: Session = Depends(get_db), payload: dict = Depends(verify_token)):
    if payload.get("role") not in ["Admin", "Super Admin"]:
        raise HTTPException(status_code=403, detail="Not allowed")
 
    new_trigger = Trigger(**request.dict())
    db.add(new_trigger)
    db.commit()
    db.refresh(new_trigger)
    return new_trigger
 
@router.get("/", response_model=list[TriggerResponse])
def get_triggers(
    page: int = 1,
    pageSize: int = 10,
    category: str | None = None,
    priority: str | None = None,
    type: str | None = None,
    state: str | None = None,
    db: Session = Depends(get_db),
    payload: dict = Depends(verify_token)
):
    if payload.get("role") not in ["Admin", "Super Admin"]:
        raise HTTPException(status_code=403, detail="Not allowed")
 
    query = db.query(Trigger)
    if category:
        query = query.filter(Trigger.category == category)
    if priority:
        query = query.filter(Trigger.priority == priority)
    if type:
        query = query.filter(Trigger.type == type)
    if state:
        query = query.filter(Trigger.state == state)
 
    return query.offset((page - 1) * pageSize).limit(pageSize).all()
 
@router.put("/{trigger_id}", response_model=TriggerResponse)
def update_trigger(trigger_id: int, request: TriggerUpdate, db: Session = Depends(get_db), payload: dict = Depends(verify_token)):
    if payload.get("role") not in ["Admin", "Super Admin"]:
        raise HTTPException(status_code=403, detail="Not allowed")
 
    trigger = db.query(Trigger).filter(Trigger.id == trigger_id).first()
    if not trigger:
        raise HTTPException(status_code=404, detail="Trigger not found")
 
    for field, value in request.dict(exclude_unset=True).items():
        setattr(trigger, field, value)
 
    db.commit()
    db.refresh(trigger)
    return trigger