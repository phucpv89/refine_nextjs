import axios from "axios";

import { AxiosInstance } from "axios";

import nookies from "nookies";

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
    const auth = nookies.get()["auth"];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      config.headers['Authorization'] = `Bearer ${parsedUser.token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    console.log("interceptors.response", response);
    // const { data } = response;

    console.log(">>>>>>>>>>>>", !!response?.data?.data?.items)

    if (response?.data?.data?.items) {
      return {
        ...response,
        data: response?.data?.data?.items,
      };
    }
    if (response?.data?.data) {
      return {
        ...response,
        data: response?.data?.data,
      };
    }
    return {
      ...response,
    };
  },
  (error) => {
    const customError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  },
);

export default instance;
