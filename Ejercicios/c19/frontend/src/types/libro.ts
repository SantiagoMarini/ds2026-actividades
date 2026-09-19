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
    categorias?: Categoria[];
}

// Modelo temporal usado por las pantallas que todavía consumen OpenLibrary
// o datos hardcodeados. Al conectar el backend, LibroCard podrá recibir Libro.
export interface LibroCardData {
    titulo: string;
    autor: string;
    precio: number;
    imagen: string;
}
