
import React, { useState } from 'react';
import { User, Transaction } from '../types';
import { Icons, MOCK_LEADERBOARD } from '../constants';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface AffiliateDashboardProps {
  user: User;
  onBack: () => void;
  showToast: (msg: string, type?: 'success' | 'info') => void;
  onLeaderboardClick: () => void;
}

const AffiliateDashboard: React.FC<AffiliateDashboardProps> = ({ user, onBack, showToast, onLeaderboardClick }) => {
  const [activeTab, setActiveTab] = useState<'earnings' | 'referrals' | 'performance'>('earnings');

  const copyReferral = () => {
    navigator.clipboard.writeText(`https://luxe.com/join?ref=${user.referralCode}`);
    showToast("Referral link copied to clipboard!", "success");
  };

  return (
    <div className="px-4 md:px-0 max-w-4xl mx-auto space-y-8 animate-fade-in pb-20 dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors rotate-180">
            <Icons.ChevronRight />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Partner Dashboard</h1>
            <p className="text-slate-500 text-sm font-medium">Grow your collection by sharing the Luxe experience.</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onLeaderboardClick} leftIcon={<span>🏆</span>}>Leaderboard</Button>
      </div>

      {/* Main Earning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-secondary p-8 rounded-[32px] text-white space-y-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Available Credits</p>
          <h2 className="text-4xl font-bold text-primary">${user.balance.toFixed(2)}</h2>
          <Button variant="primary" fullWidth size="sm" className="rounded-xl">Withdraw Funds</Button>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-soft col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Total Career Earnings</p>
                <h3 className="text-2xl font-bold">${user.totalEarned.toFixed(2)}</h3>
             </div>
             <div className="flex gap-2">
                <Badge variant="success">Luxe Partner</Badge>
                <Badge variant="primary">Level 4</Badge>
             </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-50 dark:border-slate-700">
             <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Clicks</p>
                <p className="font-bold text-lg">{user.affiliateStats.clicks}</p>
             </div>
             <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Sales</p>
                <p className="font-bold text-lg">{user.affiliateStats.referrals}</p>
             </div>
             <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Conversion</p>
                <p className="font-bold text-lg text-accent-success">{user.affiliateStats.conversionRate}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 dark:border-slate-800">
        {['earnings', 'referrals', 'performance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
              activeTab === tab ? 'text-primary' : 'text-slate-400'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
          </button>
        ))}
      </div>

      <div className="animate-slide-up">
        {activeTab === 'earnings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <Icons.Cart /> Earnings History
              </h3>
              <div className="space-y-4">
                {user.transactions.map((t, idx) => (
                  <div key={t.id} className={`bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent-success/10 text-accent-success flex items-center justify-center font-bold">↑</div>
                      <div>
                        <p className="text-sm font-bold dark:text-slate-200">{t.description}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{t.date}</p>
                      </div>
                    </div>
                    <div className="font-bold text-accent-success">+${t.amount.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
               <h3 className="font-bold text-xl flex items-center gap-2"><Icons.Search /> Potential Rewards</h3>
               <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6">
                  <div className="space-y-2">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Verification</p>
                     <h4 className="text-2xl font-bold">${user.pendingEarnings.toFixed(2)}</h4>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed italic">"These earnings will be added to your balance once the 30-day return window for the referenced orders has closed."</p>
                  <Button variant="outline" fullWidth className="text-white border-white/20">View Breakdown</Button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'referrals' && (
          <div className="space-y-8">
             <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 p-8 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-bold">Invite a Friend, Get $20</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">When your friends shop for the first time, you both get credit.</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 font-mono font-bold text-primary">
                      {user.referralCode}
                  </div>
                  <Button onClick={copyReferral}>Copy</Button>
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                        <img src={`https://picsum.photos/seed/ref${i}/100/100`} alt="" />
                     </div>
                     <div>
                        <p className="text-sm font-bold dark:text-slate-200">Friend #{i+12}</p>
                        <p className="text-[10px] font-bold text-accent-success uppercase">Registered</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 space-y-6">
                   <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Weekly Clicks</h4>
                   <div className="h-40 flex items-end gap-2">
                      {[45, 67, 32, 89, 54, 76, 90].map((v, i) => (
                        <div key={i} className="flex-1 bg-primary/10 rounded-t-lg group relative cursor-pointer hover:bg-primary transition-all" style={{ height: `${v}%` }}>
                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">{v} clicks</div>
                        </div>
                      ))}
                   </div>
                   <p className="text-xs text-slate-500 text-center font-bold uppercase tracking-widest">Last 7 Days</p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 space-y-6">
                   <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Best Selling Category</h4>
                   <div className="space-y-4">
                      {['Electronics', 'Accessories', 'Home Office'].map((cat, i) => (
                        <div key={cat} className="space-y-1.5">
                           <div className="flex justify-between text-xs font-bold">
                              <span>{cat}</span>
                              <span className="text-primary">{75 - (i*20)}%</span>
                           </div>
                           <div className="h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${75 - (i*20)}%` }}></div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AffiliateDashboard;
