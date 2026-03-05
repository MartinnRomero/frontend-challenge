import axios from 'axios'
import { env } from '../../config/env'

export const http = axios.create({
  baseURL: env.apiUrl,
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});