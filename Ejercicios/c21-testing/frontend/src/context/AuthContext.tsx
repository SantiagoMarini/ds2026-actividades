import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from 'react';
import { AUTH_UNAUTHORIZED_EVENT, apiFetch } from '../services/api';
import { iniciarSesion, type LoginInput } from '../services/auth';
import { borrarToken, guardarToken, obtenerToken } from '../services/sesion';

export type Rol = 'ADMIN' | 'CLIENTE';

export type Usuario = {
    id: number;
    email: string;
    nombre: string;
    rol: Rol;
};

type AuthContextValue = {
    usuario: Usuario | null;
    cargando: boolean;
    login: (credenciales: LoginInput) => Promise<Usuario>;
    logout: () => void;
    estaAutenticado: boolean;
    tieneRol: (rol: Rol) => boolean;
};

// Exportado para que los tests puedan inyectar un value falso sin llamar a la API.
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cargando, setCargando] = useState(() => obtenerToken() !== null);
    const operacionActual = useRef(0);

    const logout = useCallback(() => {
        operacionActual.current += 1;
        borrarToken();
        setUsuario(null);
        setCargando(false);
    }, []);

    useEffect(() => {
        window.addEventListener(AUTH_UNAUTHORIZED_EVENT, logout);

        const idOperacion = ++operacionActual.current;
        const token = obtenerToken();

        if (token) {
            apiFetch<Usuario>('/auth/yo')
                .then((usuarioActual) => {
                    if (operacionActual.current === idOperacion) setUsuario(usuarioActual);
                })
                .catch(() => {
                    if (operacionActual.current === idOperacion) {
                        borrarToken();
                        setUsuario(null);
                    }
                })
                .finally(() => {
                    if (operacionActual.current === idOperacion) setCargando(false);
                });
        }

        return () => {
            window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, logout);
            if (operacionActual.current === idOperacion) operacionActual.current += 1;
        };
    }, [logout]);

    const login = useCallback(async (credenciales: LoginInput) => {
        const idOperacion = ++operacionActual.current;
        setCargando(true);

        try {
            const sesion = await iniciarSesion(credenciales);
            if (operacionActual.current !== idOperacion) {
                throw new Error('El inicio de sesión fue cancelado.');
            }
            guardarToken(sesion.token);
            setUsuario(sesion.usuario);
            return sesion.usuario;
        } finally {
            if (operacionActual.current === idOperacion) setCargando(false);
        }
    }, []);

    const tieneRol = useCallback((rol: Rol) => usuario?.rol === rol, [usuario]);
    const valor = useMemo<AuthContextValue>(() => ({
        usuario,
        cargando,
        login,
        logout,
        estaAutenticado: usuario !== null,
        tieneRol,
    }), [usuario, cargando, login, logout, tieneRol]);

    return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

// El hook se exporta junto al provider para mantener una única definición del contexto.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const contexto = useContext(AuthContext);
    if (!contexto) throw new Error('useAuth debe usarse dentro de un AuthProvider.');
    return contexto;
}
