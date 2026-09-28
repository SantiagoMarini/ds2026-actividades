import { apiFetch } from './api';

export type LoginInput = { email: string; password: string };
export type LoginResponse = {
    token: string;
    usuario: { id: number; email: string; nombre: string; rol: 'ADMIN' | 'CLIENTE' };
};

export const iniciarSesion = (credenciales: LoginInput) => apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credenciales),
});
