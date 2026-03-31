import { useMilestones } from '../../context/MilestoneContext';
import { Target, Zap, Rocket, Activity, BarChart3 } from 'lucide-react';

const AnalyticsCard = () => {
    const { stats } = useMilestones();

    const getPercentage = (count) => {
        if (!stats.total) return 0;
        return (count / stats.total) * 100;
    };

    const categories = [
        { 
            id: 'Work', 
            label: 'System Wins', 
            icon: Zap, 
            color: 'text-blue-600', 
            bg: 'bg-blue-50', 
            bar: 'bg-blue-600',
            count: stats.categories.find(c => c.id === 'Work')?.count || 0 
        },
        { 
            id: 'Personal', 
            label: 'Life Goals', 
            icon: Rocket, 
            color: 'text-purple-600', 
            bg: 'bg-purple-50', 
            bar: 'bg-purple-600',
            count: stats.categories.find(c => c.id === 'Personal')?.count || 0 
        },
        { 
            id: 'Health', 
            label: 'Vitality', 
            icon: Activity, 
            color: 'text-emerald-600', 
            bg: 'bg-emerald-50', 
            bar: 'bg-emerald-600',
            count: stats.categories.find(c => c.id === 'Health')?.count || 0 
        },
    ];

    return (
        <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-premium border border-slate-200/60 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-slate-50 rounded-full blur-3xl -mr-24 md:-mr-32 -mt-24 md:-mt-32 transition-all duration-700" />
            
            <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 relative z-10">
                {/* Radial Multi-Progress Display */}
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90 viewbox-[0_0_288_288]" viewBox="0 0 288 288">
                        {/* Background Base */}
                        <circle cx="144" cy="144" r="120" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
                        
                        {/* Dynamic Category Segments */}
                        {categories.map((cat, i) => {
                            const offset = categories.slice(0, i).reduce((acc, c) => acc + (c.count / (stats.total || 1)) * 754, 0);
                            const segment = (cat.count / (stats.total || 1)) * 754;
                            
                            return (
                                <circle 
                                    key={cat.id}
                                    cx="144" cy="144" r="120" stroke="currentColor" strokeWidth="16" fill="transparent"
                                    strokeDasharray={`${segment} 754`}
                                    strokeDashoffset={-offset}
                                    className={`${cat.color} transition-all duration-1000 ease-out`}
                                    strokeLinecap="round"
                                />
                            );
                        })}
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 md:mb-2 leading-none">Apex Score</span>
                        <div className="flex items-end gap-1">
                            <span className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter italic leading-none">{stats.total}</span>
                        </div>
                        <div className="mt-2 md:mt-4 flex items-center gap-1.5 md:gap-2 bg-emerald-50 px-2.5 md:px-3 py-1 rounded-full border border-emerald-100/50">
                            <Target className="w-2.5 h-2.5 md:w-3 md:h-3 text-emerald-600" />
                            <span className="text-[8px] md:text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">Global Impact</span>
                        </div>
                    </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="flex-1 w-full space-y-8 md:space-y-10">
                    <header className="flex items-center gap-4">
                        <div className="bg-slate-900 p-2.5 md:p-3 rounded-xl md:rounded-2xl text-white shadow-xl shadow-slate-200">
                            <BarChart3 className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Sector Analysis</h3>
                            <p className="text-[9px] md:text-[10px] font-black text-slate-400 mt-1.5 md:mt-2 uppercase tracking-[0.3em]">Operational domain analysis</p>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 gap-5 md:gap-6">
                        {categories.map((cat) => (
                            <div key={cat.id} className="space-y-2 md:space-y-3 group/item">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3">
                                        <div className={`${cat.bg} ${cat.color} p-2 rounded-lg border border-transparent group-hover/item:border-current transition-all`}>
                                            <cat.icon className="w-3.5 md:w-4 h-3.5 md:h-4" />
                                        </div>
                                        <span className="text-[10px] md:text-[11px] font-black text-slate-900 uppercase tracking-[0.15em]">{cat.label}</span>
                                    </div>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className={`text-lg md:text-xl font-black italic ${cat.color}`}>{cat.count}</span>
                                        <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">/ {stats.total}</span>
                                    </div>
                                </div>
                                <div className="h-2.5 md:h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
                                    <div 
                                        className={`h-full ${cat.bar} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                                        style={{ width: `${getPercentage(cat.count)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCard;
