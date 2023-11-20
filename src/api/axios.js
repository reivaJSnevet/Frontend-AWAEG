import axios from "axios";
const URL = "https://swaegapi.azurewebsites.net/api/";


export default axios.create({
    baseURL: URL
});

export const apiPrivate = axios.create({
    baseURL: URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true
});
