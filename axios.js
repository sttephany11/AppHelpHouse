import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
<<<<<<< HEAD
    baseURL: 'http://172.20.10.14:8000/api',
});

export default axios.create({
    baseURL:'http://172.20.10.14:8000/api'
})
=======
    baseURL: 'http://10.0.0.121:8000/api',
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
>>>>>>> 1f64552815bccc542b7dc9a1a00e473fa76facad
