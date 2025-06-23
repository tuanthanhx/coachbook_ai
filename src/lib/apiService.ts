import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your backend URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email: string, password: string) => {
  try {
    const response = await apiService.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    const err = error as any;
    throw err.response?.data?.message || err.response?.data || err.message;
  }
};

export default apiService;
