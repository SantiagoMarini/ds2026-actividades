// Sin DB: estos requests cortan antes de llegar a Prisma (en authenticate,
// authorize, validate o el handler 404), así que no necesitan la base corriendo.
import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";

const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });
const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });

describe("POST /api/libros", () => {
  it("sin token → 401 Falta el token", async () => {
    const res = await request(app).post("/api/libros").send({});
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Falta el token" });
  });

  it("con token de CLIENTE → 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send({});
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ error: "No tenés permiso para esta operación" });
  });

  it("ADMIN con precio negativo → 400 (no 403) con el detalle de precio", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ precio: -5 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Datos inválidos");
    expect(res.body.detalles).toContainEqual({ campo: "precio", mensaje: "El precio debe ser mayor a 0" });
  });

  it("token adulterado → 401 Token inválido", async () => {
    const [header, payload, firma] = tokenCliente.split(".");
    // cambio el payload a ADMIN pero mantengo la firma original
    const payloadFalso = Buffer.from(JSON.stringify({ id: 2, rol: "ADMIN" })).toString("base64url");
    expect(payloadFalso).not.toBe(payload);
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${header}.${payloadFalso}.${firma}`)
      .send({});
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Token inválido" });
  });
});

describe("DELETE /api/libros/:id", () => {
  it("con token de CLIENTE → 403", async () => {
    const res = await request(app)
      .delete("/api/libros/1")
      .set("Authorization", `Bearer ${tokenCliente}`);
    expect(res.status).toBe(403);
  });
});

describe("ruta inexistente", () => {
  it("GET /api/no-existe → 404 Ruta no encontrada", async () => {
    const res = await request(app).get("/api/no-existe");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Ruta no encontrada" });
  });
});
