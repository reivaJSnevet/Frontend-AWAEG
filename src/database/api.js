import axios from "axios";
const URL = "http://backend-awaeg-production.up.railway.app/api/";


export default axios.create({
    baseURL: URL
});

export const apiPrivate = axios.create({
    baseURL: URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true
});
