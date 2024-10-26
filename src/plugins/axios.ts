import axios, { AxiosInstance, AxiosResponse } from "axios";

const httpRequest: AxiosInstance = axios.create({
  //   baseURL: import.meta.env.VITE_API_URL,
  baseURL: "http://numbersapi.com",
});

httpRequest.interceptors.response.use(
  (response: AxiosResponse) => response.data
);

export default httpRequest;
