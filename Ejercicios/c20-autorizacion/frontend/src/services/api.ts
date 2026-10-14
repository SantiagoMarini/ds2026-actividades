import { obtenerToken } from './sesion';

const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '');
export const AUTH_UNAUTHORIZED_EVENT = 'auth:unauthorized';

type ApiErrorBody = { error?: string; detalles?: Array<{ mensaje?: string }> };

export class ApiError extends Error {
    readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers = new Headers(options.headers);
    const token = obtenerToken();
    if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    if (token) headers.set('Authorization', `Bearer ${token}`);

    const response = await fetch(`${API_URL}${path}`, { ...options, headers });
    const body = response.status === 204
        ? null
        : await response.json().catch(() => null) as ApiErrorBody | null;
    if (!response.ok) {
        if (response.status === 401 && token) {
            window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
        }
        const detalle = body?.detalles?.map((item) => item.mensaje).filter(Boolean).join('. ');
        throw new ApiError(detalle || body?.error || `Error HTTP ${response.status}`, response.status);
    }
    return body as T;
}
