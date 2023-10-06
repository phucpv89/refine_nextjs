import axios from "axios";

import { AxiosInstance } from "axios";

const TIMEOUT = 20000;
// axios.defaults.baseURL = "http://157.245.198.237:8080/api/v1";
axios.defaults.baseURL = "/api/v1";
axios.defaults.headers.common = {};



const instance = axios.create({
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    if (response?.status === 200) {
      return response.data;
    }
    return Promise.reject(response?.data ?? response);
  },
  function (error) {
    if (error.response) {
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  },
);

export default instance;
