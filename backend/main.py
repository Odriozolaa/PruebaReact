from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine 
from models import Base
from routers import users, grados, alumnos, salones, maestros, horarios


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permite que React acceda al backend
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Crear las tablas
Base.metadata.create_all(bind=engine)

# Incluir los routers
app.include_router(users.router, prefix="/users")
app.include_router(grados.router, prefix="/grados")
app.include_router(alumnos.router, prefix="/alumnos")
app.include_router(salones.router, prefix="/salones")
app.include_router(maestros.router, prefix="/maestros")
app.include_router(horarios.router, prefix="/horarios")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)