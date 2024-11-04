from pydantic import BaseModel

class MaestroCreate(BaseModel):
    nombre: str
    materia: str