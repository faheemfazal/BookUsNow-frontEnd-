import axios from "axios";

export const axiosUser = axios.create({
    baseURL:'http://localhost:4000/',
    headers: {
        "Content-Type": "application/json",
      },
})