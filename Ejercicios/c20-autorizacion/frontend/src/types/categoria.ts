import type { LibroBase } from "./libro";

export interface Categoria {
    id: number;
    nombre: string;
}

export interface CategoriaConLibros extends Categoria {
    libros: LibroBase[];
}
