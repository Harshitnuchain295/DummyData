import axios from "axios";
import { GetUserCredentials, UpdateAccessToken } from "./HalperFunction";

axios.defaults.baseURL = "http://47.237.112.217:7002";

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});


  axiosInstance.interceptors.request.use(
    async (config) => {
      const tokenToUse = config.url.includes("user/") ? GetUserCredentials().access : null;
      if (tokenToUse) {
        config.headers.Authorization = `Bearer ${tokenToUse}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error); 
    }
  );


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const errorMessage = error.response.data?.error?.non_field_errors?.[0] || 
                           error.response.data?.message
      return Promise.reject(errorMessage);
    } else if (error.request) {
      // Request was made but no response was received
      return Promise.reject("No response from the server. Please try again.");
    } else {
      // Something happened in setting up the request
      return Promise.reject(error.message || "Unexpected error occurred.");
    }
  }
);



const refreshAccessToken = async (type) => {
  try {
    const token = type === "user" ? GetUserCredentials().refresh : null;
    if (type === "user") {
      // first hit the api 
      const res = await axiosInstance.post(`/user/token/refresh/`, { refresh: token });
      const { access } = res.data;
      UpdateAccessToken(access);
      return access;
    } else {
      console.log("No access token available for refresh.");
    }
  } catch (error) {
    console.log(error, "error");
    throw error; 
  }
};
