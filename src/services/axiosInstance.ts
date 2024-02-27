import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 1000,
  headers,
});
