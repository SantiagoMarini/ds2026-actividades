import { Link } from 'react-router-dom';
import { Fondo } from '../components/Fondo';

export function SinPermiso() {
    return (
        <Fondo>
            <div className="flex min-h-[60vh] items-center justify-center">
                <section className="w-full max-w-xl border-4 border-[#565656] bg-[#1b1b1b]/95 p-8 text-center text-white">
                    <p className="mb-3 text-6xl" aria-hidden="true">⛏</p>
                    <h2 className="mb-4 text-3xl">Acceso denegado</h2>
                    <p className="mb-8 text-yellow-100">Tu usuario no tiene permiso para entrar a esta sección.</p>
                    <Link to="/catalogo" className="btn-minecraft inline-flex px-6 py-3">
                        Volver al catálogo
                    </Link>
                </section>
            </div>
        </Fondo>
    );
}
