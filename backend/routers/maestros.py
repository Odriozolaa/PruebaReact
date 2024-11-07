from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import Maestro, User # Cambiado
from database import get_db
from schemas.maestro_schemas import MaestroCreate, MaestroResponse
from auth import get_current_user
from typing import List

router = APIRouter()

# Endpoints protegidos para maestros
@router.post("/", response_model=MaestroCreate)
def create_maestro(maestro: MaestroCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_maestro = Maestro(nombre=maestro.nombre, materia=maestro.materia)
    db.add(db_maestro)
    db.commit()
    db.refresh(db_maestro)
    return db_maestro

@router.get("/", response_model=List[MaestroResponse])
def get_maestros(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Obtiene todos los maestros.
    """
    maestros = db.query(Maestro).all()
    return maestros