
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { Icons } from '../constants';

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 md:p-6 transition-colors duration-500">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-slate-100 dark:border-slate-800">
        {/* Left Side - Promo/Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-secondary text-white p-12 flex-col justify-between relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=800" 
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            alt="Premium"
          />
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 tracking-tighter">LUXE.</h2>
            <p className="text-slate-400 font-medium leading-relaxed">Elevate your lifestyle with our premium curated collection.</p>
          </div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-3xl font-bold leading-tight">Join the <br/> elite circle.</h3>
            <p className="text-sm text-slate-400">Exclusive access to flash sales and early collection drops.</p>
            <div className="flex -space-x-3 overflow-hidden pt-4">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/auth${i}/50/50`} className="w-10 h-10 rounded-full border-2 border-secondary" alt="" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-secondary bg-primary flex items-center justify-center text-[10px] font-bold">+5k</div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {isLogin ? 'Enter your credentials to continue.' : 'Start your premium shopping journey today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all dark:text-white"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="alex@example.com"
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all dark:text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all dark:text-white"
              />
            </div>
            
            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-xs font-bold text-primary hover:underline">Forgot password?</button>
              </div>
            )}

            <Button type="submit" fullWidth isLoading={isLoading} size="lg" className="rounded-2xl py-4 text-lg mt-4 shadow-2xl">
              {isLogin ? 'Login to Account' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-10 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
              <div className="relative flex justify-center text-xs"><span className="px-3 bg-white dark:bg-slate-900 text-slate-400 font-bold uppercase tracking-widest">Or continue with</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-4 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-sm dark:text-white">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-4 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-sm dark:text-white">
                <span className="text-xl"></span>
                Apple
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-bold hover:underline"
              >
                {isLogin ? 'Sign up for free' : 'Login instead'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
