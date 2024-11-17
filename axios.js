import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({

    baseURL: 'http://169.254.25.4:8000/api',


})

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