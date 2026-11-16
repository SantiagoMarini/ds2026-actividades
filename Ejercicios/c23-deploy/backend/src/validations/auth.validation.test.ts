import { describe, it, expect } from "vitest";
import { loginSchema, registroSchema } from "./auth.validation";

describe("loginSchema", () => {
  it("normaliza el email (trim + minúsculas)", () => {
    const r = loginSchema.safeParse({ email: "  Admin@Libreria.TEST ", password: "x" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.email).toBe("admin@libreria.test");
  });
});

describe("registroSchema", () => {
  it("con contraseña débil acumula los 3 errores de password", () => {
    const r = registroSchema.safeParse({ nombre: "Ana", email: "ana@libreria.test", password: "abc" });
    expect(r.success).toBe(false);
    if (!r.success) {
      const mensajes = r.error.issues.map((i) => i.message);
      expect(mensajes).toEqual([
        "La contraseña necesita al menos 8 caracteres",
        "Necesita al menos una mayúscula",
        "Necesita al menos un número",
      ]);
      expect(r.error.issues.every((i) => i.path[0] === "password")).toBe(true);
    }
  });

  it("acepta una contraseña que cumple todas las reglas", () => {
    const r = registroSchema.safeParse({ nombre: "Ana", email: "ana@libreria.test", password: "Segura123" });
    expect(r.success).toBe(true);
  });
});
