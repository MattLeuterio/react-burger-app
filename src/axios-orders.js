import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-4119a.firebaseio.com/'
});

export default instance;