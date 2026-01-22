
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Icons, MOCK_PRODUCTS, MOCK_VENDORS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';

interface HomePageProps {
  onProductClick: (product: Product) => void;
  onViewAll: () => void;
  onOpenMessages: () => void;
  onViewFeed: () => void;
  onAffiliateClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onProductClick, onViewAll, onOpenMessages, onViewFeed, onAffiliateClick }) => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds for demo

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-12 px-4 md:px-0 animate-fade-in pb-12">
      {/* Live Community Drops / Stories */}
      <section className="animate-slide-up">
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
           {MOCK_VENDORS.map(vendor => (
             <div key={vendor.id} className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-1 bg-gradient-to-tr from-primary to-rose-300 animate-spin-slow">
                    <div className="w-full h-full rounded-full border-4 border-white dark:border-slate-900 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img src={vendor.logo} className="w-full h-full object-cover" alt="" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-[8px] text-white font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest ring-2 ring-white dark:ring-slate-900">LIVE</div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter truncate w-20 text-center">{vendor.name}</span>
             </div>
           ))}
           <div className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer opacity-50 grayscale">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center">
                 <span className="text-2xl text-slate-300 dark:text-slate-600">+</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Post Drop</span>
           </div>
        </div>
      </section>

      {/* Banner Carousel */}
      <div className="relative h-56 md:h-80 rounded-[40px] overflow-hidden bg-gradient-to-br from-secondary to-slate-800 flex items-center p-8 md:p-16 animate-slide-up">
        <div className="space-y-4 max-w-md relative z-10 text-white">
          <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider animate-slide-in-right stagger-1">New Arrival</span>
          <h2 className="text-3xl md:text-5xl font-bold animate-slide-in-right stagger-2 leading-tight">The Stealth <br/>Collection</h2>
          <p className="text-slate-400 text-sm md:text-base animate-slide-in-right stagger-3">Experience unmatched performance and premium aesthetics.</p>
          <div className="animate-slide-up stagger-4 pt-2">
            <Button variant="primary" size="md" className="bg-white text-secondary hover:bg-primary hover:text-white border-none px-8 py-3 rounded-2xl shadow-xl">
              Browse Now
            </Button>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" 
          className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-60 md:opacity-100 grayscale hover:grayscale-0 transition-all duration-1000"
          alt="Banner" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/40 to-transparent"></div>
      </div>

      {/* Categories Icon Grid (Enhanced) */}
      <section className="animate-slide-up stagger-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Shop by Category</h3>
          <button onClick={onViewAll} className="text-primary font-bold text-sm hover:underline">See All</button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <div key={cat.id} className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-3xl ${cat.color} flex items-center justify-center text-2xl shadow-soft group-hover:scale-110 group-hover:shadow-lg transition-all`}>
                {cat.icon}
              </div>
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest text-center">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sales with Countdown */}
      <section className="animate-slide-up stagger-2 bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
           <div className="flex items-center gap-4">
              <div className="bg-primary text-white p-2 rounded-2xl shadow-lg shadow-primary/20 animate-pulse">
                ⚡
              </div>
              <div>
                <h3 className="text-xl font-bold dark:text-white">Flash Sales</h3>
                <p className="text-xs text-slate-500 font-medium">Limited time offers ending soon</p>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ending In:</span>
              <div className="flex gap-1.5 font-mono">
                {formatTime(timeLeft).split(':').map((unit, i) => (
                  <React.Fragment key={i}>
                    <span className="bg-secondary text-white px-3 py-1.5 rounded-xl font-bold text-lg shadow-lg">{unit}</span>
                    {i < 2 && <span className="text-secondary dark:text-white font-bold text-xl">:</span>}
                  </React.Fragment>
                ))}
              </div>
           </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.filter(p => p.isFlashSale).map((p, idx) => (
            <ProductCard key={p.id} product={p} onClick={onProductClick} index={idx} />
          ))}
          {/* Mock duplicate for visual grid fullness if needed */}
          {MOCK_PRODUCTS.filter(p => p.isFlashSale).length === 1 && (
             <ProductCard product={MOCK_PRODUCTS[0]} onClick={onProductClick} index={1} />
          )}
        </div>
      </section>

      {/* Earning / Affiliate Feature Entry */}
      <div 
        onClick={onAffiliateClick}
        className="bg-accent-success p-8 rounded-[40px] shadow-xl shadow-accent-success/20 flex flex-col md:flex-row items-center justify-between text-white cursor-pointer group hover:scale-[1.02] transition-all duration-500 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all"></div>
        <div className="relative z-10 space-y-2 text-center md:text-left">
           <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold uppercase">Earn $20+</span>
              <h3 className="text-3xl font-bold">Luxe Partner Program</h3>
           </div>
           <p className="text-accent-success-900 opacity-80 font-medium text-lg">Earn commission and credits by sharing your curated style with your circle.</p>
        </div>
        <div className="relative z-10 bg-white text-accent-success px-10 py-4 rounded-3xl font-bold shadow-lg group-hover:scale-110 transition-transform mt-4 md:mt-0">
           Open Dashboard
        </div>
      </div>

      {/* Trending Products */}
      <section className="animate-slide-up stagger-3">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Trending Now</h3>
          <button onClick={onViewAll} className="text-primary font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {MOCK_PRODUCTS.filter(p => p.isTrending).map((p, idx) => (
            <ProductCard key={p.id} product={p} onClick={onProductClick} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
