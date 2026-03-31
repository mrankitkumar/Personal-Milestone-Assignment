import { useAuth } from '../../context/AuthContext';
import { LogOut, MessageSquare, Menu, Trophy } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();
    const displayName = user?.email?.split('@')[0] || 'User';

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle */}
                <button 
                    onClick={toggleSidebar}
                    className="lg:hidden p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-emerald-600 transition-all active:scale-95"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="hidden xs:block">
                     <h2 className="text-sm md:text-xl font-black text-slate-900 tracking-tight leading-none italic uppercase">
                        Welcome, <span className="text-emerald-600">{displayName}</span>
                     </h2>
                     <p className="hidden md:block text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest leading-none">
                        System status: <span className="text-emerald-500">Optimized</span>
                     </p>
                </div>

                {/* Mobile Branding (Smallest screens only) */}
                <div className="xs:hidden flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-black tracking-tighter uppercase italic">Milestone</span>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <button className="hidden sm:flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-emerald-600 transition-colors bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 uppercase tracking-widest">
                    <MessageSquare className="w-4 h-4" />
                    <span>Feedback</span>
                </button>
                <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />
                <button
                    onClick={logout}
                    className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-rose-500 transition-colors bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 uppercase tracking-widest"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden xs:inline">Sign Out</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
