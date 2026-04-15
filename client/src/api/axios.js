import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL || '/api';
// Automatically append /api if VITE_API_URL does not end with it
if (baseURL.startsWith('http') && !baseURL.endsWith('/api')) {
  baseURL += '/api';
}

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
