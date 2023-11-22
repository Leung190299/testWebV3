import axios, { AxiosError, AxiosResponse } from 'axios';
const UnauthorizeStatusCode = 401;
const LoginScene = 'login';

export function onFullfilled(response: AxiosResponse) {
  return Promise.resolve(response);
}

export function onRejected(error: AxiosError) {
  if (error) {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
}