import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ContextType } from 'react';
import { AuthContext, type Usuario } from '../../context/AuthContext';
import { Header } from './Header';

type AuthValue = NonNullable<ContextType<typeof AuthContext>>;

// Value falso con el tipo real del contexto: no usa el AuthProvider real
// porque ese llamaría a /auth/yo.
function renderHeader(usuario: Usuario | null) {
    const auth: AuthValue = {
        usuario,
        cargando: false,
        login: vi.fn(),
        logout: vi.fn(),
        estaAutenticado: usuario !== null,
        tieneRol: (rol) => usuario?.rol === rol,
    };
    return render(
        <MemoryRouter>
            <AuthContext.Provider value={auth}>
                <Header />
            </AuthContext.Provider>
        </MemoryRouter>,
    );
}

describe('Header', () => {
    it('sin sesión muestra "Ingresar" y no "Nuevo libro"', () => {
        renderHeader(null);
        expect(screen.getByRole('link', { name: 'Ingresar' })).toBeInTheDocument();
        expect(screen.queryByText('Nuevo libro')).not.toBeInTheDocument();
    });

    it('CLIENTE: saluda por nombre y no ve "Nuevo libro"', () => {
        renderHeader({ id: 2, email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' });
        expect(screen.getByText('Hola, Cliente')).toBeInTheDocument();
        expect(screen.queryByText('Nuevo libro')).not.toBeInTheDocument();
        expect(screen.queryByText('Ingresar')).not.toBeInTheDocument();
    });

    it('ADMIN: ve el link "Nuevo libro"', () => {
        renderHeader({ id: 1, email: 'admin@libreria.test', nombre: 'Admin', rol: 'ADMIN' });
        expect(screen.getByRole('link', { name: 'Nuevo libro' })).toBeInTheDocument();
        expect(screen.getByText('Hola, Admin')).toBeInTheDocument();
    });
});
