from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import Salon, User, Grado # Cambiado
from database import get_db
from schemas.salon_schemas import SalonCreate
from auth import get_current_user

router = APIRouter()

# Endpoints protegidos para salones
@router.post("/", response_model=SalonCreate)
def create_salon(salon: SalonCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_salon = Salon(nombre=salon.nombre, capacidad=salon.capacidad)
    db.add(db_salon)
    db.commit()
    db.refresh(db_salon)
    return db_salon

@router.post("/crear_salones")
def crear_salones_automaticos(max_alumnos_por_salon: int, db: Session = Depends(get_db)):
    grados = db.query(Grado).all()
    for grado in grados:
        num_alumnos = len(grado.alumnos)  # Asumiendo que hay una relación de alumnos en Grado
        num_salones = (num_alumnos // max_alumnos_por_salon) + (1 if num_alumnos % max_alumnos_por_salon != 0 else 0)
        
        # Crear salones con el límite de alumnos por salón
        for i in range(num_salones):
            nuevo_salon = Salon(
                nombre=f"{grado.nombre} - Salon {i + 1}",
                grado_id=grado.id,
                capacidad=max_alumnos_por_salon
            )
            db.add(nuevo_salon)
    
    db.commit()
    return {"message": "Salones creados automáticamente con el límite de alumnos."}
