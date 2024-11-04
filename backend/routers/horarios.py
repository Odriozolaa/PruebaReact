from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import Horario, User # Cambiado
from database import get_db
from datetime import datetime
from schemas.horario_schemas import HorarioCreate, HorarioResponse
from auth import get_current_user

router = APIRouter()

# Endpoints protegidos para horarios
@router.post("/", response_model=HorarioResponse)
def create_horario(horario: HorarioCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Convertir las horas a formato de tiempo para almacenarlas en la base de datos
    hora_inicio = datetime.strptime(horario.hora_inicio, "%H:%M").time()
    hora_fin = datetime.strptime(horario.hora_fin, "%H:%M").time()
    
    db_horario = Horario(
        dia=horario.dia,
        hora_inicio=hora_inicio,
        hora_fin=hora_fin,
        grado_id=horario.grado_id,
        maestro_id=horario.maestro_id
    )
    db.add(db_horario)
    db.commit()
    db.refresh(db_horario)

    # Retornar los tiempos en formato de cadena en la respuesta
    return HorarioResponse(
        dia=db_horario.dia,
        hora_inicio=db_horario.hora_inicio.strftime("%H:%M"),
        hora_fin=db_horario.hora_fin.strftime("%H:%M"),
        grado_id=db_horario.grado_id,
        maestro_id=db_horario.maestro_id
    )