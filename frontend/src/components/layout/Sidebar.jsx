import { useAuth } from '../../context/AuthContext';
import { useMilestones } from '../../context/MilestoneContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    User, 
    LogOut, 
    Trophy, 
    Globe, 
    Activity, 
    Shield, 
    ChevronRight,
    Sparkles,
    X
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { logout } = useAuth();
    const { stats, categoryFilter, setCategoryFilter } = useMilestones();
    const navigate = useNavigate();
    const location = useLocation();

    const categories = [
        { id: 'All', label: 'Matrix Overview', icon: Trophy, color: 'text-emerald-900', bg: 'bg-emerald-50' },
        { id: 'Work', label: 'Work Wins', icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
        { id: 'Personal', label: 'Life Goals', icon: User, color: 'text-emerald-500', bg: 'bg-emerald-50/30' },
        { id: 'Health', label: 'Vitality', icon: Activity, color: 'text-emerald-700', bg: 'bg-emerald-100/50' }
    ];

    const getCount = (id) => {
        if (id === 'All') return stats.total;
        const cat = stats.categories?.find(c => c.id === id);
        return cat ? cat.count : 0;
    };

    const NavItem = ({ item }) => {
        const isActive = categoryFilter === item.id;
        const Icon = item.icon;
        
        return (
            <button
                onClick={() => {
                    setCategoryFilter(item.id);
                    if (location.pathname !== '/dashboard') navigate('/dashboard');
                }}
                className={`w-full flex items-center justify-between p-4 rounded-3xl transition-all duration-500 group relative overflow-hidden ${
                    isActive 
                    ? `bg-white shadow-premium border border-emerald-100/30 scale-[1.02]` 
                    : 'hover:bg-white/60 text-slate-400 border border-transparent'
                }`}
            >
                {/* Active Indicator Accent */}
                {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-600 rounded-r-full animate-fade-in" />
                )}

                <div className="flex items-center gap-4 relative z-10 pl-2">
                    <div className={`p-2.5 rounded-2xl transition-all duration-700 ${
                        isActive ? `${item.bg} ${item.color} shadow-sm ring-1 ring-emerald-100/50` : 'bg-slate-50 text-slate-300 group-hover:bg-white group-hover:text-emerald-600'
                    }`}>
                        <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : 'group-hover:rotate-12 scale-100'}`} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                        isActive ? 'text-slate-900 ml-1' : 'text-slate-400 group-hover:text-slate-600 ml-0.5'
                    }`}>
                        {item.label}
                    </span>
                </div>
                {getCount(item.id) > 0 && (
                    <span className={`text-[9px] font-black px-2.5 py-1 rounded-xl transition-all ${
                        isActive ? `${item.bg} ${item.color} border border-emerald-100` : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-slate-600'
                    }`}>
                        {getCount(item.id)}
                    </span>
                )}
            </button>
        );
    };

    return (
        <aside className={`fixed inset-y-0 left-0 z-[50] w-72 bg-slate-50 border-r border-slate-200/60 transition-transform duration-500 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="h-full flex flex-col p-8 bg-slate-50 relative overflow-hidden">
                {/* Mobile Close Button */}
                <button 
                    onClick={toggleSidebar}
                    className="lg:hidden absolute top-8 right-8 bg-white border border-slate-200 rounded-xl p-2 text-slate-400 hover:text-slate-900 transition-all active:scale-95 z-30"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Luminous Mesh Background Overlay */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/5 rounded-full blur-[80px] -mr-24 -mt-24 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />
                
                {/* Branding Section */}
                <div className="mb-14 relative z-10">
                    <div className="flex items-center gap-4 group cursor-default">
                        <div className="bg-slate-900 p-3 rounded-[1.2rem] shadow-premium transform group-hover:rotate-6 transition-transform duration-500 border border-slate-700/20">
                            <Trophy className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="space-y-0.5">
                            <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Milestone</h1>
                            <p className="text-[8px] font-black text-emerald-600 tracking-[0.4em] uppercase opacity-70">Intelligence Engine</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Tracks */}
                <div className="flex-1 space-y-12 relative z-10 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="space-y-4">
                        <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4 pl-2 opacity-60">Success Vectors</label>
                        <div className="space-y-2.5">
                            {categories.map(item => <NavItem key={item.id} item={item} />)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4 pl-2 opacity-60">System Core</label>
                        <div className="space-y-2.5">
                            <button
                                onClick={() => navigate('/profile')}
                                className={`w-full flex items-center gap-4 p-4 rounded-3xl transition-all duration-300 group ${
                                    location.pathname === '/profile' 
                                    ? 'bg-white shadow-premium border border-emerald-100/30' 
                                    : 'hover:bg-white/60 text-slate-400 border border-transparent'
                                }`}
                            >
                                <div className={`p-2.5 rounded-2xl transition-all duration-500 ${
                                    location.pathname === '/profile' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-300 group-hover:bg-white group-hover:text-emerald-600'
                                }`}>
                                    <Shield className="w-5 h-5 shadow-sm" />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${
                                    location.pathname === '/profile' ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'
                                }`}>
                                    Pro Analysis
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Status Section */}
                <div className="pt-8 border-t border-slate-200/40 space-y-4 relative z-10">
                    <button 
                        onClick={logout}
                        className="w-full flex items-center justify-between p-4 bg-white hover:bg-rose-50 hover:text-rose-600 text-slate-400 rounded-3xl transition-all border border-slate-100 hover:border-rose-200 group shadow-sm active:scale-95"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-rose-100 transition-colors">
                                <LogOut className="w-4 h-4 group-hover:-rotate-12 transition-transform" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Terminate Session</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                    </button>

                    <div className="bg-white/40 p-3 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.25em] animate-pulse">
                            System Optimized
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
