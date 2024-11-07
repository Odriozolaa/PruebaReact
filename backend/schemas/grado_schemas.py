from pydantic import BaseModel

class GradoCreate(BaseModel):
    id: int
    nombre: str
    cantidad_alumnos: int

    class Config:
        from_attributes = True