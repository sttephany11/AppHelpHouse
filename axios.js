import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
<<<<<<< HEAD
    baseURL: 'http://172.20.10.5:8000/api',
=======
    baseURL: 'http://192.168.15.119:8000/api',
>>>>>>> origin/main
});




// Adiciona o interceptor para incluir o token em todas as requisições
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;