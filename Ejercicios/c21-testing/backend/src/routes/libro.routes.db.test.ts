// ⚠ NECESITA DB: requiere "docker compose up -d db" y el seed cargado.
// Con la DB apagada estos tests fallan; el resto de la suite sigue verde.
// Solo lee datos: no crea nada, así que no hay limpieza que hacer.
import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../config/prisma";

afterAll(() => prisma.$disconnect());

describe("GET /api/libros", () => {
  it("→ 200 con el autor anidado", async () => {
    const res = await request(app).get("/api/libros");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toMatchObject({
      titulo: expect.any(String),
      precio: expect.any(Number),
      autor: { nombre: expect.any(String) },
    });
  });
});
