import logoImagen from '../../assets/img/98074f77-8f7f-4e83-88d7-8d24922290c2-removebg-preview.png';
import plantas from '../../assets/img/Header-background.png';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
    const [menuAbierto, setMenu] = useState(false);
    const location = useLocation();

    return (
        <nav className="relative z-50 w-full flex flex-wrap items-center justify-between px-4 md:px-6 py-3 pb-20 bg-repeat"
            style={{ backgroundImage: `url(${plantas})` }}>
        
            <div className="w-full md:w-auto flex justify-between items-center">
                
                <div className="flex items-center gap-2 md:gap-3">
                    <img src={logoImagen} alt="Logo Mending" 
                        className="w-16 md:w-20 h-auto object-contain"/>
                    <span className="text-3xl md:text-4xl translate-y-3 md:translate-y-4 text-fuchsia-700 text-shadow-violet-600 text-shadow-2xs"> Mending </span>
                </div>

                <button 
                    onClick={() => setMenu(!menuAbierto)}
                    className="md:hidden flex justify-center items-center btn-minecraft w-12 h-10 p-1 shrink-0">
                    <span className="pb-2">{menuAbierto ? '✖' : '☰'}</span>
                </button>

            </div>

            <div className={`${menuAbierto ? 'block' : 'hidden'} absolute top-[75px] left-0 w-full bg-[#1b1b1b] border-b-4 border-[#353535] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] md:static md:block md:w-auto md:bg-transparent md:border-none md:p-0 md:shadow-none z-50`}>
                
                <ul className="flex flex-col md:flex-row items-stretch gap-3 md:gap-2">
                    <li>
                        <Link to="/" 
                        //tienen una condicion para saber si estan en la pagina actual, en caso de que si se le modifica el estilo para daele un efecto de seleccion 
                            className={`btn-minecraft w-full md:w-auto flex-1 flex justify-center items-center px-4 ${location.pathname === '/' ? 'mt-1 pt-0' : ''}`}
                            style={location.pathname === '/' ? { backgroundImage: 'none', backgroundColor: '#3a971e' } : {}}>
                            <span className={`${location.pathname === '/' ? 'translate-y-1.5' : 'translate-y-1'}`}>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/catalogo" 
                            className={`btn-minecraft w-full md:w-auto flex-1 flex justify-center items-center px-4 ${location.pathname === '/catalogo' ? 'mt-1 pt-0' : ''}`}
                            style={location.pathname === '/catalogo' ? { backgroundImage: 'none', backgroundColor: '#3a971e' } : {}}>
                            <span className={`${location.pathname === '/catalogo' ? 'translate-y-1.5' : 'translate-y-1'}`}>Catalogo</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/contacto" 
                            className={`btn-minecraft w-full md:w-auto flex-1 flex justify-center items-center px-4 ${location.pathname === '/sobre-nosotros' ? 'mt-1 pt-0' : ''}`}
                            style={location.pathname === '/contacto' ? { backgroundImage: 'none', backgroundColor: '#3a971e' } : {}}>
                            <span className={`${location.pathname === '/contacto' ? 'translate-y-1.5' : 'translate-y-1'}`}>Sobre nosotros</span>
                        </Link>
                    </li>
                </ul>
                
            </div>
        </nav>
    );
}