import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-9d2f4.firebaseio.com'
});

export default instance;