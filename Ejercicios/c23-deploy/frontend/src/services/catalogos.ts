import { apiFetch } from './api';
import type { Autor } from '../types/autor';
import type { Categoria } from '../types/categoria';

export const obtenerAutores = (signal?: AbortSignal) => apiFetch<Autor[]>('/autores', { signal });
export const obtenerCategorias = (signal?: AbortSignal) => apiFetch<Categoria[]>('/categorias', { signal });
