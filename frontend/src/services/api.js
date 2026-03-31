import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Interceptor to add JWT token to requests
api.interceptors.request.use((config) => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (authData && authData.token) {
        config.headers.Authorization = `Bearer ${authData.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
