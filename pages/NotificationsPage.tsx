
import React from 'react';
import { MOCK_NOTIFICATIONS } from '../constants';
import { Icons } from '../constants';

const NotificationsPage: React.FC = () => {
  return (
    <div className="px-4 md:px-0 max-w-2xl mx-auto space-y-8 animate-fade-in">
       <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
          <button className="text-primary text-sm font-bold hover:underline">Mark all as read</button>
       </div>
       <div className="space-y-4">
         {MOCK_NOTIFICATIONS.length === 0 ? (
           <div className="text-center py-20 text-slate-400">No notifications yet.</div>
         ) : (
           MOCK_NOTIFICATIONS.map(n => (
             <div 
               key={n.id} 
               className={`p-5 rounded-card border transition-all ${n.isRead ? 'bg-white border-slate-100' : 'bg-secondary text-white border-slate-800 shadow-xl scale-[1.01]'}`}
             >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${n.isRead ? 'bg-slate-100 text-slate-500' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}>
                    <Icons.Notification />
                  </div>
                  <div className="space-y-1.5 flex-1">
                     <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm">{n.title}</h4>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${n.isRead ? 'text-slate-400' : 'text-slate-300'}`}>1h ago</span>
                     </div>
                     <p className={`text-sm leading-relaxed ${n.isRead ? 'text-slate-500' : 'text-slate-200'}`}>{n.message}</p>
                  </div>
                </div>
             </div>
           ))
         )}
       </div>
    </div>
  );
};

export default NotificationsPage;
