import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Trophy, Mail, Lock, ArrowRight, Github, Chrome, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    const { login, user, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) return null;
    if (user) return <Navigate to="/dashboard" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        setAuthLoading(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setLocalError(result.message);
            }
        } catch (err) {
            setLocalError('An unexpected error occurred');
        } finally {
            setAuthLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans overflow-hidden">
            {/* Left Section: Branding & Stats (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 relative flex-col justify-center items-center p-12 text-white overflow-hidden">
                {/* Background Gradient & Animated Mesh */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-900" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -ml-48 -mb-48" />

                <div className="relative z-10 max-w-lg space-y-12 animate-fade-in-up">
                    {/* Brand Identity */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl">
                            <Trophy className="w-12 h-12 text-emerald-400" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
                                Milestone <span className="text-emerald-400">Intelligence</span>
                            </h1>
                            <p className="text-emerald-400/60 font-black text-[10px] uppercase tracking-[0.4em]">Integrated Success Engine</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-4xl font-black tracking-tight leading-tight uppercase italic">
                            Welcome to the <br />
                            <span className="text-emerald-400 underline decoration-emerald-800/50 underline-offset-8">Execution Engine</span>
                        </h2>
                        <p className="text-slate-400 font-medium text-lg leading-relaxed italic border-l-4 border-emerald-500/30 pl-6">
                            "Unlock your professional potential with AI-driven insights. Your career journey evolves here."
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="flex items-center gap-12 pt-12 border-t border-white/5">
                        <div className="space-y-1">
                            <span className="block text-3xl font-black text-white italic">1,000+</span>
                            <span className="block text-[9px] font-black uppercase tracking-widest text-slate-500">Pioneers Active</span>
                        </div>
                        <div className="w-px h-12 bg-white/5" />
                        <div className="space-y-1">
                            <span className="block text-3xl font-black text-emerald-400 italic">95%</span>
                            <span className="block text-[9px] font-black uppercase tracking-widest text-slate-500">Success Trajectory</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section: Auth Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-10 md:px-20 py-12 bg-white relative">
                {/* Back Link */}
                <Link
                    to="/"
                    className="absolute top-8 left-6 md:top-10 md:left-20 flex items-center gap-2 text-[9px] md:text-[10px] font-black text-slate-400 hover:text-emerald-600 uppercase tracking-widest transition-colors group"
                >
                    <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Back to Matrix
                </Link>

                <div className="w-full max-w-sm space-y-8 md:space-y-10 animate-fade-in-up mt-8 md:mt-0">
                    {/* Small Header for Mobile Only */}
                    <div className="lg:hidden text-center space-y-3 mb-8">
                        <div className="bg-slate-900 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-200/20">
                            <Trophy className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Milestone AI</h1>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase italic leading-none">Sign in to your account</h2>
                        <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-0.5">Start managing your profile and applications</p>
                    </div>

                    {/* Social Login Placeholders */}
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3.5 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 text-sm shadow-sm active:scale-[0.98]">
                            <Chrome className="w-5 h-5 text-emerald-600" />
                            <span>Login with Google</span>
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                        <div className="relative flex justify-center text-[9px] font-black uppercase tracking-widest"><span className="bg-white px-4 text-slate-300">Or continue with</span></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                            <div className="relative focus-within:ring-2 focus-within:ring-emerald-500/10 rounded-2xl transition-all">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="user@vault.com"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 placeholder:text-slate-300 focus:outline-none focus:border-emerald-500 transition-all text-slate-900 font-bold"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                                <button type="button" className="text-[10px] font-bold text-emerald-600 hover:underline uppercase tracking-widest">Forgot password?</button>
                            </div>
                            <div className="relative focus-within:ring-2 focus-within:ring-emerald-500/10 rounded-2xl transition-all">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-12 py-4 placeholder:text-slate-300 focus:outline-none focus:border-emerald-500 transition-all text-slate-900 font-bold"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-emerald-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {localError && (
                            <div className="bg-rose-50 text-rose-600 text-[10px] font-black py-4 px-6 rounded-2xl border border-rose-100 animate-shake">
                                ⚠️ Execution Error: {localError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-100 text-white font-black py-5 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl shadow-emerald-200/50 group"
                        >
                            {authLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span className="uppercase tracking-[0.2em] text-xs">Sign In</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-6 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Don't have an account? {' '}
                            <Link to="/register" className="text-emerald-600 hover:underline font-black">Sign up for free</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
