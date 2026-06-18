import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import axiosSecure from '../utils/axiosSecure';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate user on page reload using the stored token
  useEffect(() => {
    const token = localStorage.getItem('access-token');
    const email = localStorage.getItem('user-email');

    if (token && email) {
      axiosSecure
        .get(`/users/${email}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem('access-token');
          localStorage.removeItem('user-email');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (formData) => {
    const baseURL = import.meta.env.VITE_API_URL;
    await axios.post(`${baseURL}/users`, formData);
    return login(formData.email, formData.password);
  };

  const login = async (email, password) => {
    const baseURL = import.meta.env.VITE_API_URL;
    const { data } = await axios.post(`${baseURL}/jwt`, { email, password });
    localStorage.setItem('access-token', data.token);
    localStorage.setItem('user-email', data.user.email);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('user-email');
    setUser(null);
  };

  const refreshUser = async () => {
    if (!user?.email) return;
    const res = await axiosSecure.get(`/users/${user.email}`);
    setUser(res.data);
  };

  const authInfo = { user, loading, register, login, logout, refreshUser };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
