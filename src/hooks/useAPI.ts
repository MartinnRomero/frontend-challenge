import { useEffect, useState, useCallback } from 'react';
import { http } from '../lib/http/cliente';
import { env } from '../config/env';

export function useApi<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await http.get<T>(`${env.apiUrl}/${url}`);
      setData(res.data);
    } catch {
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!cancelled) await fetchData();
    })();

    return () => {
      cancelled = true;
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData, setData };
}

export function usePost<TResponse = unknown, TBody = unknown>(url: string) {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const post = useCallback(
    async (body: TBody) => {
      setLoading(true);
      setError(null);
      try {
        const res = await http.post<TResponse>(`${env.apiUrl}/${url}`, body);
        setData(res.data);
        return res.data;
      } catch (error) {
        console.log('error:', error);
        setError('Error al enviar la información');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [url],
  );

  return { data, loading, error, post };
}