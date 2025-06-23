import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email: string, password: string) => {
  try {
    const response = await apiService.post('/auth/login', { email, password });

    console.log(import.meta.env.VITE_API_BASE_URL);

    return response.data;
  } catch (error) {
    const err = error as any;
    throw err.response?.data?.message || err.response?.data || err.message;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await apiService.post('/auth/register', { email, password });
    return response.data;
  } catch (error) {
    const err = error as any;
    throw err.response?.data?.message || err.response?.data || err.message;
  }
};

export default apiService;
