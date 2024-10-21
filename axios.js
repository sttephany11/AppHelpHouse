import axios from 'axios'


export default axios.create({
    baseURL:'http://10.0.0.121:8000/api'
})