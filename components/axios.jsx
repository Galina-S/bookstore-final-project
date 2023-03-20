import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://localhost:3005'
    baseURL: process.env.REACT_APP_API_URL
})

export default instance

export const baseURL = process.env.REACT_APP_API_URL