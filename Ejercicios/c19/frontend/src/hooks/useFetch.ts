import { useState, useEffect } from 'react';

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
                const res = await fetch(url, { signal: controller.signal });
                if (!res.ok) throw new Error('Error al cargar los datos');
                const data: T = await res.json();
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
