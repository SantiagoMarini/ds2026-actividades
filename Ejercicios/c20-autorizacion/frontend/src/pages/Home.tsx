import { LibroCard } from '../components/LibroCard';
import { Hero } from '../components/Hero';
import minerales from '../assets/img/Background.webp';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

export function Home() {
    const { data: libros, loading, error } = useFetch<Libro[]>('/libros?disponible=true');
    return <div className="min-h-screen bg-size-[auto_100%] bg-repeat" style={{ backgroundImage: `url(${minerales})` }}>
        <Hero />
        <div className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-center text-2xl md:text-4xl font-bold text-white mb-10 [text-shadow:3px_3px_#000]">LIBROS DESTACADOS</h2>
            {loading && <p className="text-center text-yellow-300 text-xl">Cargando libros...</p>}
            {error && <p role="alert" className="text-center text-red-400 text-xl">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {libros?.slice(0, 6).map((libro) => <LibroCard key={libro.id} libro={libro} />)}
            </div>
        </div>
    </div>;
}
