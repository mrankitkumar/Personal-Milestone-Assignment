import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    // Close sidebar on navigation (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-x-hidden">
            {/* Sidebar with mobile state */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[45] lg:hidden animate-fade-in"
                    onClick={toggleSidebar}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 lg:ml-72 flex flex-col min-h-screen w-full">
                <Header toggleSidebar={toggleSidebar} />
                <main className="flex-1 w-full relative">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
