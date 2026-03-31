import { useAuth } from '../context/AuthContext';
import { useMilestones } from '../context/MilestoneContext';
import { Navigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import Layout from '../components/layout/Layout';
import MilestoneForm from '../components/milestones/MilestoneForm';
import MilestoneList from '../components/milestones/MilestoneList';
import { Sparkles, Activity } from 'lucide-react';

const Dashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const { stats } = useMilestones();

    if (authLoading) return <Loader fullPage={true} />;
    if (!user) return <Navigate to="/login" replace />;

    const userMetrics = stats?.user || {};
    const displayName = userMetrics.name || user?.email?.split('@')[0] || 'Pioneer';
    const focusGrade = userMetrics.focusGrade || 'Apex Performance';
    const statusText = userMetrics.status || 'System Optimized';

    return (
        <Layout>
            <main className="p-4 md:p-8 lg:p-12 space-y-8 md:space-y-12 max-w-7xl mx-auto w-full animate-fade-in-up">
                {/* Luminous Dashboard Header: Emerald Edition */}
                <div className="relative group overflow-hidden bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 text-slate-900 border border-emerald-100/50 shadow-premium">
                    {/* More Prominent Emerald Gradients */}
                    <div className="absolute top-0 right-0 w-full md:w-[500px] h-full bg-gradient-to-l from-emerald-50 via-emerald-50/20 to-transparent opacity-60" />
                    <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-emerald-400/10 rounded-full blur-[60px] md:blur-[100px] -mr-24 md:-mr-48 -mt-24 md:-mt-48 transition-all duration-700 group-hover:scale-125" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
                        <div className="space-y-3 md:space-y-4 w-full">
                            <div className="flex items-center gap-3 bg-white w-fit px-4 py-2 rounded-full border border-emerald-100 shadow-sm transition-transform hover:scale-110">
                                <Sparkles className="w-4 h-4 text-emerald-600" />
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">{statusText}</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.85] text-slate-900">
                                Welcome, <br className="xs:hidden" /><span className="text-emerald-600 font-black decoration-double underline decoration-emerald-200">{displayName}</span>
                            </h1>
                            <p className="text-slate-500 font-medium max-w-xl text-[10px] md:text-sm leading-relaxed uppercase tracking-widest pl-1">
                                Growth engine active. tracking breakthroughs.
                            </p>
                        </div>

                        <div className="w-full md:w-auto bg-white/40 backdrop-blur-xl border border-emerald-100/50 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex items-center gap-4 md:gap-6 shadow-sm cursor-default hover:bg-white transition-all transform hover:-translate-y-1">
                            <div className="bg-emerald-600 p-2.5 md:p-3 rounded-xl md:rounded-2xl shadow-emerald-200 shadow-xl text-white border border-emerald-500/20">
                                <Activity className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <span className="block text-[8px] md:text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1 pl-0.5">Focus Grade</span>
                                <span className="block text-lg md:text-2xl font-black text-slate-900 tracking-tight uppercase italic leading-none">{focusGrade}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-8 md:gap-12 items-start relative z-10">
                    {/* Feed Content */}
                    <div className="order-2 lg:order-1">
                        <MilestoneList />
                    </div>
                    {/* Interactive Form */}
                    <div className="order-1 lg:order-2 lg:sticky lg:top-32">
                        <MilestoneForm />
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default Dashboard;
