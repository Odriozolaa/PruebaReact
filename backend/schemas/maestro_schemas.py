from pydantic import BaseModel

class MaestroCreate(BaseModel):
    nombre: str
    materia: str

class MaestroResponse(BaseModel):
    id: int
    nombre: str
    materia: str

    class Config:
        from_attributes = True