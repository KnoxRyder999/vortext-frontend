import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const token = localStorage.getItem('token'); // get saved JWT

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your actual backend URL
  // baseURL: 'https://vortex-backend-production.up.railway.app/api', // Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${token}`
  },
});

// Optional auth interceptor
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

/**
 * GET request
 */
export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return apiClient
    .get<T>(url, config)
    .then((res: AxiosResponse<T>) => res.data)
    .catch((err) => {
      console.error(`GET ${url} failed`, err);
      throw err;
    });
}

/**
 * POST request
 */
export async function post<T, U = unknown>(url: string, data: U, config?: AxiosRequestConfig): Promise<T> {
  return apiClient
    .post<T>(url, data, config)
    .then((res: AxiosResponse<T>) => res.data)
    .catch((err) => {
      console.error(`POST ${url} failed`, err);
      throw err;
    });
}

/**
 * PUT request
 */
export async function put<T, U = unknown>(url: string, data: U, config?: AxiosRequestConfig): Promise<T> {
  return apiClient
    .put<T>(url, data, config)
    .then((res: AxiosResponse<T>) => res.data)
    .catch((err) => {
      console.error(`PUT ${url} failed`, err);
      throw err;
    });
}

/**
 * DELETE request
 */
export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return apiClient
    .delete<T>(url, config)
    .then((res: AxiosResponse<T>) => res.data)
    .catch((err) => {
      console.error(`DELETE ${url} failed`, err);
      throw err;
    });
}

export const api = {
  get,
  post,
  put,
  delete: del,
};
