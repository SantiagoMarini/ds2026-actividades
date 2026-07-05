import { useState } from 'react';
import { LibroCard } from '../components/LibroCard';
import { SearchBar } from '../components/SearchBar';
import { Fondo } from '../components/Fondo';
import { type Libro } from '../types/libro';

interface CatalogoProps {
    librosPropios?: Libro[];
}

//Recibe libros que le damos de alta nosotros para que los una a los de la API
export function Catalogo({ librosPropios = [] }: CatalogoProps) {
    const [libros, setLibros] = useState<Libro[]>([]);
    const [mensaje, setMensaje] = useState(''); 
    // Nuevo estado para guardar qué estamos buscando y filtrar los locales
    const [terminoBuscado, setTerminoBuscado] = useState(''); 

    const buscarLibros = async (termino: string) => {
        if (!termino.trim()) {
            setMensaje('El campo de búsqueda no puede estar vacío.');
            setLibros([]);
            setTerminoBuscado(''); // Limpiamos la búsqueda local
            return;
        }

        setMensaje('Buscando...');
        setLibros([]); 
        setTerminoBuscado(termino); // Guardamos la palabra para filtrar librosPropios

        try {
            const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(termino)}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            const primerosDiez = data.docs.slice(0, 10);

            // Verificamos si hay alguna coincidencia en los libros creados localmente
            const hayLocales = librosPropios.some(libro => 
                libro.titulo.toLowerCase().includes(termino.toLowerCase()) || 
                libro.autor.toLowerCase().includes(termino.toLowerCase())
            );

            // Si no hay resultados ni en la API ni en los locales, tiramos el mensaje
            if (primerosDiez.length === 0 && !hayLocales) {
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

    // Filtramos los libros propios basándonos en el término de búsqueda actual
    const librosPropiosFiltrados = terminoBuscado
        ? librosPropios.filter(libro => 
            libro.titulo.toLowerCase().includes(terminoBuscado.toLowerCase()) ||
            libro.autor.toLowerCase().includes(terminoBuscado.toLowerCase())
          )
        : librosPropios;

    // Unimos los libros propios (siempre visibles o filtrados) con los buscados en la API
    const librosAMostrar = [...librosPropiosFiltrados, ...libros];

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

            {mensaje && (
                <div className="text-center text-xl text-yellow-300 font-bold mb-8 [text-shadow:2px_2px_0px_#000]">
                    {mensaje}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {librosAMostrar.map((libro) => (
                    <LibroCard key={libro.titulo} libro={libro} />
                ))}
            </div>

        </Fondo>
    );
}