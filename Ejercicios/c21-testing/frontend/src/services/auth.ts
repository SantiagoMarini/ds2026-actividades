import { apiFetch } from './api';
import type { Usuario } from '../context/AuthContext';

export type LoginInput = { email: string; password: string };
export type LoginResponse = {
    token: string;
    usuario: Usuario;
};

export const iniciarSesion = (credenciales: LoginInput) => apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credenciales),
});
