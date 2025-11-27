import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (errors) => {
        return Promise.reject(errors)
    }

)

export default api;