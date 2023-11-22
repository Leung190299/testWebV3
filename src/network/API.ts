import axios from 'axios';
import * as AccessTokenInterceptor from './interceptors/accessToken';
import * as UnauthorizeInterceptor from './interceptors/unauthorize';


const getInstance = () => {

  const instance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 60000
  });
  instance.interceptors.request.use(AccessTokenInterceptor.addAccessToken, AccessTokenInterceptor.onRejected);
  instance.interceptors.response.use(UnauthorizeInterceptor.onFullfilled, UnauthorizeInterceptor.onRejected);
  instance.interceptors.response.use(({ data }) => data);
  // instance.defaults.transformResponse = [...(axios.defaults.transformResponse as []), (data) =>  data];
  return instance;
};

 const API = {
  instance: getInstance(),

};

export default API;
