import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from './AuthContext';

const MilestoneContext = createContext();

export const MilestoneProvider = ({ children }) => {
    const { user } = useAuth();
    const [milestones, setMilestones] = useState([]);
    const [stats, setStats] = useState({ total: 0, categories: [], user: {} });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState('All');

    const fetchStats = useCallback(async () => {
        try {
            const { data } = await api.get('/milestones/stats');
            setStats(data.data);
        } catch (err) {
            console.error('Failed to fetch stats', err);
        }
    }, []);

    const fetchMilestones = useCallback(async (category = 'All') => {
        setLoading(true);
        setError(null);
        try {
            const params = category !== 'All' ? { category } : {};
            const { data } = await api.get('/milestones', { params });
            setMilestones(data.data);
            await fetchStats();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch milestones');
        } finally {
            setLoading(false);
        }
    }, [fetchStats]);

    // Re-fetch milestones whenever the category filter changes
    useEffect(() => {
        if (user) {
            fetchMilestones(categoryFilter);
        }
    }, [categoryFilter, user, fetchMilestones]);

    const addMilestone = async (title, category, description = '') => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post('/milestones', { title, category, description });
            
            toast.success(data.message || 'Milestone added successfully');
            
            // Re-fetch the current view to ensure synchronization
            await fetchMilestones(categoryFilter);
            await fetchStats();
            
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to add milestone';
            setError(msg);
            toast.error(msg);
            return { success: false, message: msg };
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (profileData) => {
        try {
            const { data } = await api.put('/milestones/profile', profileData);
            toast.success(data.message || 'Profile updated successfully');
            await fetchStats(); // Refresh user metrics in stats
            return { success: true, data: data.data };
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to update profile';
            toast.error(msg);
            return { success: false, message: msg };
        }
    };

    const deleteMilestone = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.delete(`/milestones/${id}`);
            toast.success(data.message || 'Milestone deleted successfully');
            // Re-fetch current view and stats after deletion
            await fetchMilestones(categoryFilter);
            await fetchStats();
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to delete milestone';
            setError(msg);
            toast.error(msg);
            return { success: false, message: msg };
        } finally {
            setLoading(false);
        }
    };

    return (
        <MilestoneContext.Provider value={{
            milestones,
            stats,
            loading,
            error,
            categoryFilter,
            setCategoryFilter,
            fetchMilestones,
            addMilestone,
            updateProfile,
            deleteMilestone
        }}>
            {children}
        </MilestoneContext.Provider>
    );
};

export const useMilestones = () => useContext(MilestoneContext);
