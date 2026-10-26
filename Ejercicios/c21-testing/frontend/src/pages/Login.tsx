import { useState } from 'react';
import { Fondo } from '../components/Fondo';
import { useAuth } from '../context/AuthContext';
import { loginSchema } from '../schemas/loginSchema';
import { useLocation, useNavigate } from 'react-router-dom';

type EstadoNavegacion = {
    desde?: { pathname?: string };
};

export function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const resultado = loginSchema.safeParse({ email, password });
        if (!resultado.success) {
            const nuevosErrores: Record<string, string> = {};
            resultado.error.issues.forEach((issue) => { nuevosErrores[String(issue.path[0])] ??= issue.message; });
            setErrores(nuevosErrores);
            setMensaje('');
            return;
        }
        setCargando(true);
        setErrores({});
        try {
            await login(resultado.data);
            setPassword('');
            const desde = (location.state as EstadoNavegacion | null)?.desde?.pathname;
            navigate(desde ?? '/catalogo', { replace: true });
        } catch (cause: unknown) {
            setMensaje(cause instanceof Error ? cause.message : 'No se pudo iniciar sesión.');
        } finally {
            setCargando(false);
        }
    };

    return <Fondo><div className="flex justify-center items-center min-h-[60vh]">
        <form onSubmit={handleSubmit} noValidate className="bg-[#1b1b1b]/95 border-4 border-[#353535] p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Iniciar sesión</h2>
            {mensaje && <p role="status" className="mb-4 text-center text-yellow-200">{mensaje}</p>}
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-[#353535] text-white p-3 mb-1" />
            {errores.email && <p role="alert" className="text-red-400 mb-4">{errores.email}</p>}
            <label htmlFor="password" className="block text-white mb-2 mt-4">Contraseña</label>
            <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-[#353535] text-white p-3 mb-1" />
            {errores.password && <p role="alert" className="text-red-400 mb-4">{errores.password}</p>}
            <button disabled={cargando} type="submit" className="btn-minecraft w-full py-3 mt-6 disabled:opacity-60">{cargando ? 'Ingresando...' : 'Ingresar'}</button>
        </form>
    </div></Fondo>;
}
