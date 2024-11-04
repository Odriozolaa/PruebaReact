from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import Alumno # Cambiado
from database import get_db
from schemas.alumno_schemas import AlumnoCreate

router = APIRouter()

# Endpoints protegidos para alumnos
@router.post("/alumnos/", response_model=AlumnoCreate)
def create_alumno(alumno: AlumnoCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_alumno = Alumno(
        nombre=alumno.nombre,
        es_nuevo=alumno.es_nuevo,
        restricciones_no_juntos=alumno.restricciones_no_juntos,
        problemas_comportamiento_con=alumno.problemas_comportamiento_con,
        relaciones_romanticas_con=alumno.relaciones_romanticas_con,
        grado_id=alumno.grado_id
    )
    db.add(db_alumno)
    db.commit()
    db.refresh(db_alumno)
    return db_alumno