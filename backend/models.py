from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text, Time, Table
from sqlalchemy.orm import relationship
from database import Base


restricciones_no_juntos = Table(
    'restricciones_no_juntos', Base.metadata,
    Column('alumno_id', Integer, ForeignKey('alumnos.id'), primary_key=True),
    Column('restriccion_id', Integer, ForeignKey('alumnos.id'), primary_key=True)
)

problemas_comportamiento_con = Table(
    'problemas_comportamiento_con', Base.metadata,
    Column('alumno_id', Integer, ForeignKey('alumnos.id'), primary_key=True),
    Column('problema_id', Integer, ForeignKey('alumnos.id'), primary_key=True)
)

relaciones_romanticas_con = Table(
    'relaciones_romanticas_con', Base.metadata,
    Column('alumno_id', Integer, ForeignKey('alumnos.id'), primary_key=True),
    Column('relacion_id', Integer, ForeignKey('alumnos.id'), primary_key=True)
)

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
    salones = relationship("Salon", back_populates="grado")


class Alumno(Base):
    __tablename__ = "alumnos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    grado_id = Column(Integer, ForeignKey("grados.id"))
    es_nuevo = Column(Boolean, default=False)

    # Columnas de texto para las relaciones
    restricciones_no_juntos_text = Column(String, nullable=True)
    problemas_comportamiento_con_text = Column(String, nullable=True)
    relaciones_romanticas_con_text = Column(String, nullable=True)

    # Relación con grados
    grado = relationship("Grado", back_populates="alumnos")

    # Relaciones muchos-a-muchos con otros alumnos
    restricciones_no_juntos = relationship(
        "Alumno",
        secondary=restricciones_no_juntos,
        primaryjoin=id == restricciones_no_juntos.c.alumno_id,
        secondaryjoin=id == restricciones_no_juntos.c.restriccion_id,
        backref="restricciones"
    )

    problemas_comportamiento_con = relationship(
        "Alumno",
        secondary=problemas_comportamiento_con,
        primaryjoin=id == problemas_comportamiento_con.c.alumno_id,
        secondaryjoin=id == problemas_comportamiento_con.c.problema_id,
        backref="problemas"
    )

    relaciones_romanticas_con = relationship(
        "Alumno",
        secondary=relaciones_romanticas_con,
        primaryjoin=id == relaciones_romanticas_con.c.alumno_id,
        secondaryjoin=id == relaciones_romanticas_con.c.relacion_id,
        backref="romances"
    )
    salon_id = Column(Integer, ForeignKey("salones.id"))
    salon = relationship("Salon", back_populates="alumnos")
    



class Salon(Base):
    __tablename__ = "salones"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    grado_id = Column(Integer, ForeignKey("grados.id"))
    capacidad = Column(Integer, nullable=False)
    # Relación con grados y alumnos
    grado = relationship("Grado", back_populates="salones")
    alumnos = relationship("Alumno", back_populates="salon")

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