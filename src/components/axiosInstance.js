import axios from "axios";

export const axiosInstance = axios.create();
delete axiosInstance.defaults.headers.common["Authorization"];