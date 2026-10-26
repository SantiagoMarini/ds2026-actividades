import type { Autor } from "./autor";
import type { Categoria } from "./categoria";

export interface LibroBase {
    id: number;
    titulo: string;
    precio: number;
    imagen: string;
    disponible: boolean;
    autorId: number;
}

export interface Libro extends LibroBase {
    autor: Autor;
    categorias: Categoria[];
}

// Modelo de presentación compartido por tarjetas y detalle.
// La fuente de datos adapta aquí sus IDs, autor y descripción.
export interface LibroCardData {
    id: number;
    descripcion?: string;
    titulo: string;
    autor: Autor;
    precio: number;
    imagen: string;
}
