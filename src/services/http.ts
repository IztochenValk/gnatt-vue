// src/services/http.ts
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

export type HttpMethod = 'GET'|'POST'|'PUT'|'DELETE'|'PATCH';
export type HttpOptions = {
  path: string;
  method?: HttpMethod;
  data?: any;              // body
  params?: Record<string, any>;
  headers?: Record<string, string>;
  auth?: boolean;          // si vrai, ajoute "Bearer <token>"
};

let _getToken: () => string | undefined = () => undefined;
export function bindTokenGetter(getter: () => string | undefined) { _getToken = getter; }

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Optionnel: intercepteur pour uniformiser les erreurs
api.interceptors.response.use(
  r => r,
  (err: AxiosError<any>) => {
    const status = err.response?.status;
    const payload = err.response?.data as any;
    const msg =
      payload?.error || payload?.message || err.message || 'Request failed';
    return Promise.reject(new Error(`HTTP ${status ?? 'ERR'} – ${msg}`));
  }
);

/**
 * Appel générique (équivalent à ton http<T> précédent)
 */
export async function http<T = unknown>(opts: HttpOptions): Promise<T> {
  const {
    path,
    method = 'GET',
    data,
    params,
    headers = {},
    auth = false
  } = opts;

  const cfg: AxiosRequestConfig = {
    url: path,
    method: method as Method,
    data,
    params,
    headers: { ...headers }
  };

  if (auth) {
    const t = _getToken?.();
    if (t) (cfg.headers as Record<string, string>)['Authorization'] = `Bearer ${t}`;
  }

  const res = await api.request<T>(cfg);
  return res.data;
}

// Petits helpers pratiques
export const get  = <T=unknown>(path: string, params?: any, o?: Partial<HttpOptions>) =>
  http<T>({ path, method: 'GET', params, ...o });

export const post = <T=unknown>(path: string, body?: any, o?: Partial<HttpOptions>) =>
  http<T>({ path, method: 'POST', data: body, ...o });

export const put  = <T=unknown>(path: string, body?: any, o?: Partial<HttpOptions>) =>
  http<T>({ path, method: 'PUT', data: body, ...o });

export const del  = <T=unknown>(path: string, o?: Partial<HttpOptions>) =>
  http<T>({ path, method: 'DELETE', ...o });
