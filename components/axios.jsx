import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();


const instance = axios.create({
     baseURL: process.env.BACKEND_URL
    // baseURL: process.env.REACT_APP_API_URL
})

export default instance



export const baseURL = process.env.BACKEND_URL;