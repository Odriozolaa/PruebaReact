from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Alumno, User # Cambiado
from database import get_db
from schemas.alumno_schemas import AlumnoCreate, AlumnoResponse, AlumnoUpdate
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

@router.put("/{alumno_id}", response_model=AlumnoResponse)
def update_alumno(
    alumno_id: int,
    alumno: AlumnoUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_alumno = db.query(Alumno).filter(Alumno.id == alumno_id).first()
    if not db_alumno:
        raise HTTPException(status_code=404, detail="Alumno no encontrado")

    # Actualizar las relaciones, solo agregando nuevas y manteniendo las existentes
    if alumno.restricciones_no_juntos:
        nuevas_restricciones = db.query(Alumno).filter(Alumno.id.in_(alumno.restricciones_no_juntos)).all()
        for restriccion in nuevas_restricciones:
            if restriccion not in db_alumno.restricciones_no_juntos:
                db_alumno.restricciones_no_juntos.append(restriccion)

    if alumno.problemas_comportamiento_con:
        nuevos_problemas = db.query(Alumno).filter(Alumno.id.in_(alumno.problemas_comportamiento_con)).all()
        for problema in nuevos_problemas:
            if problema not in db_alumno.problemas_comportamiento_con:
                db_alumno.problemas_comportamiento_con.append(problema)

    if alumno.relaciones_romanticas_con:
        nuevas_relaciones = db.query(Alumno).filter(Alumno.id.in_(alumno.relaciones_romanticas_con)).all()
        for relacion in nuevas_relaciones:
            if relacion not in db_alumno.relaciones_romanticas_con:
                db_alumno.relaciones_romanticas_con.append(relacion)

    # Actualizar los campos de texto con los nombres de los alumnos relacionados
    db_alumno.restricciones_no_juntos_text = ', '.join([str(a.id) for a in db_alumno.restricciones_no_juntos])
    db_alumno.problemas_comportamiento_con_text = ', '.join([str(a.id) for a in db_alumno.problemas_comportamiento_con])
    db_alumno.relaciones_romanticas_con_text = ', '.join([str(a.id) for a in db_alumno.relaciones_romanticas_con])

    db.commit()
    db.refresh(db_alumno)

    # Devolver los IDs en la respuesta
    return {
        "id": db_alumno.id,
        "nombre": db_alumno.nombre,
        "grado_id": db_alumno.grado_id,
        "es_nuevo": db_alumno.es_nuevo,
        "restricciones_no_juntos": [a.id for a in db_alumno.restricciones_no_juntos],
        "problemas_comportamiento_con": [a.id for a in db_alumno.problemas_comportamiento_con],
        "relaciones_romanticas_con": [a.id for a in db_alumno.relaciones_romanticas_con]
    }
@router.delete("/{alumno_id}/restricciones", response_model=AlumnoResponse)
def eliminar_restricciones(
    alumno_id: int,
    tipo_restriccion: str,
    ids_a_eliminar: List[int],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_alumno = db.query(Alumno).filter(Alumno.id == alumno_id).first()
    if not db_alumno:
        raise HTTPException(status_code=404, detail="Alumno no encontrado")

    if tipo_restriccion == "restricciones_no_juntos":
        db_alumno.restricciones_no_juntos = [
            a for a in db_alumno.restricciones_no_juntos if a.id not in ids_a_eliminar
        ]
        db_alumno.restricciones_no_juntos_text = ', '.join([str(a.id) for a in db_alumno.restricciones_no_juntos])
    elif tipo_restriccion == "problemas_comportamiento_con":
        db_alumno.problemas_comportamiento_con = [
            a for a in db_alumno.problemas_comportamiento_con if a.id not in ids_a_eliminar
        ]
        db_alumno.problemas_comportamiento_con_text = ', '.join([str(a.id) for a in db_alumno.problemas_comportamiento_con])
    elif tipo_restriccion == "relaciones_romanticas_con":
        db_alumno.relaciones_romanticas_con = [
            a for a in db_alumno.relaciones_romanticas_con if a.id not in ids_a_eliminar
        ]
        db_alumno.relaciones_romanticas_con_text = ', '.join([str(a.id) for a in db_alumno.relaciones_romanticas_con])
    else:
        raise HTTPException(status_code=400, detail="Tipo de restricción no válido")

    db.commit()
    db.refresh(db_alumno)

    return {
        "id": db_alumno.id,
        "nombre": db_alumno.nombre,
        "grado_id": db_alumno.grado_id,
        "es_nuevo": db_alumno.es_nuevo,
        "restricciones_no_juntos": [a.id for a in db_alumno.restricciones_no_juntos],
        "problemas_comportamiento_con": [a.id for a in db_alumno.problemas_comportamiento_con],
        "relaciones_romanticas_con": [a.id for a in db_alumno.relaciones_romanticas_con]
    }
