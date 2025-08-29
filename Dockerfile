# Etapa 1: instalar dependencias con pnpm
FROM node:20-alpine AS deps
WORKDIR /app

# Habilitar corepack (gestiona pnpm/yarn)
RUN corepack enable

# Copiamos manifest y lockfile
COPY package.json pnpm-lock.yaml ./

# Instalamos dependencias (incluye dev, necesario para el build de Next)
RUN pnpm install --frozen-lockfile

# Etapa 2: build de la app
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable

# Copiamos node_modules desde la etapa deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Compilamos
RUN pnpm build

# Etapa 3: runner en producción
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable

# Copiamos el build resultante y node_modules
COPY --from=builder /app ./

EXPOSE 3002
CMD ["pnpm", "start", "--port", "3002"]
