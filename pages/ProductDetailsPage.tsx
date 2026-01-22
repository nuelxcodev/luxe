
import React, { useState } from 'react';
import { Product } from '../types';
import { Icons } from '../constants';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface ProductDetailsPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onGoBack: () => void;
  onOpenMessages: () => void;
  onVendorClick: (vendorId: string) => void;
  showToast: (msg: string, type?: 'success' | 'info') => void;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ product, onAddToCart, onGoBack, onOpenMessages, onVendorClick, showToast }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(product.image);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const adjustQty = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const copyAffiliateLink = () => {
    const link = `https://luxe.com/p/${product.id}?ref=ALEX-PRO`;
    navigator.clipboard.writeText(link);
    showToast("Affiliate link copied! You'll earn 5% on sales.", "success");
    setShareModalOpen(false);
  };

  const estimatedEarning = product.price * (product.commissionRate || 0.05);

  return (
    <div className="px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in pb-20 dark:text-white">
      <div className="space-y-6">
        <div className="aspect-square rounded-[40px] overflow-hidden bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-soft animate-slide-up relative group">
          <img 
            src={activeImg} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-zoom-in" 
            alt={product.name} 
          />
        </div>
        
        {/* Social Proof Bar */}
        <div className="bg-slate-900 dark:bg-slate-800 text-white p-4 rounded-3xl flex items-center justify-between animate-slide-up stagger-1">
           <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden ring-1 ring-white/10">
                   <img src={`https://picsum.photos/seed/user${i}/50/50`} alt="" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-primary flex items-center justify-center text-[10px] font-bold">+12</div>
           </div>
           <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Recently purchased by community</p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar animate-slide-up stagger-2">
           {[product.image, ...[1, 2, 3].map(i => `https://picsum.photos/seed/${product.id}${i}/600/600`)].map((img, i) => (
             <div 
                key={i} 
                onClick={() => setActiveImg(img)}
                className={`w-24 h-24 shrink-0 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${activeImg === img ? 'border-primary shadow-lg shadow-primary/20 scale-105' : 'border-slate-100 dark:border-slate-700 opacity-60'}`}
             >
                <img src={img} className="w-full h-full object-cover" alt="Thumb" />
             </div>
           ))}
        </div>
      </div>

      <div className="space-y-8 animate-slide-in-right">
        <nav className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest">
          <button onClick={onGoBack} className="hover:text-primary transition-colors">Home</button>
          <span>/</span>
          <span className="text-slate-600 dark:text-slate-300">{product.category}</span>
        </nav>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => onVendorClick(product.vendorId)}
              className="flex items-center gap-2 cursor-pointer group w-fit"
            >
              <div className="w-6 h-6 rounded-full bg-slate-100 overflow-hidden ring-1 ring-slate-200">
                 <img src={`https://picsum.photos/seed/${product.vendorId}/50/50`} className="w-full h-full object-cover" alt="" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                {product.sellerName || 'Verified Seller'}
              </span>
            </div>
            
            {/* Earnings Tooltip Preview */}
            <div className="relative group/tooltip">
               <button className="flex items-center gap-2 bg-accent-success/10 text-accent-success px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all">
                  💰 Earn ${estimatedEarning.toFixed(2)}
               </button>
               <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] p-2 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  Earn this when someone buys via your link
               </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">{product.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Icons.Star key={i} filled={i < Math.floor(product.rating)} />)}
              <span className="text-sm font-bold ml-2">{product.rating}</span>
            </div>
            <span className="text-slate-400 text-sm">|</span>
            <span className="text-slate-400 text-sm font-medium">{product.reviews} reviews from circle</span>
          </div>
          <div className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</div>
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">{product.description}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button 
            onClick={() => onAddToCart(product, quantity)}
            variant="dark"
            fullWidth
            leftIcon={<Icons.Cart />}
            className="py-4 rounded-2xl"
          >
            Add to Cart
          </Button>
          <Button variant="primary" fullWidth className="py-4 rounded-2xl text-lg">
            Buy Now
          </Button>
        </div>

        {/* Share & Earn Button (Added Feature) */}
        <button 
          onClick={() => setShareModalOpen(true)}
          className="w-full py-4 bg-accent-success/5 dark:bg-accent-success/10 border-2 border-dashed border-accent-success/30 rounded-2xl flex items-center justify-center gap-3 text-accent-success font-bold hover:bg-accent-success hover:text-white transition-all group"
        >
          <Icons.Share /> Share & Earn ${estimatedEarning.toFixed(2)} Commission
        </button>

        {/* Community Buzz */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-700">
           <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
              Community Buzz
              <button className="text-[10px] text-primary font-bold uppercase hover:underline">View All</button>
           </h4>
           <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                 <img src="https://picsum.photos/seed/user5/40/40" className="w-10 h-10 rounded-xl" alt="" />
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-xs font-bold text-slate-900 dark:text-white">Sarah Jenkins</span>
                       <Badge variant="success">Verified Buyer</Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Absolutely elite. The best I've owned.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Share & Earn Modal (Additive) */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShareModalOpen(false)} />
           <div className="relative bg-white dark:bg-slate-900 rounded-[32px] p-8 max-w-sm w-full shadow-2xl animate-slide-up text-center space-y-6">
              <div className="w-20 h-20 bg-accent-success/10 text-accent-success rounded-full flex items-center justify-center mx-auto text-3xl">
                 💰
              </div>
              <div className="space-y-2">
                 <h3 className="text-2xl font-bold dark:text-white">Share & Earn</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400">Share this link with your friends. If they buy, you earn a <span className="text-accent-success font-bold">$15.00</span> commission!</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 text-xs font-mono text-primary truncate">
                 luxe.com/p/1?ref=ALEX-PRO
              </div>
              <Button fullWidth onClick={copyAffiliateLink}>Copy Link & Close</Button>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
