import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

// lee backend/.env (expande ${POSTGRES_USER} etc. como Compose).
// Se usa el directorio de este archivo y no process.cwd() para que funcione
// aunque vitest se lance desde otra carpeta.
const env = loadEnv("test", import.meta.dirname, "");

export default defineConfig({
  test: {
    env: {
      // nunca el real: los tests firman sus propios tokens con este secret
      JWT_SECRET: "secreto-solo-para-tests",
      FRONTEND_URL: "http://localhost:5173",
      // los tests corren en el host, fuera de la red de Compose:
      // el servicio "db" se expone en localhost:5432 (ports: "5432:5432")
      DATABASE_URL: (env.DATABASE_URL ?? "").replace("@db:", "@localhost:"),
    },
  },
});
