import type { LibroBase } from "./libro";

export interface Autor {
    id: number;
    nombre: string;
    nacionalidad: string;
}

export interface AutorConLibros extends Autor {
    libros: LibroBase[];
}
