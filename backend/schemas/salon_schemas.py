from pydantic import BaseModel

class SalonCreate(BaseModel):
    nombre: str
    capacidad: int