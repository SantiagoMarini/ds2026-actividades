import { useState } from 'react';


interface Libro {
    titulo: string;
    texto: string;
    autor: string;
    precio: number;
    imagen: string;
}

interface LibroCardProps {
    //para no tener que crear muchas interfaces sobre libro, la card pide estrictamente lo que va a renderizar
    libro: Pick<Libro, 'titulo' | 'autor' | 'imagen'>;
}

export function LibroCard({libro}: LibroCardProps){
    const [meGusta, setMeGusta] = useState(false);
    return (
        <div className="flex flex-col border border-gray-200 rounded-lg shadow-sm h-full overflow-hidden bg-white">
            <img className="w-full h-[220px] object-cover" src={libro.imagen} alt={`portada de ${libro.titulo}`} />
            <div className="p-4 flex flex-col flex-grow gap-2" >
                <h2 className="text-lg font-bold text-gray-800">{libro.titulo}</h2>
                <p className="text-sm text-gray-600">{libro.autor}</p>
                <div className="mt-auto flex justify-between items-center w-full">
                    <a href="libro.html" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Ver más</a>
                    <button onClick={() => setMeGusta(!meGusta)} className="text-xl cursor-pointer">{meGusta ? '🩷' : '🩶'}</button>
                </div>
            </div>
        </div>
        );
}