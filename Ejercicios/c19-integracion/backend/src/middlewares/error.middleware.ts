import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client" ;
import { Request, Response, NextFunction } from "express";

export const errorHandler = ( err: unknown, _req: Request, res: Response , _next: NextFunction ) => {
    if (err instanceof ZodError ) {
        return res.status(400).json({
            error: "Datos inválidos" ,
            detalles: err.issues.map(i => ({ campo: i.path.join("."), mensaje: i.message})),
        });
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError ) {
        if (err.code === "P2002") return res.status(409).json({ error: "Ya existe un registro con ese valor" });
        if (err.code === "P2025") return res.status(404).json({ error: "No encontrado" });
        if (err.code === "P2003") return res.status(409).json({ error: "Hay registros relacionados" });
    }
    if (typeof err === "object" && err !== null && ("status" in err || "statusCode" in err)) {
        const httpErr = err as { status?: number; statusCode?: number; message?: string };
        const status = httpErr.status ?? httpErr.statusCode;
        if (typeof status === "number" && status >= 400 && status < 500) {
            return res.status(status).json({ error: httpErr.message ?? "Petición inválida" });
        }
    }
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });}