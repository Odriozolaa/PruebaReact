from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Alumno, User # Cambiado
from database import get_db
from schemas.alumno_schemas import AlumnoCreate, AlumnoResponse
from auth import get_current_user
from typing import List

router = APIRouter()

# Endpoints protegidos para alumnos
@router.post("/", response_model=AlumnoCreate)
def create_alumno(alumno: AlumnoCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_alumno = Alumno(
        nombre=alumno.nombre,
        es_nuevo=alumno.es_nuevo,
        grado_id=alumno.grado_id
    )
    db.add(db_alumno)
    db.commit()
    db.refresh(db_alumno)
# Agregar relaciones
    for restriccion_id in alumno.restricciones_no_juntos:
        restriccion = db.query(Alumno).get(restriccion_id)
        db_alumno.restricciones_no_juntos.append(restriccion)

    for problema_id in alumno.problemas_comportamiento_con:
        problema = db.query(Alumno).get(problema_id)
        db_alumno.problemas_comportamiento_con.append(problema)

    for relacion_id in alumno.relaciones_romanticas_con:
        relacion = db.query(Alumno).get(relacion_id)
        db_alumno.relaciones_romanticas_con.append(relacion)

    db.commit()
    return db_alumno

# Obtener alumnos por grado
@router.get("/grado/{grado_id}", response_model=List[AlumnoResponse])
def get_alumnos_by_grado(grado_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    alumnos = db.query(Alumno).filter(Alumno.grado_id == grado_id).all()
    return alumnos