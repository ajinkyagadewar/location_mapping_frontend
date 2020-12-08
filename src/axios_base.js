import axios from 'axios';

const getAxiosInstance = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:5000/api'
    });


    return instance;
}

export default getAxiosInstance;