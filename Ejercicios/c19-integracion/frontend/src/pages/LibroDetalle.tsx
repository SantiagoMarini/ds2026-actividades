import { useParams, Link } from 'react-router-dom';
import { Fondo } from '../components/Fondo';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

export function LibroDetalle() {
    const { id } = useParams();
    const libroId = Number(id);
    const idValido = Number.isInteger(libroId) && libroId > 0;
    const { data: libro, loading, error: errorApi } = useFetch<Libro>(idValido ? `/libros/${libroId}` : '');
    const error = idValido ? errorApi : 'El identificador del libro no es válido.';

    return (
        <Fondo>
            <div className="bg-[#1b1b1b]/90 border-4 border-[#353535] p-6 md:p-10 max-w-5xl mx-auto min-h-[400px] flex items-center justify-center">
                {loading && <p className="text-3xl text-yellow-300 font-bold">Cargando información del libro...</p>}
                {!loading && error && (
                    <div className="text-center">
                        <p className="text-2xl text-red-400 font-bold mb-6">{error}</p>
                        <Link to="/catalogo" className="btn-minecraft inline-block px-8 py-3">Volver al catálogo</Link>
                    </div>
                )}
                {!loading && !error && libro && (
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 w-full">
                        <img src={libro.imagen} alt={`Portada de ${libro.titulo}`} className="w-full max-w-sm border-4 border-[#353535] object-cover" />
                        <div className="w-full text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">{libro.titulo}</h1>
                            <p className="text-xl text-gray-400 font-bold mb-6">{libro.autor.nombre}</p>
                            {libro.categorias.length > 0 && (
                                <p className="text-gray-200 mb-6">Categorías: {libro.categorias.map((categoria) => categoria.nombre).join(', ')}</p>
                            )}
                            <p className="text-4xl text-yellow-300 font-bold mb-10">
                                {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(libro.precio)}
                            </p>
                            <Link to="/catalogo" className="btn-minecraft inline-flex px-8 py-3">Volver al catálogo</Link>
                        </div>
                    </div>
                )}
            </div>
        </Fondo>
    );
}
