import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Fondo } from '../components/Fondo';

export function LibroDetalle() {

    const { id } = useParams();

    const [libro, setLibro] = useState<any>(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const obtenerDetalleLibro = async () => {
            setCargando(true);
            setError('');
            
            try {
                // Hacemos un fetch a OpenLibrary usando el ID (titulo) que llegó por la URL
                const url = `https://openlibrary.org/search.json?q=${id}`;
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();

                if (data.docs && data.docs.length > 0) {
                    const libroApi = data.docs[0];
                    setLibro({
                        titulo: libroApi.title,
                        autor: libroApi.author_name ? libroApi.author_name[0] : 'Autor desconocido',
                        descripcion: "OpenLibrary no siempre provee descripciones completas en este endpoint, pero aquí iría la sinopsis del libro recuperado de la API.",
                        precio: "$4.500", // La API no da precios, lo mantenemos estático
                        imagen: libroApi.cover_i 
                            ? `https://covers.openlibrary.org/b/id/${libroApi.cover_i}-L.jpg` 
                            : `https://picsum.photos/seed/${encodeURIComponent(libroApi.title)}/400/600`
                    });
                } else {
                    setError('No se encontraron detalles para este libro.');
                }
            } catch (error: any) {
                setError(`No se pudo conectar con Open Library: ${error.message}`);
            } finally {
                setCargando(false);
            }
        };

        obtenerDetalleLibro();
    }, [id]); 

    return (
        <Fondo>
            <div className="bg-[#1b1b1b]/90 border-4 border-[#353535] p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] max-w-5xl mx-auto min-h-[400px] flex items-center justify-center">
                
                {cargando && (
                    <div className="text-3xl text-yellow-300 font-bold [text-shadow:2px_2px_0px_#000] animate-pulse text-center">
                        Cargando información del libro...
                    </div>
                )}


                {!cargando && error && (
                    <div className="text-center">
                        <div className="text-2xl text-red-400 font-bold mb-6 [text-shadow:2px_2px_0px_#000]">
                            {error}
                        </div>
                        <Link to="/catalogo" className="btn-minecraft inline-block px-8 py-3">
                            <span className="translate-y-1">Volver al catálogo</span>
                        </Link>
                    </div>
                )}

                {!cargando && !error && libro && (
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 w-full">
                        
                        <div className="w-full md:w-5/12 flex justify-center shrink-0">
                            <img
                                src={libro.imagen}
                                alt={`Portada de ${libro.titulo}`}
                                className="w-full max-w-sm border-4 border-[#353535] shadow-[5px_5px_0px_rgba(0,0,0,1)] object-cover"
                            />
                        </div>

                        <div className="w-full md:w-7/12 text-white flex flex-col justify-center min-w-0">
                            
                            <h1 className="text-4xl md:text-5xl font-bold mb-2 [text-shadow:3px_3px_0px_#000] break-words">
                                {libro.titulo}
                            </h1>
                            
                            <p className="text-xl text-gray-400 font-bold mb-6 [text-shadow:1px_1px_0px_#000]">
                                {libro.autor}
                            </p>

                            <p className="text-lg leading-relaxed mb-8 [text-shadow:1px_1px_0px_#000] text-gray-200">
                                {libro.descripcion}
                            </p>

                            <p className="text-4xl text-yellow-300 font-bold mb-10 [text-shadow:3px_3px_0px_#000]">
                                {libro.precio}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button 
                                    className="btn-minecraft flex-1 md:flex-none flex justify-center items-center px-8 py-3"
                                    style={{ backgroundImage: 'none', backgroundColor: '#3a971e' }}
                                >
                                    <span className="translate-y-1 text-white">Comprar</span>
                                </button>
                                
                                <Link to="/catalogo" className="btn-minecraft flex-1 md:flex-none flex justify-center items-center px-8 py-3">
                                    <span className="translate-y-1">Volver al catálogo</span>
                                </Link>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </Fondo>
    );
}