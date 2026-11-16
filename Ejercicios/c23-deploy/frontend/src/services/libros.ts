import { apiFetch } from './api';
import type { Libro } from '../types/libro';

export type LibroInput = {
    titulo: string;
    precio: number;
    imagen: string;
    disponible: boolean;
    autorId: number;
    categoriaIds: number[];
};

export const obtenerLibros = (signal?: AbortSignal) => apiFetch<Libro[]>('/libros', { signal });
export const obtenerLibroPorId = (id: number, signal?: AbortSignal) => apiFetch<Libro>(`/libros/${id}`, { signal });
export const crearLibro = (libro: LibroInput) => apiFetch<Libro>('/libros', {
    method: 'POST',
    body: JSON.stringify(libro),
});
