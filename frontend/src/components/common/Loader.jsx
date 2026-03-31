import { Loader2 } from 'lucide-react';

const Loader = ({ fullPage = false }) => {
    if (fullPage) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                    <p className="text-slate-500 font-medium animate-pulse">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center p-8 w-full">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
    );
};

export default Loader;
