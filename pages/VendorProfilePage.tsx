
import React, { useState } from 'react';
import { Icons, MOCK_VENDORS, MOCK_PRODUCTS } from '../constants';
import { Product, Vendor } from '../types';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface VendorProfilePageProps {
  vendorId: string;
  onProductClick: (product: Product) => void;
  onBack: () => void;
  onOpenMessages: () => void;
}

const VendorProfilePage: React.FC<VendorProfilePageProps> = ({ vendorId, onProductClick, onBack, onOpenMessages }) => {
  const vendor = MOCK_VENDORS.find(v => v.id === vendorId);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'social' | 'about'>('products');

  if (!vendor) return <div className="p-20 text-center font-bold text-slate-400">Vendor not found</div>;

  const vendorProducts = MOCK_PRODUCTS.filter(p => p.vendorId === vendorId);

  return (
    <div className="animate-fade-in pb-20">
      {/* Cover Image */}
      <div className="relative h-48 md:h-80 w-full overflow-hidden">
        <img src={vendor.coverImage} className="w-full h-full object-cover" alt="Cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 md:top-8 md:left-8 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition-all border border-white/20"
        >
          <div className="rotate-180"><Icons.ChevronRight /></div>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 md:-mt-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Profile Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-slate-100 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white -mt-20 mb-4 ring-1 ring-slate-100">
                <img src={vendor.logo} className="w-full h-full object-cover" alt={vendor.name} />
              </div>
              <div className="space-y-1 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900">{vendor.name}</h1>
                  {vendor.isVerified && (
                    <div className="text-blue-500" title="Verified Vendor">
                       <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414z"/></svg>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
                  <Icons.Star filled />
                  <span>{vendor.rating} Rating</span>
                  <span>•</span>
                  <span>{(vendor.followerCount / 1000).toFixed(1)}k Followers</span>
                </div>
              </div>
              <div className="flex gap-3 w-full">
                <Button 
                  fullWidth 
                  variant={isFollowing ? 'outline' : 'primary'}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <button 
                  onClick={onOpenMessages}
                  className="p-3 bg-secondary text-white rounded-full hover:bg-primary transition-all shadow-lg active:scale-90"
                >
                  <Icons.Message />
                </button>
              </div>
            </div>

            {/* Vendor Stats */}
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Sales</p>
                <p className="font-bold text-slate-900">{vendor.stats.totalSales}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Feedback</p>
                <p className="font-bold text-accent-success">{vendor.stats.positiveFeedback}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Joined</p>
                <p className="font-bold text-slate-900">{vendor.joinedDate}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Response</p>
                <p className="font-bold text-slate-900">{vendor.stats.responseTime}</p>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 space-y-8 w-full">
             <div className="flex border-b border-slate-200">
                {['products', 'social', 'about'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
                      activeTab === tab ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-fade-in"></div>}
                  </button>
                ))}
             </div>

             {activeTab === 'products' && (
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-slide-up">
                 {vendorProducts.map((p, idx) => (
                   <ProductCard key={p.id} product={p} onClick={onProductClick} index={idx} />
                 ))}
               </div>
             )}

             {activeTab === 'social' && (
               <div className="space-y-8 animate-slide-up">
                  {vendor.socialPosts.length === 0 ? (
                    <div className="py-20 text-center text-slate-400 font-medium bg-white rounded-3xl border border-slate-100 shadow-soft">
                      This vendor hasn't posted any updates yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {vendor.socialPosts.map(post => (
                         <div key={post.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-soft group">
                            <div className="aspect-video overflow-hidden">
                              <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Post" />
                            </div>
                            <div className="p-6 space-y-4">
                               <p className="text-sm text-slate-700 leading-relaxed">{post.caption}</p>
                               <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                  <div className="flex gap-4">
                                     <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                                       <span className="text-rose-500">❤️</span> {post.likes}
                                     </button>
                                     <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                                       <span className="text-blue-500">💬</span> {post.comments}
                                     </button>
                                  </div>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase">{post.timestamp}</span>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
               </div>
             )}

             {activeTab === 'about' && (
               <div className="bg-white rounded-3xl p-10 shadow-soft border border-slate-100 space-y-8 animate-slide-up">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">About {vendor.name}</h2>
                    <p className="text-slate-600 leading-relaxed text-lg">{vendor.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                           <Icons.Search /> Verified Business
                        </h4>
                        <p className="text-sm text-slate-500">
                          {vendor.name} is a verified LUXE partner with a proven track record of excellent service and authentic premium products.
                        </p>
                     </div>
                     <div className="space-y-4">
                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                           <Icons.Message /> Support Policy
                        </h4>
                        <p className="text-sm text-slate-500">
                          We respond to all inquiries within 2 hours. Our dedicated team is committed to ensuring your total satisfaction with every purchase.
                        </p>
                     </div>
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfilePage;
