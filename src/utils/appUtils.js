import axios from "axios";

export const BASE_URL = "http://10.0.8.71:";
export const PORT = "1000";

export const instance = axios.create({
    baseURL: `${BASE_URL}${PORT}`
});