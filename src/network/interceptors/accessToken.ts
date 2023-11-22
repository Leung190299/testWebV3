import { AxiosError, AxiosRequestConfig } from 'axios';

export function addAccessToken(config: AxiosRequestConfig): any {
  let accessToken: string='';
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('token')||'';
}
  if (accessToken) {
    const headers = { ...config.headers, Apikey: `${accessToken}` };
    config.headers = headers;
  }
  return config;
}

export function onRejected(error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error);
}
