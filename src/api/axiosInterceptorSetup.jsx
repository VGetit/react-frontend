// src/api/AxiosInterceptorSetup.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from './axiosConfig';

const AxiosInterceptorSetup = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const interceptor = apiClient.interceptors.response.use(
            (response) => response,
            (error) => {
                const status = error.response ? error.response.status : null;

                if (status === 401 || status === 403) {
                    console.error("Token expired or unauthorized. Logging out.");
                    
                    logout();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            apiClient.interceptors.response.eject(interceptor);
        };
    }, [navigate, logout]);

    return null;
};

export default AxiosInterceptorSetup;