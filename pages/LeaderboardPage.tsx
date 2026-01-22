
import React from 'react';
import { MOCK_LEADERBOARD, Icons } from '../constants';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

interface LeaderboardPageProps {
  onBack: () => void;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ onBack }) => {
  return (
    <div className="px-4 md:px-0 max-w-2xl mx-auto space-y-12 animate-fade-in pb-20 dark:text-white">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors rotate-180">
          <Icons.ChevronRight />
        </button>
        <h1 className="text-3xl font-bold">Top Earners</h1>
      </div>

      <div className="bg-secondary dark:bg-slate-800 p-8 rounded-[40px] text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
         <div className="relative z-10">
            <div className="text-5xl mb-4">👑</div>
            <h2 className="text-2xl font-bold">This Week's Champion</h2>
            <p className="text-slate-400 mt-2 font-medium">Marcus Chen earned <span className="text-primary font-bold">$1,240.25</span> this week!</p>
         </div>
         <Button variant="primary" size="lg" className="relative z-10 rounded-2xl">Start Sharing & Rank Up</Button>
      </div>

      <div className="space-y-4">
        {MOCK_LEADERBOARD.map((entry, idx) => (
          <div 
            key={entry.id} 
            className={`p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-soft animate-slide-up`}
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
             <div className="flex items-center gap-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${idx < 3 ? 'text-primary' : 'text-slate-400'}`}>
                   #{entry.rank}
                </div>
                <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-slate-50 dark:ring-slate-800">
                   <img src={entry.avatar} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="space-y-0.5">
                   <p className="font-bold text-slate-900 dark:text-white">{entry.name}</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Level {10 - idx}</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-lg font-bold text-slate-900 dark:text-white">${entry.earnings.toLocaleString()}</p>
                <Badge variant="success">Verified</Badge>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;
