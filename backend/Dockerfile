# Utilizamos una imagen base de Python
FROM python:3.11-slim

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo de dependencias (requirements.txt) al contenedor
COPY ./requirements.txt /app/requirements.txt

# Instalamos las dependencias
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copiamos el código de la aplicación al contenedor
COPY . /app

# Exponer el puerto que Uvicorn usará para servir la aplicación
EXPOSE 8080

# Comando para correr la aplicación FastAPI con Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]