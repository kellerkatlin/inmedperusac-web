FROM node:20-alpine

WORKDIR /app

COPY package.json ./

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm install

COPY . .

# Agregamos el build aquí:
RUN npm run build

# Exponemos el puerto 3002 por default
EXPOSE 3002

# Levantamos el server de Next.js
CMD ["npx", "next", "start", "-p", "3002"]
