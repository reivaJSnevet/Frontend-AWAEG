import axios from "axios";
const URL = "http://localhost:3000/api/";
/* const URL = "https://backend-awaeg-production.up.railway.app/api/"; */


export default axios.create({
    baseURL: URL
});

export const apiPrivate = axios.create({
    baseURL: URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true
});
