import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem('access-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || '';
    const isExpiredOrBlocked =
      status === 401 ||
      (status === 403 && (message.toLowerCase().includes('blocked') || message.toLowerCase().includes('unauthorized')));

    if (isExpiredOrBlocked) {
      localStorage.removeItem('access-token');
      localStorage.removeItem('user-email');
      // Avoid redirect loop if already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosSecure;
