import { describe, it, expect, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authenticate, authorize } from "./auth.middleware";
import { JWT_SECRET } from "../config/env";

function mocks(req: Partial<Request> = {}) {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
  const next = vi.fn();
  return {
    req: req as Request,
    res: res as unknown as Response,
    next: next as unknown as NextFunction,
    status: res.status,
    json: res.json,
    nextFn: next,
  };
}

const conToken = (token: string): Partial<Request> => ({
  headers: { authorization: `Bearer ${token}` },
});

describe("authorize", () => {
  it("CLIENTE en ruta de ADMIN → 403 y no sigue", () => {
    const m = mocks({ usuario: { id: 2, rol: "CLIENTE" } });
    authorize("ADMIN")(m.req, m.res, m.next);
    expect(m.status).toHaveBeenCalledWith(403);
    expect(m.json).toHaveBeenCalledWith({ error: "No tenés permiso para esta operación" });
    expect(m.nextFn).not.toHaveBeenCalled();
  });

  it("ADMIN en ruta de ADMIN → next una vez", () => {
    const m = mocks({ usuario: { id: 1, rol: "ADMIN" } });
    authorize("ADMIN")(m.req, m.res, m.next);
    expect(m.nextFn).toHaveBeenCalledTimes(1);
    expect(m.status).not.toHaveBeenCalled();
  });

  it("sin req.usuario → 401 No autenticado", () => {
    const m = mocks();
    authorize("ADMIN")(m.req, m.res, m.next);
    expect(m.status).toHaveBeenCalledWith(401);
    expect(m.json).toHaveBeenCalledWith({ error: "No autenticado" });
    expect(m.nextFn).not.toHaveBeenCalled();
  });
});

describe("authenticate", () => {
  it("sin header → 401 Falta el token", () => {
    const m = mocks({ headers: {} });
    authenticate(m.req, m.res, m.next);
    expect(m.status).toHaveBeenCalledWith(401);
    expect(m.json).toHaveBeenCalledWith({ error: "Falta el token" });
    expect(m.nextFn).not.toHaveBeenCalled();
  });

  it("token válido → next y req.usuario con id/rol", () => {
    const token = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });
    const m = mocks(conToken(token));
    authenticate(m.req, m.res, m.next);
    expect(m.nextFn).toHaveBeenCalledTimes(1);
    expect(m.status).not.toHaveBeenCalled();
    // el middleware guarda solo { id, rol }, sin iat/exp
    expect(m.req.usuario).toEqual({ id: 1, rol: "ADMIN" });
  });

  it("token vencido → 401 Token expirado", () => {
    const token = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "-1s" });
    const m = mocks(conToken(token));
    authenticate(m.req, m.res, m.next);
    expect(m.status).toHaveBeenCalledWith(401);
    expect(m.json).toHaveBeenCalledWith({ error: "Token expirado" });
    expect(m.nextFn).not.toHaveBeenCalled();
  });

  it("token firmado con otro secret → 401 Token inválido", () => {
    const token = jwt.sign({ id: 1, rol: "ADMIN" }, "otro-secret");
    const m = mocks(conToken(token));
    authenticate(m.req, m.res, m.next);
    expect(m.status).toHaveBeenCalledWith(401);
    expect(m.json).toHaveBeenCalledWith({ error: "Token inválido" });
    expect(m.nextFn).not.toHaveBeenCalled();
  });
});
