import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";
import type { LibroCreate, LibroUpdate } from "../validations/libro.validation";

export type LibroConAutor = Prisma.LibroGetPayload<{
  include: { autor: true, categorias: true }
}>;

export async function findAll(disponible?: boolean, categoriaId?: number): Promise<LibroConAutor[]> {
  return prisma.libro.findMany(
    { 
      where: { 
        disponible, //como es bool no hace falta hacer la comparacion
        categorias: categoriaId !== undefined ? { 
        //si existe categoria id, busca alguna categoria que tenga el mismo id
            some: {id: categoriaId}
          } : undefined
       }, 
      include: { autor: true, categorias: true },
      orderBy: { id: "asc" },
    }
  );
}



export type LibroDetalle = Prisma.LibroGetPayload<{ 
  include: { autor: true, categorias: true } 
}>;

export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique(
    { 
      where: { id }, 
      include: { autor: true, categorias: true }
    }
  );
}

export async function create(datos: LibroCreate): Promise<LibroDetalle> {
  const { categoriaIds, ...libro } = datos;
  return prisma.libro.create({
    data: {
      ...libro,
      categorias: { connect: (categoriaIds ?? []).map((id) => ({ id })) },
    },
    include: { autor: true, categorias: true },
  });
}

export async function update(id: number, datos: LibroUpdate): Promise<LibroDetalle | null> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return null;
  const { categoriaIds, ...libro } = datos;
  return prisma.libro.update({
    where: { id },
    data: {
      ...libro,
      categorias: categoriaIds === undefined
        ? undefined
        : { set: categoriaIds.map((categoriaId) => ({ id: categoriaId })) },
    },
    include: { autor: true, categorias: true },
  });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return false;                     
  await prisma.libro.delete({ where: { id } });  
  return true;

}
