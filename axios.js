import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'http://192.168.56.1:8000/api',
});

export default axios.create({
    baseURL:'http://172.20.10.2:8000/api'
})
git