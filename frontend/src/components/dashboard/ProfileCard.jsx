import { User, BadgeCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProfileCard = () => {
    const { user } = useAuth();
    const displayName = user?.email?.split('@')[0] || 'User';

    return (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-8 group hover:border-emerald-500/20 transition-all duration-300">
            {/* Avatar */}
            <div className="relative">
                <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-xl overflow-hidden shadow-emerald-500/10 group-hover:scale-105 transition-transform duration-500">
                    <User className="w-16 h-16 text-slate-300" />
                </div>
                <div className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-lg border border-slate-50">
                    <BadgeCheck className="w-6 h-6 text-emerald-500 fill-emerald-50/50" />
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">{displayName}</h3>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest shadow-sm">
                        Pro Member
                    </span>
                </div>
                <p className="text-slate-400 font-bold text-sm mb-6 uppercase tracking-[0.2em]">{user?.email}</p>
                
                <div className="bg-slate-50 px-5 py-3 rounded-2xl inline-flex items-center gap-2 border border-slate-100/50">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID:</span>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none">EVO-0027-{new Date().getFullYear()}</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
