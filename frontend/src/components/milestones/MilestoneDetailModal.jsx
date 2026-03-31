import { X, Calendar, Globe, User, Activity, Trash2, Trophy, Flag, ShieldCheck } from 'lucide-react';

const MilestoneDetailModal = ({ milestone, onClose, onDelete }) => {
    if (!milestone) return null;

    const categoryColors = {
        Work: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', icon: Globe },
        Personal: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', icon: User },
        Health: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', icon: Activity }
    };

    const config = categoryColors[milestone.category] || categoryColors.Personal;
    const Icon = config.icon;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-2xl bg-white rounded-[4rem] shadow-2xl overflow-hidden animate-scale-up border border-slate-200/50">
                {/* Luminous Background Accents */}
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${config.bg} rounded-full blur-[120px] -mr-64 -mt-64 opacity-50`} />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />

                <div className="relative z-10">
                    {/* Header: The Victory Banner */}
                    <div className="px-12 pt-12 pb-8 border-b border-slate-100/60 relative">
                        <div className="flex justify-between items-start">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full ${config.bg} ${config.text} border-2 ${config.border} text-[10px] font-black uppercase tracking-widest shadow-sm`}>
                                        <Trophy className="w-4 h-4" />
                                        Victory Record
                                    </div>
                                    <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-100 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        Verified
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-[0.9] italic uppercase">
                                        {milestone.title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em] pt-2">
                                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                                            <Flag className={`w-3.5 h-3.5 ${config.text}`} />
                                            {milestone.category}
                                        </div>
                                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                                            <Calendar className="w-3.5 h-3.5 text-slate-300" />
                                            {new Date(milestone.createdAt).toLocaleDateString(undefined, { 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={onClose}
                                className="bg-white/80 hover:bg-white p-4 rounded-[2rem] text-slate-400 hover:text-slate-900 transition-all border border-slate-200/50 shadow-sm backdrop-blur-md active:scale-95"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Content Section: The Narrative */}
                    <div className="p-12 space-y-12">
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300 flex items-center gap-3">
                                <div className="w-8 h-px bg-slate-100" />
                                Analysis & Insight
                            </h3>
                            <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-100 rounded-[3rem] p-10 relative group transition-all hover:bg-white hover:shadow-xl">
                                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-2 h-16 ${config.text} bg-current transition-all group-hover:h-24 rounded-r-xl opacity-80`} />
                                <p className="text-slate-700 font-semibold leading-relaxed italic text-2xl pr-6 font-display">
                                    "{milestone.description || "In the silence of progress, this achievement stands as a testament to persistence and the relentless pursuit of excellence."}"
                                </p>
                            </div>
                        </div>

                        {/* Control Actions: Finality */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-slate-100/60">
                            <div className="flex items-center gap-4 bg-emerald-50/50 px-6 py-3 rounded-full border border-emerald-100 shadow-inner">
                                <div className="relative">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute inset-0" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 relative" />
                                </div>
                                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.3em]">Timeline Sequence Locked</span>
                            </div>
                            
                            <button
                                onClick={() => {
                                    if (window.confirm('Are you absolutely sure you want to purge this victory from history?')) {
                                        onDelete(milestone._id);
                                        onClose();
                                    }
                                }}
                                className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-[2rem] bg-rose-50 text-rose-600 border-2 border-rose-100 hover:bg-rose-100 hover:border-rose-200 transition-all font-black text-[11px] uppercase tracking-widest active:scale-95 shadow-sm shadow-rose-100"
                            >
                                <Trash2 className="w-5 h-5" />
                                Terminate Entry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MilestoneDetailModal;
