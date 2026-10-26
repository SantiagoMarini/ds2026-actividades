import express from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import categoriaRoutes from "./routes/categoria.routes";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";
import { FRONTEND_URL } from "./config/env";
import cors from "cors";

const app = express();

app.use(cors({ origin: [FRONTEND_URL] }));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/libros", libroRoutes);

app.use("/api/autores", autorRoutes);

app.use("/api/categorias", categoriaRoutes);

app.use((_req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

app.use(errorHandler);

export default app;
