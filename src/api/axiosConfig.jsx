// src/api/axiosConfig.js
import axios from 'axios';

// Temel API URL'nizi buraya ayarlayabilirsiniz
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // veya http://127.0.0.1:8000
});


apiClient.interceptors.request.use(
  (config) => {
    // localStorage'dan token'ı al
    const token = localStorage.getItem('authToken');
    
    // Eğer token varsa ve header'da Authorization yoksa
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`; // Veya 'Token ${token}' (Django ayarınıza bağlı)
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;