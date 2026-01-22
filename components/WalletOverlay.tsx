
import React from 'react';
import { User } from '../types';
import Button from './ui/Button';
import { Icons } from '../constants';

interface WalletOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  showToast: (msg: string) => void;
}

const WalletOverlay: React.FC<WalletOverlayProps> = ({ isOpen, onClose, user, showToast }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-[32px] sm:rounded-[40px] shadow-2xl overflow-hidden animate-slide-up max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-accent-success/10 rounded-xl text-accent-success">
                <Icons.Cart />
             </div>
             <h2 className="text-xl font-bold dark:text-white">Luxe Wallet</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Main Balance */}
          <div className="bg-secondary dark:bg-slate-800 p-8 rounded-[32px] text-white space-y-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
             <div className="relative z-10 space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Balance</p>
                <h3 className="text-5xl font-bold text-white">${user.balance.toFixed(2)}</h3>
             </div>
             <div className="flex gap-4 relative z-10">
                <div className="flex-1 space-y-1">
                   <p className="text-[10px] font-bold text-slate-500 uppercase">Pending</p>
                   <p className="text-lg font-bold text-accent-success">+${user.pendingEarnings.toFixed(2)}</p>
                </div>
                <div className="flex-1 space-y-1">
                   <p className="text-[10px] font-bold text-slate-500 uppercase">Total Earned</p>
                   <p className="text-lg font-bold text-slate-200">${user.totalEarned.toFixed(2)}</p>
                </div>
             </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
             <Button variant="primary" size="lg" className="rounded-2xl" onClick={() => showToast("Withdrawal process started.")}>Withdraw</Button>
             <Button variant="outline" size="lg" className="rounded-2xl dark:border-slate-700 dark:text-slate-300">Statement</Button>
          </div>

          {/* Recent Activity */}
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">Recent Activity</h4>
                <button className="text-[10px] font-bold text-primary hover:underline">View All</button>
             </div>
             <div className="space-y-2">
                {user.transactions.slice(0, 3).map((t) => (
                  <div key={t.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'withdrawal' ? 'bg-slate-100 text-slate-500' : 'bg-accent-success/10 text-accent-success'}`}>
                           {t.type === 'withdrawal' ? '↓' : '↑'}
                        </div>
                        <div>
                           <p className="text-sm font-bold dark:text-slate-200">{t.description}</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase">{t.date}</p>
                        </div>
                     </div>
                     <p className={`font-bold text-sm ${t.type === 'withdrawal' ? 'text-slate-400' : 'text-accent-success'}`}>
                        {t.type === 'withdrawal' ? '-' : '+'}${t.amount.toFixed(2)}
                     </p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-800 text-center">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Withdrawals are processed every Friday</p>
        </div>
      </div>
    </div>
  );
};

export default WalletOverlay;
