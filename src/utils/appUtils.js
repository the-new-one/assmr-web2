import axios from "axios";

export const BASE_URL = "http://192.168.43.222:";
export const PORT = "1000";

export const instance = axios.create({
    baseURL: `${BASE_URL}${PORT}`
});