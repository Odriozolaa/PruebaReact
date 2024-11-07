from pydantic import BaseModel
from typing import List, Optional

class AlumnoCreate(BaseModel):
    nombre: str
    grado_id: int
    es_nuevo: Optional[bool] = False
    restricciones_no_juntos: Optional[List[int]] = []
    problemas_comportamiento_con: Optional[List[int]] = []
    relaciones_romanticas_con: Optional[List[int]] = []

class AlumnoResponse(BaseModel):
    id: int
    nombre: str
    grado_id: int
    es_nuevo: bool
    restricciones_no_juntos: List[int]  # Asegúrate de devolver IDs
    problemas_comportamiento_con: List[int]  # Devolver IDs
    relaciones_romanticas_con: List[int]  # Devolver IDs

    class Config:
        from_attributes = True

class AlumnoUpdate(BaseModel):
    restricciones_no_juntos: Optional[List[int]] = []
    problemas_comportamiento_con: Optional[List[int]] = []
    relaciones_romanticas_con: Optional[List[int]] = []

    class Config:
        from_attributes = True
