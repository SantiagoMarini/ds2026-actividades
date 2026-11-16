// ⚠ NECESITA DB: requiere "docker compose up -d db" y el seed cargado
// (npx prisma migrate deploy && npx prisma db seed). Con la DB apagada estos
// tests fallan; el resto de la suite sigue verde.
import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../config/prisma";

afterAll(() => prisma.$disconnect());

const admin = { email: "admin@libreria.test", password: "Admin1234" };

describe("POST /api/auth/login", () => {
  it("credenciales del seed → 200 con token y usuario sin hash", async () => {
    const res = await request(app).post("/api/auth/login").send(admin);
    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.usuario).toMatchObject({ email: admin.email, rol: "ADMIN" });
    expect(res.body.usuario).not.toHaveProperty("passwordHash");
  });

  it("password incorrecta → 401 Credenciales inválidas", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: admin.email, password: "Incorrecta1" });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Credenciales inválidas" });
  });

  it("mail inexistente → el mismo 401 y el mismo body", async () => {
    const malPassword = await request(app)
      .post("/api/auth/login")
      .send({ email: admin.email, password: "Incorrecta1" });
    const noExiste = await request(app)
      .post("/api/auth/login")
      .send({ email: "nadie@libreria.test", password: "Incorrecta1" });
    expect(noExiste.status).toBe(401);
    expect(noExiste.status).toBe(malPassword.status);
    expect(noExiste.body).toEqual(malPassword.body);
  });
});

describe("GET /api/auth/yo", () => {
  it("con el token del login → 200 con el usuario", async () => {
    const login = await request(app).post("/api/auth/login").send(admin);
    expect(login.status).toBe(200);
    const res = await request(app)
      .get("/api/auth/yo")
      .set("Authorization", `Bearer ${login.body.token}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ email: admin.email, rol: "ADMIN" });
    expect(res.body).not.toHaveProperty("passwordHash");
  });
});
