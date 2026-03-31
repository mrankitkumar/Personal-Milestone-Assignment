import { useState } from 'react';
import { useMilestones } from '../../context/MilestoneContext';
import Loader from '../common/Loader';
import { Trophy, Calendar, Globe, User, Activity, Trash2, ArrowUpRight, Inbox, Plus, Flag } from 'lucide-react';
import MilestoneDetailModal from './MilestoneDetailModal';

const MilestoneList = () => {
    const { milestones, loading, error, deleteMilestone } = useMilestones();
    const [selectedMilestone, setSelectedMilestone] = useState(null);

    const categoryConfig = {
        Work: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', icon: Globe },
        Personal: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', icon: User },
        Health: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', icon: Activity }
    };

    if (loading && milestones.length === 0) return <Loader />;

    if (error) return (
        <div className="bg-rose-50 text-rose-600 p-8 rounded-[2.5rem] border border-rose-100/50 font-black text-[10px] uppercase tracking-widest text-center animate-shake">
            ⚠️ Execution Error: {error}
        </div>
    );

    if (milestones.length === 0) return (
        <div className="bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-[3rem] p-20 text-center space-y-6">
            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto border border-slate-100 shadow-sm transition-transform hover:scale-110">
                <Inbox className="w-10 h-10 text-slate-300" />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase italic leading-none">The Matrix is Empty</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed px-10">
                    Your journey of breakthroughs is awaiting its first entry. Initialize your legacy.
                </p>
            </div>
        </div>
    );

    return (
        <div className="relative space-y-8 md:space-y-12 pb-12">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 md:px-4 pb-4 border-b border-slate-100 gap-4">
                <div className="space-y-1 md:space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none flex items-center gap-3">
                        <Trophy className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" />
                        Milestone Journey
                    </h2>
                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Chronological Trace of Breakthroughs</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-2xl border border-slate-200/60 shadow-sm">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">{milestones.length} Trophies</span>
                </div>
            </div>

            {/* Timeline Vertical Bridge */}
            <div className="absolute left-6 sm:left-10 md:left-12 top-[120px] bottom-0 w-1 bg-gradient-to-b from-emerald-500/30 via-slate-200 to-slate-100 rounded-full" />

            <div className="grid grid-cols-1 gap-8 md:gap-12 relative z-10 px-0 sm:px-2 lg:px-4">
                {milestones.map((m, index) => {
                    const config = categoryConfig[m.category] || categoryConfig.Personal;
                    const Icon = config.icon;

                    return (
                        <div 
                            key={m._id}
                            className="flex gap-4 sm:gap-8 group animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Timeline Node */}
                            <div className="flex flex-col items-center flex-shrink-0 mt-3 relative">
                                <div className={`relative z-20 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-[1.2rem] sm:rounded-[2rem] flex items-center justify-center p-0.5 shadow-xl transition-all duration-500 
                                    ${config.bg} ${config.text} border-2 ${config.border} group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-${config.text.split('-')[1]}-200/50 cursor-pointer`}
                                    onClick={() => setSelectedMilestone(m)}
                                >
                                    <div className="bg-white w-full h-full rounded-[1.1rem] sm:rounded-[1.8rem] flex items-center justify-center shadow-inner">
                                        <Icon className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    
                                    {/* Connection Point */}
                                    <div className="absolute top-1/2 -right-1 sm:-right-2 w-3 sm:w-4 h-3 sm:h-4 bg-white border-2 border-slate-200 rounded-full group-hover:bg-emerald-500 group-hover:border-emerald-200 transition-colors hidden sm:block" />
                                </div>
                                
                                {/* Step Indicator */}
                                <div className="mt-4 text-[7px] sm:text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] bg-white px-2 sm:px-3 py-1 rounded-full border border-slate-100 group-hover:text-emerald-500 transition-colors whitespace-nowrap">
                                    Stage {milestones.length - index}
                                </div>
                            </div>

                            {/* Milestone Content Card */}
                            <div className="flex-1 space-y-4">
                                <div className="bg-white border border-slate-200/50 p-6 md:p-8 lg:p-10 rounded-[2rem] md:rounded-[3rem] shadow-premium hover:shadow-2xl hover:border-emerald-500/20 transition-all duration-500 group-hover:-translate-y-1 relative overflow-hidden">
                                    {/* Decorative Backdrop */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 ${config.bg} rounded-full blur-[60px] -mr-16 -mt-16 opacity-40`} />
                                    
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 relative z-10">
                                        <div className="space-y-4 md:space-y-6 w-full">
                                            <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                                <div className={`inline-flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2 rounded-full ${config.bg} ${config.text} border-2 ${config.border} text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-sm`}>
                                                    <Flag className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                                    {m.category}
                                                </div>
                                                <div className="text-slate-400 font-black text-[8px] md:text-[9px] uppercase tracking-[0.2em] flex items-center gap-2 bg-slate-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-slate-100">
                                                    <Calendar className="w-3 md:w-3.5 h-3 md:h-3.5 text-slate-300" />
                                                    {new Date(m.createdAt).toLocaleDateString(undefined, { 
                                                        year: 'numeric', 
                                                        month: 'short', 
                                                        day: 'numeric' 
                                                    })}
                                                </div>
                                            </div>

                                            <div className="space-y-2 md:space-y-4">
                                                <h3 className="text-xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-[1.1] group-hover:text-emerald-600 transition-colors">
                                                    {m.title}
                                                </h3>
                                                {m.description && (
                                                    <p className="text-slate-500 font-medium text-[11px] md:text-sm leading-relaxed italic line-clamp-2 sm:line-clamp-none md:pl-4 md:border-l-4 md:border-slate-50">
                                                        "{m.description}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                                            <button 
                                                onClick={() => setSelectedMilestone(m)}
                                                className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-500 px-4 md:px-6 py-3 md:py-4 rounded-[1.2rem] md:rounded-[1.5rem] border border-slate-200/50 transition-all font-black text-[9px] md:text-[10px] uppercase tracking-widest active:scale-95 group/btn"
                                            >
                                                <Trophy className="w-3.5 md:w-4 h-3.5 md:h-4 text-emerald-500 group-hover/btn:text-white transition-colors" />
                                                View <span className="hidden xs:inline">Victory</span>
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    if (window.confirm('Delete this historical breakthrough permanently?')) {
                                                        deleteMilestone(m._id);
                                                    }
                                                }}
                                                className="bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-300 p-3 md:p-4 rounded-[1.2rem] md:rounded-[1.5rem] border border-slate-200/50 transition-all active:scale-95 flex-shrink-0"
                                                title="Delete Milestone"
                                            >
                                                <Trash2 className="w-4 md:w-5 h-4 md:h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedMilestone && (
                <MilestoneDetailModal 
                    milestone={selectedMilestone}
                    onClose={() => setSelectedMilestone(null)}
                    onDelete={deleteMilestone}
                />
            )}
        </div>
    );
};

export default MilestoneList;
