import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

<<<<<<< HEAD
const api = axios.create({
    baseURL: 'http://192.168.1.13:8000/api',
});

export default axios.create({
    baseURL:'http://192.168.1.13:8000/api'
=======

export default axios.create({
    baseURL:'http://10.0.0.121:8000/api'
>>>>>>> 38ee8f018b1b9d29fe6a538b5bbd3fe1a17db200
})
