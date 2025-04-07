import axios from 'axios';

// define the base url
const baseURL = 'http://localhost:3001/api/v1';

// create an axios instance
const instance = axios.create({
    baseURL,
    timeout: 3000,
    withCredentials: true,
});

export default instance;