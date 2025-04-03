FROM python:3.9-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential gcc curl \
 && rm -rf /var/lib/apt/lists/*
 
WORKDIR /app

COPY ./server/.env .env 

# Copiamos solo el archivo de requerimientos que se encuentra en la carpeta "server"
COPY ./server/requirements.txt .
RUN pip install --upgrade pip && \
    pip install --prefix=/install -r requirements.txt

FROM python:3.9-slim


ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    FLASK_APP=app.py \
    FLASK_RUN_HOST=0.0.0.0

WORKDIR /app

COPY --from=builder /install /usr/local

COPY ./server/ .

EXPOSE 5000

CMD gunicorn --bind 0.0.0.0:5000 app:app
