import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
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


// --------------------------------------------------------COLOQUEM SEUS IPS AQUIIII------------------------------------------------------------------------------

// iP GUILHERME   10.0.0.121
 // pc lab 6 192.168.56.1 que o joao e o gui meche
