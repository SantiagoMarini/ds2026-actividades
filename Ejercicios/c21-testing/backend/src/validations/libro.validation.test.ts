import { describe, it, expect } from "vitest";
import { libroCreateSchema, idParamSchema } from "./libro.validation";

const libroValido = {
  titulo: "Rayuela",
  precio: 16000,
  imagen: "https://ejemplo.test/rayuela.jpg",
  autorId: 104,
};

describe("libroCreateSchema", () => {
  it("acepta un libro válido", () => {
    const r = libroCreateSchema.safeParse(libroValido);
    expect(r.success).toBe(true);
  });

  it("rechaza precio negativo", () => {
    const r = libroCreateSchema.safeParse({ ...libroValido, precio: -5 });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues[0].path).toEqual(["precio"]);
      expect(r.error.issues[0].message).toBe("El precio debe ser mayor a 0");
    }
  });

  it("recorta los espacios del título", () => {
    const r = libroCreateSchema.safeParse({ ...libroValido, titulo: "   Rayuela  " });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.titulo).toBe("Rayuela");
  });
});

describe("idParamSchema", () => {
  it("convierte el id de string a número", () => {
    const r = idParamSchema.safeParse({ id: "42" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.id).toBe(42);
  });

  it("rechaza un id que no es número", () => {
    const r = idParamSchema.safeParse({ id: "abc" });
    expect(r.success).toBe(false);
  });
});
