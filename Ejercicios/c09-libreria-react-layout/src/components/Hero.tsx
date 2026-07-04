import libreria from '../assets/img/libreria.png'
import { Link } from 'react-router-dom';
export function Hero(){
    return(
        <section className="pt-20 pb-20 bg-repeat bg-[length:auto_100%] border-2"
            style={{ backgroundImage: `url(${libreria})` }}>
            <div className="max-w-3xl mx-auto text-center">
        
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 [text-shadow:3px_3px_#000]">
                    Bienvenido a Mending
                </h1>
                
                <p className="text-md md:text-lg text-[#cdcdcd] max-w-xl mx-auto mb-8 leading-relaxed">
                    Descubrí nuestra colección de libros cuidadosamente seleccionados para cada tipo de lector.
                </p>
                
                <Link to="/catalogo" className="btn-minecraft-green inline-block px-6 py-2">
                    <span className="inline-block translate-y-1">
                        Ver catálogo
                    </span>
                </Link>

            </div>
        </section>
    );
}