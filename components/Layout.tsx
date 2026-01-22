
import React from 'react';
import { Icons } from '../constants';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  user: User;
  onOpenWallet?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, cartCount, user, onOpenWallet }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col pb-20 md:pb-0 transition-colors duration-300">
      {/* Desktop Header */}
      <header className="hidden md:flex sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 items-center justify-between px-8 py-4 animate-slide-up">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-primary tracking-tight cursor-pointer" onClick={() => onTabChange('home')}>LUXE.</h1>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <button onClick={() => onTabChange('home')} className={activeTab === 'home' ? 'text-primary font-bold' : 'hover:text-primary transition-colors'}>Home</button>
            <button onClick={() => onTabChange('feed')} className={activeTab === 'feed' ? 'text-primary font-bold' : 'hover:text-primary transition-colors'}>Community</button>
            <button onClick={() => onTabChange('search')} className={activeTab === 'search' ? 'text-primary font-bold' : 'hover:text-primary transition-colors'}>Catalog</button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Floating Balance Indicator */}
          <button 
            onClick={onOpenWallet}
            className="flex items-center gap-2 bg-accent-success/10 text-accent-success px-4 py-2 rounded-full border border-accent-success/20 hover:bg-accent-success/20 transition-all group"
          >
            <span className="text-xs font-bold">💰 ${user.balance.toFixed(2)}</span>
            <div className="w-1 h-1 rounded-full bg-accent-success animate-pulse"></div>
          </button>

          <button onClick={() => onTabChange('messages')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative group">
            <Icons.Message />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full border border-white dark:border-slate-900"></span>
          </button>

          <button onClick={() => onTabChange('cart')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative group">
            <Icons.Cart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border border-white dark:border-slate-900">
                {cartCount}
              </span>
            )}
          </button>

          <button onClick={() => onTabChange('profile')} className="flex items-center gap-3 pl-4 border-l border-slate-100 dark:border-slate-800 hover:opacity-80 transition-opacity">
            <div className="text-right hidden lg:block">
              <div className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</div>
              <div className="text-[10px] text-slate-400 font-medium">Luxe Partner</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden ring-2 ring-slate-50 dark:ring-slate-700 shadow-sm">
               <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 animate-slide-up sticky top-0 z-50">
        <h1 className="text-xl font-bold text-primary tracking-tight" onClick={() => onTabChange('home')}>LUXE.</h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenWallet}
            className="flex items-center gap-1.5 bg-accent-success/10 text-accent-success px-3 py-1.5 rounded-full border border-accent-success/20"
          >
            <span className="text-[10px] font-bold">${user.balance.toFixed(0)}</span>
          </button>
          <button onClick={() => onTabChange('notifications')} className="relative p-1">
            <Icons.Notification />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full md:py-8 px-0 sm:px-4">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 flex items-center justify-around py-3 px-2 z-50 animate-slide-up shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
        <NavButton active={activeTab === 'home'} onClick={() => onTabChange('home')} icon={<Icons.Home />} label="Home" />
        <NavButton active={activeTab === 'feed'} onClick={() => onTabChange('feed')} icon={<Icons.Share />} label="Feed" />
        <NavButton active={activeTab === 'cart'} onClick={() => onTabChange('cart')} icon={<Icons.Cart />} label="Cart" badge={cartCount} />
        <NavButton active={activeTab === 'messages'} onClick={() => onTabChange('messages')} icon={<Icons.Message />} label="Inbox" />
        <NavButton active={activeTab === 'profile'} onClick={() => onTabChange('profile')} icon={<Icons.Profile />} label="Profile" />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; badge?: number }> = ({ active, onClick, icon, label, badge }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all relative ${active ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
  >
    <div className={`${active ? 'scale-110' : 'scale-100'} transition-transform`}>{icon}</div>
    <span className={`text-[10px] font-bold tracking-tighter uppercase ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
    {badge ? badge > 0 && (
      <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white dark:border-slate-900">
        {badge}
      </span>
    ) : null}
  </button>
);

export default Layout;
