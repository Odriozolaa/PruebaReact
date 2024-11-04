from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import Salon # Cambiado
from database import get_db
from schemas.maestro_schemas import SalonCreate

router = APIRouter()

# Endpoints protegidos para salones
@router.post("/salones/", response_model=SalonCreate)
def create_salon(salon: SalonCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_salon = Salon(nombre=salon.nombre, capacidad=salon.capacidad)
    db.add(db_salon)
    db.commit()
    db.refresh(db_salon)
    return db_salon