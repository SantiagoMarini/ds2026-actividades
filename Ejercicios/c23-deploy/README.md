# Librería — c23-deploy

Backend (Express + Prisma + JWT) y frontend (React + Vite) de la Librería, preparados para deploy en Render + Neon.

## Deploy

- **Frontend (producción):** https://front-libreria-chtp.onrender.com
- **Backend / API (producción):** https://libreria-api-marini.onrender.com/api

### Servicios

| Servicio | Plataforma | Root Directory | Config |
|---|---|---|---|
| Base de datos | Neon (Postgres) | — | Región `us-east-1` (AWS US East, N. Virginia) |
| Backend | Render · Web Service (Docker) | `Ejercicios/c23-deploy/backend` | `Dockerfile.prod` |
| Frontend | Render · Static Site | `Ejercicios/c23-deploy/frontend` | Build `npm install && npm run build`, publish `dist` |

### Variables de entorno

**Backend** (panel de Render, nunca en el repo):

| Variable | Qué es |
|---|---|
| `DATABASE_URL` | connection string directa de Neon |
| `JWT_SECRET` | generada con el botón "Generate" de Render |
| `FRONTEND_URL` | URL pública del Static Site, sin barra al final (para CORS) |

**Frontend** (variable de build de Render, queda embebida en el JS):

| Variable | Qué es |
|---|---|
| `VITE_API_URL` | URL pública del backend + `/api` |

Ver `backend/.env.example` y `frontend/.env.example` para desarrollo local.

### Migrar y cargar datos contra Neon

Las migraciones (`prisma/migrations`) se aplican solas al arrancar el backend en Render (`Dockerfile.prod` corre `prisma migrate deploy` antes de levantar el servidor).

El seed de datos de demo se corre a mano, una sola vez, desde una compu con Docker, apuntando a Neon (nunca se commitea una `DATABASE_URL` real):

```bash
cd backend
docker compose run --rm -e DATABASE_URL="<DATABASE_URL de Neon>" api npx prisma db seed
```

Es idempotente: correrlo de nuevo no duplica datos.
