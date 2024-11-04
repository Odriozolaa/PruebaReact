from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import Grado # Cambiado
from database import get_db
from schemas.grado_schemas import GradoCreate

router = APIRouter()

@router.post("/grados/", response_model=GradoCreate)
def create_grado(grado: GradoCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_grado = Grado(nombre=grado.nombre, cantidad_alumnos=grado.cantidad_alumnos)
    db.add(db_grado)
    db.commit()
    db.refresh(db_grado)
    return db_grado