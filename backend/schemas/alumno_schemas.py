from pydantic import BaseModel
from typing import List, Optional

class AlumnoCreate(BaseModel):
    nombre: str
    grado_id: int
    es_nuevo: Optional[bool] = False
    restricciones_no_juntos: Optional[List[int]] = []
    problemas_comportamiento_con: Optional[List[int]] = []
    relaciones_romanticas_con: Optional[List[int]] = []

class AlumnoResponse(AlumnoCreate):
    id: int

    class Config:
        from_attributes = True