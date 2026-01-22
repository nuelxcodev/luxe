
import React from 'react';
import { Creator, Product } from '../types';
import { Icons, MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

interface StorefrontPageProps {
  creator: Creator;
  onBack: () => void;
  onProductClick: (p: Product) => void;
}

const StorefrontPage: React.FC<StorefrontPageProps> = ({ creator, onBack, onProductClick }) => {
  return (
    <div className="animate-fade-in pb-20 dark:text-white">
      {/* Creator Banner */}
      <div className="relative h-64 w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200" className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        <button onClick={onBack} className="absolute top-8 left-8 p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20">
           <div className="rotate-180"><Icons.ChevronRight /></div>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-8 -mt-20 relative z-10 space-y-12">
         <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-soft border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
               <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-200">
                  <img src={creator.avatar} className="w-full h-full object-cover" alt="" />
               </div>
               <div className="space-y-2">
                  <div className="flex items-center gap-3">
                     <h1 className="text-3xl font-bold">{creator.name}</h1>
                     <Badge variant="success">Pro Partner</Badge>
                  </div>
                  <p className="text-slate-500 font-medium">Curating the finest minimalist essentials for the modern home.</p>
               </div>
            </div>
            <div className="flex gap-4">
               <Button variant="primary">Follow Store</Button>
               <button className="p-4 bg-slate-100 dark:bg-slate-700 rounded-[24px] text-slate-700 dark:text-slate-300">
                  <Icons.Share />
               </button>
            </div>
         </div>

         <div className="space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-bold uppercase tracking-widest text-slate-400 text-xs">Curated Collection</h3>
               <span className="text-sm font-bold">{MOCK_PRODUCTS.length} Items</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
               {MOCK_PRODUCTS.map((p, idx) => (
                 <ProductCard key={p.id} product={p} onClick={onProductClick} index={idx} />
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default StorefrontPage;
