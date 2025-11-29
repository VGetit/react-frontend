// src/api/axiosConfig.js
import axios from 'axios';

// Temel API URL'nizi buraya ayarlayabilirsiniz
const apiClient = axios.create({
  baseURL: 'https://vgetit.com/api',
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
