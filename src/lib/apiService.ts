import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && !config.url?.includes('/auth')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const handleApiError = (error: any) => {
  const err = error as any;
  throw err.response?.data?.message || err.response?.data || err.message;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await apiService.post('/auth/login', { email, password });

    console.log(import.meta.env.VITE_API_BASE_URL);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await apiService.post('/auth/register', { email, password });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateProfile = async (formData: FormData) => {
  try {
    const response = await apiService.patch('/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updatePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const response = await apiService.patch('/users/password', { currentPassword, newPassword });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getRandomQuote = async () => {
  try {
    const response = await apiService.get('/quotes/random');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export default apiService;
