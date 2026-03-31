import { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedAuth = localStorage.getItem('authData');
        if (storedAuth) {
            setUser(JSON.parse(storedAuth));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            const userData = data.data;
            setUser(userData);
            localStorage.setItem('authData', JSON.stringify(userData));
            toast.success(data.message || 'Login successful');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            return {
                success: false,
                message: message
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await api.post('/auth/register', { name, email, password });
            const userData = data.data;
            setUser(userData);
            localStorage.setItem('authData', JSON.stringify(userData));
            toast.success(data.message || 'Registration successful');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            return {
                success: false,
                message: message
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authData');
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
