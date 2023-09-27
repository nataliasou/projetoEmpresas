import axios from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';
import { Enviroment } from '../../../enviroment';
import Cookies from 'js-cookie';

const accessToken = Cookies.get('APP_ACCESS_TOKEN');
console.log('AccessToken:' + accessToken);
const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

const Api = axios.create({
    baseURL: Enviroment.URL_BASE,
    headers: headers,
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export { Api };