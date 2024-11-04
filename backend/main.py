from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from models import User, Grado, Alumno, Salon, Maestro, Horario  # Cambiado
from database import get_db, engine 
from typing import Optional # Cambiado
import bcrypt  # Importa bcrypt para hashear las contraseñas
from jose import JWTError, jwt
from datetime import datetime, timedelta, time
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permite que React acceda al backend
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Crear las tablas
User.metadata.create_all(bind=engine)

# Configuraciones para JWT
SECRET_KEY = "Jbrasil#174."  # Cambia esto por una clave secreta fuerte
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

bearer_scheme = HTTPBearer()

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class GradoCreate(BaseModel):
    nombre: str
    cantidad_alumnos: int

class AlumnoCreate(BaseModel):
    nombre: str
    es_nuevo: bool
    restricciones_no_juntos: str = None
    problemas_comportamiento_con: str = None
    relaciones_romanticas_con: str = None
    grado_id: int

class SalonCreate(BaseModel):
    nombre: str
    capacidad: int

class MaestroCreate(BaseModel):
    nombre: str
    materia: str

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

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: HTTPAuthorizationCredentials = Depends(bearer_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# Ruta protegida
@app.get("/users/me")
def read_users_me(current_user: User = Depends(get_current_user)):
    return {"email": current_user.email}

# Ruta de prueba
@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

# Crear la ruta para registrar un usuario
@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hashear la contraseña antes de guardarla
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8') 
    new_user = User(email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}

@app.post("/login", response_model=Token)
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    # Verificar si la contraseña ingresada coincide con la hasheada
    if not db_user or not bcrypt.checkpw(user.password.encode('utf-8'), db_user.hashed_password.encode('utf-8')):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": db_user.email}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/grados/", response_model=GradoCreate)
def create_grado(grado: GradoCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_grado = Grado(nombre=grado.nombre, cantidad_alumnos=grado.cantidad_alumnos)
    db.add(db_grado)
    db.commit()
    db.refresh(db_grado)
    return db_grado

# Endpoints protegidos para alumnos
@app.post("/alumnos/", response_model=AlumnoCreate)
def create_alumno(alumno: AlumnoCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_alumno = Alumno(
        nombre=alumno.nombre,
        es_nuevo=alumno.es_nuevo,
        restricciones_no_juntos=alumno.restricciones_no_juntos,
        problemas_comportamiento_con=alumno.problemas_comportamiento_con,
        relaciones_romanticas_con=alumno.relaciones_romanticas_con,
        grado_id=alumno.grado_id
    )
    db.add(db_alumno)
    db.commit()
    db.refresh(db_alumno)
    return db_alumno

# Endpoints protegidos para salones
@app.post("/salones/", response_model=SalonCreate)
def create_salon(salon: SalonCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_salon = Salon(nombre=salon.nombre, capacidad=salon.capacidad)
    db.add(db_salon)
    db.commit()
    db.refresh(db_salon)
    return db_salon

# Endpoints protegidos para maestros
@app.post("/maestros/", response_model=MaestroCreate)
def create_maestro(maestro: MaestroCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_maestro = Maestro(nombre=maestro.nombre, materia=maestro.materia)
    db.add(db_maestro)
    db.commit()
    db.refresh(db_maestro)
    return db_maestro

# Endpoints protegidos para horarios
@app.post("/horarios/", response_model=HorarioResponse)
def create_horario(horario: HorarioCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Convertir las horas a formato de tiempo para almacenarlas en la base de datos
    hora_inicio = datetime.strptime(horario.hora_inicio, "%H:%M").time()
    hora_fin = datetime.strptime(horario.hora_fin, "%H:%M").time()
    
    db_horario = Horario(
        dia=horario.dia,
        hora_inicio=hora_inicio,
        hora_fin=hora_fin,
        grado_id=horario.grado_id,
        maestro_id=horario.maestro_id
    )
    db.add(db_horario)
    db.commit()
    db.refresh(db_horario)

    # Retornar los tiempos en formato de cadena en la respuesta
    return HorarioResponse(
        dia=db_horario.dia,
        hora_inicio=db_horario.hora_inicio.strftime("%H:%M"),
        hora_fin=db_horario.hora_fin.strftime("%H:%M"),
        grado_id=db_horario.grado_id,
        maestro_id=db_horario.maestro_id
    )
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)