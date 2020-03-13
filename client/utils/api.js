import Axios from "axios";
import {Config} from "../config/conf"

export const API = Axios.create({
    baseURL: Config.api.HOST,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const setAuthToken = (token) => {
    API.defaults.headers.common['Authorization'] = token;
};