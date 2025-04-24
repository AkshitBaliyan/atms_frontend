import axios from 'axios';
import { decode } from 'punycode';

// const BASE_URL = "http://atms.test";
const BASE_URL = "http://localhost:8000";
// const BASE_URL = "http://127.0.0.1:8000";

const axiosClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true, // Send cookies!
  // withXSRFToken: true, // Send XSRF token!
});

const getCookie = (name) => {
  const cookie = document.cookie.split('; ').find(item => item.startsWith(`${name}=`));

  if(!cookie) return null;

  return decodeURIComponent(cookie.split('=')[1]);
}


// Before any request, set X-XSRF-TOKEN manually
axiosClient.interceptors.request.use(config => {
  const token = getCookie('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token); // Laravel requires decoded token
  }
  return config;
});

export const getCsrfToken = () => {
  return axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};

export default axiosClient;
