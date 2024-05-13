import axios from 'axios';

// Define API config
const api = axios.create({
  baseURL: 'https://34.82.234.85:8000/api/v1',
});

// POST Login
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Login failed. Please try again.');
    } else {
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
}

// GET Project List
export const getProjectList = async () => {
  try {
    const response = await api.get('/login');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Login failed. Please try again.');
    } else {
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
}

