from pydantic import BaseModel

class AlumnoCreate(BaseModel):
    nombre: str
    es_nuevo: bool
    restricciones_no_juntos: str = None
    problemas_comportamiento_con: str = None
    relaciones_romanticas_con: str = None
    grado_id: int
