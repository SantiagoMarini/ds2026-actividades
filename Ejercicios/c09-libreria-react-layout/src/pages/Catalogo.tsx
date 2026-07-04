import { useState } from 'react';
import { LibroCard } from '../components/LibroCard';
import { SearchBar } from '../components/SearchBar';
import { Fondo } from '../components/Fondo';
import { type Libro } from '../types/libro';

export function Catalogo() {
    const [libros, setLibros] = useState<Libro[]>([]);
    const [mensaje, setMensaje] = useState(''); 

    const buscarLibros = async (termino: string) => {
        if (!termino.trim()) {
            setMensaje('El campo de búsqueda no puede estar vacío.');
            setLibros([]);
            return;
        }

        setMensaje('Buscando...');
        setLibros([]); 

        try {
            const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(termino)}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            const primerosDiez = data.docs.slice(0, 10);

            if (primerosDiez.length === 0) {
                setMensaje(`Sin resultados para "${termino}".`);
                return;
            }

            const librosMapeados: Libro[] = primerosDiez.map((libro: any) => {
                return {
                    titulo: libro.title,
                    autor: libro.author_name ? libro.author_name[0] : 'Autor desconocido',
                    precio: 15000, 
                    imagen: libro.cover_i 
                        ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg` 
                        : `https://picsum.photos/seed/${encodeURIComponent(libro.title)}/400/300`
                };
            });

            setLibros(librosMapeados);
            setMensaje(''); 

        } catch (error: any) {
            setMensaje(`No se pudo conectar con Open Library: ${error.message}`);
        }
    };

    return (
        <Fondo>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center [text-shadow:3px_3px_0px_#000]">
                Catálogo de libros
            </h2>-

            <SearchBar 
                etiqueta="Buscar en el catálogo" 
                placeholder="Título, autor, ISBN..." 
                onBuscar={buscarLibros} 
            />

            {mensaje && (
                <div className="text-center text-xl text-yellow-300 font-bold mb-8 [text-shadow:2px_2px_0px_#000]">
                    {mensaje}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {libros.map((libro) => (
                    <LibroCard key={libro.titulo} libro={libro} />
                ))}
            </div>

        </Fondo>
    );
}