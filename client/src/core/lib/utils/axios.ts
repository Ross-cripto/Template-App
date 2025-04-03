import axios from "axios";
import { getCookie } from "./cookie";

/*
    File to create an axios instance with interceptors to handle authentication.
    It sets the base URL for API requests and automatically includes the
    authentication token from a cookie in the request headers.
*/

const TOKEN_COOKIE = "auth_token"; 


const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5001/api/v1",
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = getCookie(TOKEN_COOKIE);
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error); 
    }
);
export default api;