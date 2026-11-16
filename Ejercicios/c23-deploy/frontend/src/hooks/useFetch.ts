import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

export function useFetch<T>(url: string) {
    const [resultado, setResultado] = useState<{
        url: string;
        data: T | null;
        error: string | null;
    }>({ url: '', data: null, error: null });

    useEffect(() => {
        if (!url) return;
        const controller = new AbortController();

        const cargar = async () => {
            try {
                const data = await apiFetch<T>(url, { signal: controller.signal });
                if (!controller.signal.aborted) setResultado({ url, data, error: null });
            } catch (error) {
                if (!controller.signal.aborted) {
                    setResultado({
                        url, data: null,
                        error: error instanceof Error ? error.message : 'Error desconocido',
                    });
                }
            }
        };

        cargar();
        return () => controller.abort();
    }, [url]);

    const vigente = Boolean(url) && resultado.url === url;
    return {
        data: vigente ? resultado.data : null,
        loading: Boolean(url) && !vigente,
        error: vigente ? resultado.error : null,
    };
}
