
import React, { useState } from 'react';
import { Icons, MOCK_PRODUCTS, MOCK_VENDORS, MOCK_CREATORS } from '../constants';
import { Product, Creator } from '../types';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface SocialFeedPageProps {
  onProductClick: (product: Product) => void;
  onCreatorClick: (creator: Creator) => void;
}

const SocialFeedPage: React.FC<SocialFeedPageProps> = ({ onProductClick, onCreatorClick }) => {
  const [activeCategory, setActiveCategory] = useState('For You');

  const categories = ['For You', 'Following', 'Vendor Drops', 'Reviews'];

  // Mock community posts with expanded creator data
  const posts = [
    {
      id: 'p1',
      author: 'Marcus Chen',
      avatar: MOCK_CREATORS[0].avatar,
      type: 'Expert Recommendation',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop',
      caption: 'The limited edition Stealth Black series has finally arrived. Trust me, the noise cancelling is elite.',
      likes: 1240,
      comments: 48,
      product: MOCK_PRODUCTS[0],
      creator: MOCK_CREATORS[0],
      // Fixed: Added missing timestamp property
      timestamp: '2h ago'
    },
    {
      id: 'p2',
      author: 'Sarah Jenkins',
      avatar: MOCK_CREATORS[1].avatar,
      type: 'Customer Review',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
      caption: 'Finally got my ChronoLuxe watch! The leather is incredibly soft.',
      likes: 85,
      comments: 12,
      product: MOCK_PRODUCTS[1],
      creator: MOCK_CREATORS[1],
      // Fixed: Added missing timestamp property
      timestamp: '5h ago'
    }
  ];

  return (
    <div className="px-4 md:px-0 max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Social Discoveries</h1>
        <div className="flex gap-2 bg-white dark:bg-slate-800 p-1 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {posts.map((post, idx) => (
          <div key={post.id} className="bg-white dark:bg-slate-800 rounded-[40px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-soft animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
             {/* Post Header */}
             <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onCreatorClick(post.creator)}>
                   <div className="relative">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden ring-1 ring-slate-100 dark:border-slate-700 shadow-sm transition-transform group-hover:scale-105">
                         <img src={post.avatar} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-accent-success text-white w-5 h-5 rounded-full flex items-center justify-center text-[8px] border-2 border-white dark:border-slate-800">
                         ✨
                      </div>
                   </div>
                   <div>
                      <div className="flex items-center gap-2">
                         <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{post.author}</h4>
                         <Badge variant="success">Creator</Badge>
                      </div>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{post.type}</span>
                   </div>
                </div>
                <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400"><Icons.Search /></button>
             </div>

             {/* Post Image with Overlay Product */}
             <div className="relative aspect-[4/5] sm:aspect-video overflow-hidden group">
                <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="" />
                
                {/* Shoppable Product Tag */}
                <div 
                  onClick={() => onProductClick(post.product)}
                  className="absolute bottom-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-4 cursor-pointer hover:bg-white dark:hover:bg-slate-900 transition-all transform hover:-translate-y-1 group/tag"
                >
                   <div className="relative">
                      <img src={post.product.image} className="w-14 h-14 rounded-xl object-cover" alt="" />
                      <div className="absolute -top-2 -right-2 bg-primary text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold animate-bounce">BUY</div>
                   </div>
                   <div className="pr-4">
                      <p className="text-[8px] font-bold text-primary uppercase tracking-tighter">Verified Luxe Item</p>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[140px]">{post.product.name}</h5>
                      <p className="text-xs font-bold text-slate-500">${post.product.price}</p>
                   </div>
                </div>

                <div className="absolute top-6 right-6 flex flex-col gap-3">
                   <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-all border border-white/20">
                      ❤️
                   </button>
                   <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-all border border-white/20">
                      <Icons.Share />
                   </button>
                </div>
             </div>

             {/* Post Actions & Caption */}
             <div className="p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                   <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 group">
                         <span className="text-rose-500 scale-125 group-hover:scale-150 transition-transform">❤️</span>
                         <span className="text-sm font-bold text-slate-900 dark:text-slate-300">{post.likes.toLocaleString()}</span>
                      </button>
                      <button className="flex items-center gap-2 group">
                         <span className="text-blue-500 scale-125 group-hover:scale-150 transition-transform">💬</span>
                         <span className="text-sm font-bold text-slate-900 dark:text-slate-300">{post.comments}</span>
                      </button>
                   </div>
                   
                   {/* Shoppable Actions Expansion */}
                   <div className="flex gap-2">
                      <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-all flex items-center gap-2">
                         <Icons.Message /> Chat AI About This
                      </button>
                      <button className="px-4 py-2 bg-accent-success/10 text-accent-success rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-accent-success hover:text-white transition-all">
                         Share & Earn 5%
                      </button>
                   </div>
                </div>
                
                <div className="space-y-2">
                   <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                      <span className="font-bold text-slate-900 dark:text-white mr-2">{post.author}</span>
                      {post.caption}
                   </p>
                   {/* Fixed: Property 'timestamp' now exists on post object */}
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.timestamp} • Posted from Beverly Hills</p>
                </div>

                <div className="pt-4 flex gap-4">
                   <Button variant="dark" fullWidth onClick={() => onProductClick(post.product)}>View Details</Button>
                   <Button variant="outline" fullWidth>Collect Item</Button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialFeedPage;
