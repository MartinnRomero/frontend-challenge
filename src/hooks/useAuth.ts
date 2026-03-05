import { useCallback } from 'react';
import { usePost } from './useAPI';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  access_token?: string;
  [key: string]: unknown;
}

export function useAuth() {
  const {
    data,
    loading,
    error,
    post,
  } = usePost<AuthResponse, AuthCredentials>('auth/login');

  const login = useCallback(
    (credentials: AuthCredentials) => post(credentials),
    [post],
  );

  return { data, loading, error, login };
}
