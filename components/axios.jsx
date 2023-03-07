import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3005'
})

export default instance

export const baseURL = 'http://localhost:3005'