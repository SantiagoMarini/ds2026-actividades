import logoImagen from '../assets/img/98074f77-8f7f-4e83-88d7-8d24922290c2-removebg-preview.png';
import plantas from '../assets/img/Header-background.png';
import { useState } from 'react';

//el componente que va a recibir el nombre de la pagina actual
export function Navbar({ pestañaActiva = 'Home' }) {
    const [menuAbierto, setMenu] = useState(false);

    return (
        <nav className="w-full flex flex-wrap items-center justify-between px-6 py-3 pb-20 bg-repeat"
            style={{ backgroundImage: `url(${plantas})` }}>
        
            <div className="flex items-center gap-3">
                <img 
                    src={logoImagen} 
                    alt="Logo Mending" 
                    className="w-20 h-auto object-contain"
                />
                <span className="text-4xl text-gray-800 translate-y-4">Mending</span>
            </div>

            <button 
                onClick={() => setMenu(!menuAbierto)}
                className="md:hidden flex justify-center items-center btn-minecraft w-12 h-10 p-1"
            >
                <span className="pb-2">{menuAbierto ? '✖' : '☰'}</span>
            </button>

            <div className={`${menuAbierto ? 'block' : 'hidden'} w-full md:block md:w-auto mt-4 md:mt-0`}>
                
                <ul className="flex flex-col md:flex-row items-stretch gap-2">
                    <li>
                        {/* Inyectamos las clases 'mt-1 pt-0' SOLO si pestañaActiva es 'el del parametro' */}
                        <a href="index.html" 
                        className={`btn-minecraft w-full md:w-auto flex-1 flex justify-center items-center px-4 ${pestañaActiva === 'Home' ? 'mt-1 pt-0' : ''}`}
                        style={pestañaActiva === 'Home' ? { backgroundImage: 'none', backgroundColor: '#3a971e' } : {}}
                        >
                            {/* en funcion de si la pagina esta actica se reacomoda el texto dependiendo del tamaño del boton*/}
                            <span className={`${pestañaActiva === 'Home' ? 'translate-y-1.5' : 'translate-y-1'}`}>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="catalogo.html" 
                        className={`btn-minecraft w-full md:w-auto flex-1 flex justify-center items-center px-4 ${pestañaActiva === 'Catalogo' ? 'mt-1 pt-0' : ''}`}
                        style={pestañaActiva === 'Catalogo' ? { backgroundImage: 'none', backgroundColor: '#3a971e' } : {}}
                        >
                            <span className={`${pestañaActiva === 'Home' ? 'translate-y-1.5' : 'translate-y-1'}`}>Catalogo</span>
                        </a>
                    </li>
                    <li>
                        <a href="sobre-nosotros.html" 
                        className={`btn-minecraft w-full md:w-auto flex-1 flex justify-center items-center px-4 ${pestañaActiva === 'Sobre nosotros' ? 'mt-1 pt-0' : ''}`}
                        style={pestañaActiva === 'Sobre nosotros' ? { backgroundImage: 'none', backgroundColor: '#3a971e' } : {}}
                        >
                            <span className={`${pestañaActiva === 'Home' ? 'translate-y-1.5' : 'translate-y-1'}`}>Sobre nosotros</span>
                        </a>
                    </li>
                    <li>
                        <a href="libros.html" 
                        className={`btn-minecraft w-full md:w-auto flex-1 flex justify-center items-center px-4 ${pestañaActiva === 'Libros' ? 'mt-1 pt-0' : ''}`}
                        style={pestañaActiva === 'Libros' ? { backgroundImage: 'none', backgroundColor: '#3a971e' } : {}}
                        >
                            <span className={`${pestañaActiva === 'Home' ? 'translate-y-1.5' : 'translate-y-1'}`}>Libros</span>
                        </a>
                    </li>
                </ul>
                
            </div>
        </nav>
    );
}