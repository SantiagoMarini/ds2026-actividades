import { useState } from 'react';
import { LibroCard } from '../components/LibroCard';
import { SearchBar } from '../components/SearchBar';
import { Fondo } from '../components/Fondo';
import { type Libro } from '../types/libro';
import { useFetch } from '../hooks/useFetch';

export function Catalogo() {
    const [terminoBuscado, setTerminoBuscado] = useState(''); 
    const [urlBusqueda, setUrlBusqueda] = useState(''); 

    const { data, loading, error } = useFetch<any>(urlBusqueda);

    const buscarLibros = (termino: string) => {
        if (!termino.trim()) {
            setTerminoBuscado(''); 
            setUrlBusqueda(''); 
            return;
        }

        setTerminoBuscado(termino); 
        setUrlBusqueda(`https://openlibrary.org/search.json?q=${encodeURIComponent(termino)}`);
    };

    // Mapeamos los datos recibidos de la API y los asignamos directamente al array a mostrar
    const librosAMostrar: Libro[] = data?.docs ? data.docs.slice(0, 10).map((libro: any) => {
        return {
            titulo: libro.title,
            autor: libro.author_name ? libro.author_name[0] : 'Autor desconocido',
            precio: 15000, 
            imagen: libro.cover_i 
                ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg` 
                : `https://picsum.photos/seed/${encodeURIComponent(libro.title)}/400/300`
        };
    }) : [];

    // Condición para saber si la búsqueda en la API volvió vacía
    const sinResultados = !loading && !error && terminoBuscado && librosAMostrar.length === 0;

    return (
        <Fondo>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center [text-shadow:3px_3px_0px_#000]">
                Catálogo de libros
            </h2>

            <SearchBar 
                etiqueta="Buscar en el catálogo" 
                placeholder="Título, autor, ISBN..." 
                onBuscar={buscarLibros} 
            />

            {loading && urlBusqueda && (
                <div className="flex flex-col justify-center items-center gap-4 mb-8">
                    {/* el spinner pero en tailwind */}
                    <div className="w-10 h-10 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin"></div>
                    
                    <span className="text-xl text-yellow-300 font-bold [text-shadow:2px_2px_0px_#000]">
                        Buscando en la biblioteca...
                    </span>
                </div>
            )}

            {error && (
                <div className="text-center text-xl text-red-500 font-bold mb-8 p-4 bg-black/50 border-2 border-red-500">
                    Ups, hubo un problema: {error}
                </div>
            )}

            {sinResultados && (
                <div className="text-center text-xl text-yellow-300 font-bold mb-8 [text-shadow:2px_2px_0px_#000]">
                    Sin resultados para "{terminoBuscado}".
                </div>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {librosAMostrar.map((libro) => (
                        <LibroCard key={libro.titulo} libro={libro} />
                    ))}
                </div>
            )}

        </Fondo>
    );
}