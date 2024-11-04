from pydantic import BaseModel

class HorarioCreate(BaseModel):
    dia: str
    hora_inicio: str
    hora_fin: str
    grado_id: int
    maestro_id: int
    
    class Config:
        from_attributes = True

# Modelo de respuesta
class HorarioResponse(BaseModel):
    dia: str
    hora_inicio: str
    hora_fin: str
    grado_id: int
    maestro_id: int