import { useState } from 'react';
import { type Libro } from '../types/libro';
import corazonVacio from '../assets/img/301904d2-75b7-4c5e-9f54-e37125a99ef7.png';
import corazonLleno from '../assets/img/mc-heart-transparent-big.png';
import cartel from '../assets/img/LightGrassBackground.png';
import { Link } from 'react-router-dom';



interface LibroCardProps {
    //para no tener que crear muchas interfaces sobre libro, la card pide estrictamente lo que va a renderizar
    libro: Pick<Libro, 'titulo' | 'autor' | 'imagen'>;
}

export function LibroCard({libro}: LibroCardProps){
    const [meGusta, setMeGusta] = useState(false);
    return (
        <div className="flex flex-col border border-gray-200 rounded-lg shadow-sm h-full overflow-hidden">
            <img className="w-full h-55 object-cover" src={libro.imagen} alt={`portada de ${libro.titulo}`} />
            <div className="p-4 flex flex-col grow gap-2 bg-repeat-x bg-[length:auto_100%]"
    style={{ backgroundImage: `url(${cartel})` }}>
    
                <h2 className="pt-4 text-2xl font-bold text-white mb-4 [text-shadow:3px_3px_#000]">{libro.titulo}</h2>
                <p className="text-xl text-white [-webkit-text-stroke:0.5px_gray]">{libro.autor}</p>
                
                <div className="flex items-stretch gap-2 mt-auto">

                    <Link to={`/libros/${libro.titulo}`} className="btn-minecraft flex-1 flex justify-center items-center">
                        <span className="translate-y-1">Ver más</span>
                    </Link>

                    <button 
                        className="btn-minecraft w-14 flex justify-center items-center cursor-pointer"
                        onClick={() => setMeGusta(!meGusta)}
                    >
                        <img 
                            className="w-6 h-6 object-contain"
                            src={meGusta ? corazonLleno : corazonVacio} 
                            alt={meGusta ? "Quitar me gusta" : "Dar me gusta"} 
                        />
                    </button>

                </div>
            </div>
        </div>
    );
}