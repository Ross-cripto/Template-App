# Etapa 1: Construcción
FROM node:20-alpine AS builder
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY ./client/package.json ./client/package-lock.json* ./

# Instala las dependencias
RUN npm install --silent

# Copia el resto del código fuente
COPY ./client ./

# Construye la aplicación
RUN npm run build

# Etapa 2: Imagen de producción
FROM nginx:stable-alpine

# Copia un archivo de configuración personalizado para Nginx
COPY ./docker/react/nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos generados en la etapa de construcción
COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]