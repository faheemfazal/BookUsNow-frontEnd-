import axios from "axios";

export const axiosUser = axios.create({
    baseURL:'https://backendbookusnow.vercel.app/',
    headers: {
        "Content-Type": "application/json",
      },
})