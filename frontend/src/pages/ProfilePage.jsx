import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import Layout from '../components/layout/Layout';
import ProfileCard from '../components/dashboard/ProfileCard';
import AnalyticsCard from '../components/dashboard/AnalyticsCard';
import { Settings, Shield, Bell, CreditCard, PieChart } from 'lucide-react';

const ProfilePage = () => {
    const { user, loading } = useAuth();

    if (loading) return <Loader fullPage={true} />;
    if (!user) return <Navigate to="/login" replace />;

    const settingsOptions = [
        { icon: Settings, label: 'Account Settings', desc: 'Manage your profile and email' },
        { icon: Shield, label: 'Security & Privacy', desc: 'Password and two-factor auth' },
        { icon: Bell, label: 'Notifications', desc: 'Configure your alerts' },
        { icon: CreditCard, label: 'Billing', desc: 'Manage your pro subscription' },
    ];

    return (
        <Layout>
            <main className="p-4 md:p-8 lg:p-12 space-y-8 md:space-y-12 max-w-7xl mx-auto w-full animate-fade-in-up">
                <header className="space-y-2 md:space-y-4">
                    <div className="flex items-center gap-3">
                        <PieChart className="w-4 h-4 text-emerald-600" />
                        <h3 className="text-[9px] md:text-[11px] font-black text-emerald-600 uppercase tracking-[0.3em] leading-none">Identity & Insights</h3>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Personal Hub</h2>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-8 md:gap-12 items-start">
                    {/* Analytics Section - Top on Mobile, Right on Desktop */}
                    <div className="xl:sticky xl:top-32 order-1 xl:order-2">
                       <AnalyticsCard />
                    </div>

                    {/* Management Section */}
                    <div className="space-y-10 md:space-y-12 order-2 xl:order-1">
                        <ProfileCard />
                        
                        <div className="space-y-6">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] px-2 opacity-60">Management Terminal</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                {settingsOptions.map((opt, i) => (
                                    <div key={i} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200/60 shadow-premium hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-300 group cursor-pointer">
                                        <div className="flex items-start gap-4 md:gap-5">
                                            <div className="bg-slate-50 p-2.5 md:p-3 rounded-xl text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm border border-slate-100">
                                                <opt.icon className="w-4 h-4 md:w-5 md:h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs md:text-sm font-black text-slate-900 tracking-tight uppercase italic">{opt.label}</h4>
                                                <p className="text-[9px] md:text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1 leading-tight">{opt.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default ProfilePage;
