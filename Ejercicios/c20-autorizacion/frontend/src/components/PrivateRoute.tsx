import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, type Rol } from '../context/AuthContext';
import { Spinner } from './Spinner';

type PrivateRouteProps = {
    rol?: Rol;
};

export function PrivateRoute({ rol }: PrivateRouteProps) {
    const { cargando, estaAutenticado, tieneRol } = useAuth();
    const location = useLocation();

    if (cargando) return <Spinner />;
    if (!estaAutenticado) return <Navigate to="/login" replace state={{ desde: location }} />;
    if (rol && !tieneRol(rol)) return <Navigate to="/sin-permiso" replace />;

    return <Outlet />;
}
