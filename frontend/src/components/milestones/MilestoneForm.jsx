import { useState } from 'react';
import { useMilestones } from '../../context/MilestoneContext';
import { Plus, Zap, Activity, Rocket } from 'lucide-react';

const MilestoneForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Personal');
    const { addMilestone, loading } = useMilestones();
    const [formError, setFormError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        if (title.trim().length < 3) {
            setFormError('Title must be at least 3 characters');
            return;
        }

        const result = await addMilestone(title, category, description);
        if (result.success) {
            setTitle('');
            setDescription('');
            setCategory('Personal');
        } else {
            setFormError(result.message);
        }
    };

    const domains = [
        { 
            id: 'Work', 
            icon: Zap, 
            label: 'Work', 
            activeClass: 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20',
            inactiveClass: 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
        },
        { 
            id: 'Personal', 
            icon: Rocket, 
            label: 'Life', 
            activeClass: 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20',
            inactiveClass: 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200'
        },
        { 
            id: 'Health', 
            icon: Activity, 
            label: 'Health', 
            activeClass: 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20',
            inactiveClass: 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200'
        },
    ];

    return (
        <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 shadow-premium relative overflow-hidden group border border-slate-200/60 animate-fade-in-up">
            <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-24 md:-mr-32 -mt-24 md:-mt-32 transition-all duration-700" />
            
            <div className="flex items-center gap-4 md:gap-5 mb-8 md:mb-10 relative z-10">
                <div className="bg-slate-900 p-3 md:p-4 rounded-xl md:rounded-2xl text-white shadow-xl shadow-slate-200 transform group-hover:scale-110 transition-transform duration-500">
                    <Plus className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Record Win</h2>
                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 mt-1.5 md:mt-2 uppercase tracking-[0.3em]">Log your breakthrough</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10">
                <div className="space-y-3">
                    <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Achievement Name</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What did you conquer?"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 md:px-6 py-4 md:py-5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-slate-900 font-bold text-base md:text-lg"
                        disabled={loading}
                    />
                </div>

                <div className="space-y-3">
                    <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Detailed Note (Optional)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Context to this win..."
                        rows={window.innerWidth < 768 ? 2 : 3}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 md:px-6 py-3 md:py-4 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-slate-900 font-medium text-xs md:text-sm resize-none"
                        disabled={loading}
                    />
                </div>

                <div className="space-y-3">
                    <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Select Domain</label>
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                        {domains.map((dom) => (
                            <button
                                key={dom.id}
                                type="button"
                                onClick={() => setCategory(dom.id)}
                                className={`py-3 md:py-4 rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest border transition-all flex flex-col items-center gap-1.5 md:gap-2 ${
                                    category === dom.id ? dom.activeClass : dom.inactiveClass
                                }`}
                                disabled={loading}
                            >
                                <dom.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                {dom.label}
                            </button>
                        ))}
                    </div>
                </div>

                {formError && (
                    <div className="bg-rose-50 text-rose-600 text-[9px] md:text-[10px] font-black py-3 md:py-4 px-5 md:px-6 rounded-2xl border border-rose-100 animate-in slide-in-from-top-1">
                        ⚠️ ERROR: {formError}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 text-white font-black py-5 md:py-6 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-slate-200 group/btn relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]" />
                    {loading ? (
                        <>
                            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs">Processing...</span>
                        </>
                    ) : (
                        <>
                            <Plus className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:rotate-90 transition-transform" />
                            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs">Commit Milestone</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default MilestoneForm;
