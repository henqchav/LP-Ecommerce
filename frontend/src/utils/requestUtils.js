import axios_core from "axios";
const API_URL = "https://localhost/4567";


export const axiosConfig = {
  SERVER_NAME: API_URL,
  HEADERS: {
    "Content-Type": "application/json",
  },
};

export const createRequest = (timeout) => {
  return axios_core.create({
    baseURL: axiosConfig.SERVER_NAME,
    headers: axiosConfig.HEADERS,
    timeout,
  });
};

export const axios = axios_core.create({
	baseURL: axiosConfig.SERVER_NAME,
	headers: axiosConfig.HEADERS,
});