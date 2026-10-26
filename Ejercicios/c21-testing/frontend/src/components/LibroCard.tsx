import { useState } from 'react';
import type { LibroCardData } from '../types/libro';
import corazonLleno from '../assets/img/mc-heart-transparent-big.png';
import cartel from '../assets/img/LightGrassBackground.png';
import portadaVacia from '../assets/img/vacio.jpg';
import { Link } from 'react-router-dom';
import { formatearPrecio } from '../utils/formatearPrecio';



interface LibroCardProps {
    //para no tener que crear muchas interfaces sobre libro, la card pide estrictamente lo que va a renderizar
    libro: Pick<LibroCardData, 'id' | 'titulo' | 'autor' | 'imagen' | 'precio'>;
}

export function LibroCard({libro}: LibroCardProps){
    const [meGusta, setMeGusta] = useState(false);

    return (
        <article className="flex flex-col border-2 border-[#353535] shadow-lg h-full overflow-hidden bg-black/40">
            <div className="h-64 bg-black/60 p-3 flex items-center justify-center">
                <img
                    className="w-full h-full object-contain"
                    src={libro.imagen}
                    alt={`Portada de ${libro.titulo}`}
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = portadaVacia;
                    }}
                />
            </div>
            <div
                className="p-4 flex flex-col grow gap-2"
                style={{
                    backgroundImage: `url(${cartel})`,
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: 'auto 100%',
                    imageRendering: 'pixelated',
                }}
            >
    
                <h2 className="pt-4 text-2xl font-bold text-white mb-4 [text-shadow:3px_3px_#000]">{libro.titulo}</h2>
                <p className="text-xl text-white [-webkit-text-stroke:0.5px_gray]">{libro.autor.nombre}</p>
                <p className="text-lg text-yellow-300 [text-shadow:2px_2px_0_#000]">{formatearPrecio(libro.precio)}</p>
                
                <div className="flex items-stretch gap-2 mt-auto">

                    <Link to={`/libros/${encodeURIComponent(libro.id)}`} className="btn-minecraft flex-1 flex justify-center items-center">
                        <span className="translate-y-1">Ver más</span>
                    </Link>

                    <button 
                        type="button"
                        className="btn-minecraft w-14 flex justify-center items-center cursor-pointer"
                        onClick={() => setMeGusta((valorActual) => !valorActual)}
                        aria-pressed={meGusta}
                        aria-label={meGusta ? 'Quitar me gusta' : 'Dar me gusta'}
                        title={meGusta ? 'Quitar me gusta' : 'Dar me gusta'}
                    >
                        <img 
                            className={`w-7 h-7 object-contain transition-all ${meGusta ? '' : 'grayscale opacity-45'}`}
                            src={corazonLleno}
                            alt=""
                            aria-hidden="true"
                        />
                    </button>

                </div>
            </div>
        </article>
    );
}
