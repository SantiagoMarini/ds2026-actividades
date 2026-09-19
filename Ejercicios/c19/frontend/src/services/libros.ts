import { librosDestacados } from '../data/librosDestacados';
import type { Libro, LibroCardData } from '../types/libro';

interface LibroOpenLibrary {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
}

export interface BusquedaOpenLibrary {
    docs: LibroOpenLibrary[];
}

interface ObraOpenLibrary {
    description?: string | { value?: string };
}

const PRECIO_TEMPORAL = 15000;
const resumenes = new Map<string, LibroCardData>();

function adaptarOpenLibrary(libro: LibroOpenLibrary): LibroCardData {
    const obraId = libro.key.replace(/^\/works\//, '');
    return {
        id: `ol-${obraId}`,
        titulo: libro.title,
        autor: libro.author_name?.join(', ') || 'Autor desconocido',
        precio: PRECIO_TEMPORAL,
        imagen: libro.cover_i
            ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
            : `https://picsum.photos/seed/${encodeURIComponent(libro.title)}/400/300`,
    };
}

export function adaptarResultados(data: BusquedaOpenLibrary | null): LibroCardData[] {
    return (data?.docs ?? [])
        .filter((libro) => /^(?:\/works\/)?OL\d+W$/.test(libro.key))
        .slice(0, 10)
        .map(adaptarOpenLibrary);
}

// El catálogo conserva sus datos para que el detalle muestre la misma ficha.
export function recordarLibros(libros: LibroCardData[]) {
    for (const libro of libros) resumenes.set(libro.id, libro);
}

// Adaptador para la futura integración: no realiza ninguna petición al backend.
// El backend actual no incluye descripción; se admite si luego se incorpora.
export function adaptarLibroBackend(libro: Libro & { descripcion?: string }): LibroCardData {
    return {
        id: String(libro.id),
        titulo: libro.titulo,
        autor: libro.autor.nombre,
        precio: libro.precio,
        imagen: libro.imagen,
        descripcion: libro.descripcion,
    };
}

async function leerJson<T>(url: string, signal?: AbortSignal): Promise<T | null> {
    const response = await fetch(url, { signal });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('No se pudo cargar el libro. Intentá nuevamente.');
    return response.json() as Promise<T>;
}

// Punto de reemplazo al conectar el backend: obtener la ficha por ID y adaptarla.
// Por ahora solo se resuelven las fuentes existentes: destacados y OpenLibrary.
export async function obtenerLibroPorId(id: string, signal?: AbortSignal): Promise<LibroCardData | null> {
    const local = librosDestacados.find((libro) => libro.id === id);
    if (local) return { ...local };

    if (!/^ol-OL\d+W$/.test(id)) return null;
    const obraId = id.slice(3);
    let resumen = resumenes.get(id);

    // Permite recargar o compartir el enlace sin depender del estado de navegación.
    if (!resumen) {
        const query = encodeURIComponent(`key:"/works/${obraId}"`);
        const resultado = await leerJson<BusquedaOpenLibrary>(
            `https://openlibrary.org/search.json?q=${query}`, signal,
        );
        resumen = adaptarResultados(resultado).find((libro) => libro.id === id);
        if (!resumen) return null;
    }

    const obra = await leerJson<ObraOpenLibrary>(
        `https://openlibrary.org/works/${obraId}.json`, signal,
    );
    if (!obra) return null;
    const descripcion = typeof obra.description === 'string'
        ? obra.description
        : obra.description?.value;
    return { ...resumen, descripcion: descripcion?.trim() || undefined };
}
