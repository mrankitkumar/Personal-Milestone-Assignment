import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MilestoneProvider } from './context/MilestoneContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import Loader from './components/common/Loader';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <Loader fullPage={true} />;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const AppContent = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
                path="/dashboard" 
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/profile" 
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                } 
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
};

function App() {
    return (
        <AuthProvider>
            <MilestoneProvider>
                <Router>
                    <Toaster 
                        position="top-right"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                background: '#333',
                                color: '#fff',
                            },
                        }}
                    />
                    <AppContent />
                </Router>
            </MilestoneProvider>
        </AuthProvider>
    );
}

export default App;
