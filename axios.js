import axios from 'axios'


export default axios.create({
    baseURL:'http://172.20.10.14:8000/api'
})