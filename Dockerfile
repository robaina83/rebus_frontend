# Usar Node.js para el entorno de desarrollo
FROM node:18

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos del frontend
COPY package.json package-lock.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto de desarrollo
EXPOSE 5173

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "dev"]
