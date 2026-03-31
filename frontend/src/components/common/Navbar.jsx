import { useAuth } from '../../context/AuthContext';
import { LogOut, Trophy, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="w-full bg-white/70 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 px-6 py-3.5 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-600/20 transform group-hover:rotate-12 transition-transform">
                        <Trophy className="text-white w-5 h-5" />
                    </div>
                    <span className="font-black text-2xl text-slate-900 tracking-tighter italic uppercase">Milestone</span>
                </div>

                {user && (
                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200 shadow-inner">
                            <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                <User className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-sm font-bold text-slate-600 tracking-tight">{user.email}</span>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 text-sm font-black text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
