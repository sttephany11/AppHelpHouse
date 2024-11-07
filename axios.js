import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'http://172.20.10.14:8000/api',
});

export default axios.create({
    baseURL:'http://172.20.10.14:8000/api'
})
