from sqlalchemy.orm import Session
from models import Grado

def inicializar_grados_predeterminados(db: Session):
    grados_predeterminados = [
        "Maternal", "1 Kinder", "2 Kinder", "3 Kinder",
        "1 Primaria", "2 Primaria", "3 Primaria", "4 Primaria", "5 Primaria", "6 Primaria",
        "7 Secundaria", "8 Secundaria", "9 Secundaria",
        "10 Preparatoria", "11 Preparatoria", "12 Preparatoria"
    ]
    
    for nombre_grado in grados_predeterminados:
        if not db.query(Grado).filter(Grado.nombre == nombre_grado).first():
            nuevo_grado = Grado(nombre=nombre_grado, cantidad_alumnos=0)
            db.add(nuevo_grado)
    
    db.commit()
