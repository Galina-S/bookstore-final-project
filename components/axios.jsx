import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();
export const BACKEND_URL= 'https://poised-elk-singlet.cyclic.app';

const instance = axios.create({
    BACKEND_URL: BACKEND_URL
})

export default instance



export const baseURL = BACKEND_URL;
