
import React from 'react';
import { Creator } from '../types';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { Icons } from '../constants';

interface CreatorOverlayProps {
  creator: Creator | null;
  onClose: () => void;
  onViewStorefront: () => void;
}

const CreatorOverlay: React.FC<CreatorOverlayProps> = ({ creator, onClose, onViewStorefront }) => {
  if (!creator) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden animate-slide-up border border-slate-100 dark:border-slate-800">
        <div className="h-24 bg-gradient-to-r from-primary/10 to-rose-400/10"></div>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-all">
           <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="px-8 pb-10 flex flex-col items-center -mt-12 text-center">
           <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl bg-slate-200">
              <img src={creator.avatar} className="w-full h-full object-cover" alt="" />
           </div>
           
           <div className="mt-4 space-y-1">
              <h2 className="text-2xl font-bold dark:text-white">{creator.name}</h2>
              <p className="text-primary font-bold text-sm tracking-tight">{creator.username}</p>
           </div>

           <div className="flex gap-2 mt-4 flex-wrap justify-center">
              {creator.badges.map(badge => (
                <Badge key={badge} variant={badge === 'Top Earner' ? 'primary' : 'success'}>{badge}</Badge>
              ))}
           </div>

           <div className="grid grid-cols-2 gap-8 w-full mt-8 py-6 border-y border-slate-50 dark:border-slate-800">
              <div className="text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reputation</p>
                 <p className="text-lg font-bold text-slate-900 dark:text-white">{creator.reputationScore}</p>
              </div>
              <div className="text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Followers</p>
                 <p className="text-lg font-bold text-slate-900 dark:text-white">{(creator.followerCount / 1000).toFixed(1)}k</p>
              </div>
           </div>

           <div className="flex gap-3 w-full mt-8">
              <Button fullWidth onClick={onViewStorefront}>Visit Storefront</Button>
              <button className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                 <Icons.Message />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorOverlay;
