from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text, Time
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
class Grado(Base):
    __tablename__ = "grados"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, unique=True, index=True)
    cantidad_alumnos = Column(Integer)

    # Relación con alumnos
    alumnos = relationship("Alumno", back_populates="grado")


class Alumno(Base):
    __tablename__ = "alumnos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    grado_id = Column(Integer, ForeignKey("grados.id"))
    es_nuevo = Column(Boolean, default=False)
    restricciones_no_juntos = Column(Text, nullable=True)
    problemas_comportamiento_con = Column(Text, nullable=True)
    relaciones_romanticas_con = Column(Text, nullable=True)

    # Relación con grados
    grado = relationship("Grado", back_populates="alumnos")


class Salon(Base):
    __tablename__ = "salones"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, unique=True, index=True)
    capacidad = Column(Integer)


class Maestro(Base):
    __tablename__ = "maestros"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    materia = Column(String, index=True)


class Horario(Base):
    __tablename__ = "horarios"

    id = Column(Integer, primary_key=True, index=True)
    dia = Column(String, index=True)
    hora_inicio = Column(Time)
    hora_fin = Column(Time)
    grado_id = Column(Integer, ForeignKey("grados.id"))
    maestro_id = Column(Integer, ForeignKey("maestros.id"))

    # Relaciones opcionales si necesitas acceder a los objetos relacionados
    grado = relationship("Grado")
    maestro = relationship("Maestro")