import { useState, useEffect } from 'react';

// <T> nos permite definir que tipo de dato esperamos recibir
export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const cargar = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const res = await fetch(url);
                if (!res.ok) throw new Error('Error al cargar los datos');
                
                const json = await res.json();
                setData(json);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        // Si la URL no está vacía, hacemos el fetch
        if (url) {
            cargar();
        }
    }, [url]);

    return { data, loading, error };
}