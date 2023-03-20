import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();


const instance = axios.create({
     baseURL: 'http://localhost:3005'
    // baseURL: process.env.REACT_APP_API_URL
})

export default instance



export const baseURL = 'http://localhost:3005';