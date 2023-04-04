import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();
const BACKEND_URL= 'https://elegant-rose-outerwear.cyclic.app';

const instance = axios.create({
     baseURL: BACKEND_URL
})

export default instance



export const baseURL = BACKEND_URL;
