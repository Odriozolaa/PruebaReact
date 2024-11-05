from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import Grado, User # Cambiado
from database import get_db
from schemas.grado_schemas import GradoCreate
from auth import get_current_user

router = APIRouter()

@router.post("/", response_model=GradoCreate)
def create_grado(grado: GradoCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_grado = Grado(nombre=grado.nombre, cantidad_alumnos=grado.cantidad_alumnos)
    db.add(db_grado)
    db.commit()
    db.refresh(db_grado)
    return db_grado

# Endpoint para obtener todos los grados
@router.get("/", response_model=list[GradoCreate])
def get_grados(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Grado).all()
