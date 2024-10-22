import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default axios.create({
    baseURL:'http://10.0.0.121:8000/api'
})
