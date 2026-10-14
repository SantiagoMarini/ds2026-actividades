import { useState } from 'react';
import { LibroCard } from '../components/LibroCard';
import { SearchBar } from '../components/SearchBar';
import { Fondo } from '../components/Fondo';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';
import type { Categoria } from '../types/categoria';

export function Catalogo() {
    const [termino, setTermino] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const urlLibros = categoriaId ? `/libros?categoriaId=${categoriaId}` : '/libros';
    const { data: libros, loading, error } = useFetch<Libro[]>(urlLibros);
    const {
        data: categorias,
        loading: cargandoCategorias,
        error: errorCategorias,
    } = useFetch<Categoria[]>('/categorias');
    const filtro = termino.trim().toLocaleLowerCase('es');
    const librosAMostrar = (libros ?? []).filter((libro) => !filtro
        || libro.titulo.toLocaleLowerCase('es').includes(filtro)
        || libro.autor.nombre.toLocaleLowerCase('es').includes(filtro));

    return (
        <Fondo>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center [text-shadow:3px_3px_0px_#000]">
                Catálogo de libros
            </h2>

            <SearchBar etiqueta="Buscar en el catálogo" placeholder="Título o autor" onBuscar={setTermino} />

            <div className="w-full max-w-sm mx-auto mb-10">
                <label htmlFor="filtro-categoria" className="block text-white text-lg mb-2 [text-shadow:2px_2px_0px_#000]">
                    Filtrar por categoría
                </label>
                <select
                    id="filtro-categoria"
                    value={categoriaId}
                    onChange={(event) => setCategoriaId(event.target.value)}
                    disabled={cargandoCategorias}
                    className="w-full p-3 text-lg bg-black border-2 border-[#a0a0a0] text-white focus:outline-none focus:border-white disabled:opacity-60"
                >
                    <option value="">Todas las categorías</option>
                    {(categorias ?? []).map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
                {errorCategorias && (
                    <p role="alert" className="text-red-400 mt-2">
                        No se pudieron cargar las categorías: {errorCategorias}
                    </p>
                )}
            </div>

            {loading && <p className="text-center text-yellow-300 text-xl mb-8">Cargando catálogo...</p>}
            {error && <p role="alert" className="text-center text-red-400 text-xl mb-8">{error}</p>}
            {!loading && !error && librosAMostrar.length === 0 && (
                <p className="text-center text-yellow-300 text-xl mb-8">No se encontraron libros.</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {librosAMostrar.map((libro) => <LibroCard key={libro.id} libro={libro} />)}
            </div>
        </Fondo>
    );
}
