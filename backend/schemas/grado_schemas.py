from pydantic import BaseModel

class GradoCreate(BaseModel):
    nombre: str
    cantidad_alumnos: int