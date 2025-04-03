
# 🚀 Prueba Técnica - AlamOps Consulting

Bienvenido a esta prueba técnica. El objetivo es evaluar tus habilidades desarrollando una aplicación FullStack con **ReactJS**, **Python (Flask)** y **MongoDB**. También valoramos el uso opcional de **Docker** para facilitar la instalación y despliegue.

---

## 🗂️ Estructura del Proyecto

```
.
├── client/              # Frontend en ReactJS
├── server/              # Backend en Python Flask
└── README.md            # Este archivo
```

---

## 🔙 Backend - Flask (Python)

### 📌 Requisitos

- Python 3.8 o superior
- pip
- MongoDB (local o remoto)

### ⚙️ Instalación

```bash
cd server
python -m venv venv
source venv/bin/activate      
pip install -r requirements.txt
```

### 🔌 Variables de entorno

Crea un archivo `.env` con las siguientes variables:

```
MONGO_URI=mongodb://test_user:test_pass@localhost:27017/test
FLASK_ENV=development
PORT=5000
```

### 🚀 Ejecución

```bash
python app.py
```

### 📡 Endpoints principales

| Método | Endpoint           | Descripción                           |
|--------|--------------------|---------------------------------------|
| POST   | `/users/google`    | Guarda usuario autenticado con Google |
| GET    | `/users`           | Lista todos los usuarios              |
| GET    | `/templates`       | Lista todas las plantillas            |

---

## 🔜 Frontend - ReactJS

### 📌 Requisitos

- Node.js 16+
- npm o yarn

### ⚙️ Instalación

```bash
cd client
npm install
```

### 🔐 Configuración de Google OAuth

Crea un archivo `.env` en la carpeta `client` con:

```
REACT_APP_GOOGLE_CLIENT_ID=<TU_CLIENT_ID>
REACT_APP_API_URL=http://localhost:5000
```

### 🚀 Ejecución

```bash
npm start
```

### ✅ Funcionalidades

- Login con Google
- Visualización del nombre e imagen del usuario autenticado
- Listado de plantillas desde la API
- (Opcional) Crear nuevas plantillas

---

## 🐳 Levantar MongoDB con Docker

Si no tienes MongoDB instalado, puedes levantarlo con este comando:

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=test_user \
  -e MONGO_INITDB_ROOT_PASSWORD=test_pass \
  -e MONGO_INITDB_DATABASE=test \
  mongo:6
```

Esto crea:
- Base de datos: `test`
- Usuario: `test_user`
- Contraseña: `test_pass`

> Conexión desde Flask: `mongodb://test_user:test_pass@localhost:27017/test`

---

## ✅ Buenas prácticas esperadas

- Separación clara entre lógica de negocio y rutas en Flask
- Componentes reutilizables en React
- Código limpio y comentado
- Manejo de errores
- Buen diseño de carpetas

---
## 🛢️ Exportar e Importar la Base de Datos MongoDB

📤 Exportar la base de datos (test)
```
mongodump --db test --username test_user --password test_pass --authenticationDatabase admin --out ./mongo_dump

```
📥 Importar en otro servidor (restaurar)
```
mongorestore --username test_user --password test_pass --authenticationDatabase admin --db test ./mongo_dump/test

```

---
## 📦 Entrega

Por favor, sube tu proyecto a GitHub (público o privado con acceso compartido) o envíalo comprimido a:

📩 **info@alamops.com**  
📌 Asunto: `Prueba Técnica - Oferta Dev`

---

¡Mucho éxito!  
El equipo de **AlamOps Consulting**
