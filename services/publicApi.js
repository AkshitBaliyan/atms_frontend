import axios from "axios";

const BASE_URL = "http://atms.test";

const publicApi = axios.create({
  baseURL: `${BASE_URL}/api`, // Laravel API endpoint
});

export default publicApi;

