
import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Icons, MOCK_PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { GoogleGenAI } from "@google/genai";
import Button from '../components/ui/Button';

interface SearchPageProps {
  onProductClick: (product: Product) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onProductClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [groundingLinks, setGroundingLinks] = useState<any[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))], []);

  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsAiLoading(true);
    setAiResponse(null);
    setGroundingLinks([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `I am an expert premium shopper on LUXE. The user is looking for: "${searchQuery}". 
        Provide specific advice and mention if any products from our catalog [${MOCK_PRODUCTS.map(p => p.name).join(', ')}] fit perfectly.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      setAiResponse(response.text || "I found some great information for you.");
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) setGroundingLinks(chunks);
    } catch (err) {
      console.error("AI Search Error:", err);
      setAiResponse("I encountered an error trying to find intelligent recommendations.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="px-4 md:px-0 space-y-8 animate-fade-in dark:text-white pb-12">
       <div className="flex flex-col gap-8">
         {/* Search Header */}
         <div className="bg-white dark:bg-slate-800 p-6 md:p-10 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-soft space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">Discover <br className="md:hidden"/>Excellence</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Find your next premium collection piece with AI-powered insights.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                  <Icons.Search />
                </div>
                <input 
                  type="text" 
                  placeholder="Ask Gemini: 'Best luxury watches...'" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-3xl focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400 text-lg"
                />
              </div>
              <Button 
                onClick={handleAiSearch} 
                isLoading={isAiLoading}
                className="py-5 px-10 rounded-3xl text-lg h-full"
              >
                Intelligent Search
              </Button>
            </div>
         </div>

         <div className="flex flex-col lg:flex-row gap-8">
           {/* Desktop Sidebar Filters / Mobile Drawer Overlay */}
           <div className={`
             ${showFilters ? 'fixed inset-0 z-[100] flex justify-end lg:relative lg:inset-auto lg:z-auto lg:flex-none' : 'hidden lg:block'}
             lg:w-64 space-y-8 animate-fade-in
           `}>
             {/* Backdrop for mobile drawer */}
             {showFilters && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setShowFilters(false)} />}
             
             <div className={`
               bg-white dark:bg-slate-800 lg:bg-transparent h-full w-4/5 max-w-sm lg:w-full lg:h-auto p-8 lg:p-0 relative shadow-2xl lg:shadow-none animate-slide-in-right lg:animate-none
             `}>
               <div className="flex items-center justify-between mb-6 lg:hidden">
                 <h3 className="text-xl font-bold">Filters</h3>
                 <button onClick={() => setShowFilters(false)} className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full">✕</button>
               </div>

               <div className="space-y-10">
                 <div className="space-y-4">
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Categories</h4>
                   <div className="flex flex-col gap-2">
                     {categories.map(cat => (
                       <button 
                        key={cat}
                        onClick={() => { setActiveCategory(cat); if(showFilters) setShowFilters(false); }}
                        className={`text-left px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
                          activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                       >
                         {cat}
                       </button>
                     ))}
                   </div>
                 </div>

                 <div className="space-y-4">
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price Range</h4>
                   <div className="space-y-6">
                      <div className="h-1 bg-slate-100 dark:bg-slate-700 rounded-full relative">
                        <div className="absolute inset-y-0 left-0 right-1/4 bg-primary rounded-full"></div>
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-lg"></div>
                        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-lg"></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>$0</span>
                        <span>$1000+</span>
                      </div>
                   </div>
                 </div>

                 <div className="space-y-4">
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ratings</h4>
                   {[4, 3, 2, 1].map(star => (
                     <label key={star} className="flex items-center gap-3 cursor-pointer group">
                       <input type="checkbox" className="w-5 h-5 rounded-md border-slate-200 text-primary focus:ring-primary/20" />
                       <span className="flex gap-1 text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
                         {star}+ <Icons.Star filled />
                       </span>
                     </label>
                   ))}
                 </div>

                 <Button variant="dark" fullWidth onClick={() => setShowFilters(false)}>Apply Filters</Button>
               </div>
             </div>
           </div>

           {/* Main Catalog Area */}
           <div className="flex-1 space-y-8">
             {/* AI Response Area (Inline) */}
             {(aiResponse || isAiLoading) && (
               <div className="bg-secondary dark:bg-slate-900 text-white p-8 md:p-12 rounded-[40px] shadow-2xl space-y-6 animate-slide-up relative overflow-hidden border border-white/5 mb-8">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                 
                 <div className="flex items-center gap-4 mb-2 relative z-10">
                   <div className="w-12 h-12 bg-gradient-to-br from-primary to-rose-400 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3">
                     <span className="text-xl">✨</span>
                   </div>
                   <div>
                      <h3 className="font-bold uppercase tracking-[0.2em] text-[10px] text-primary">Gemini Assistant</h3>
                      <p className="text-xl font-bold">Smart Shopping Advice</p>
                   </div>
                 </div>
                 
                 {isAiLoading ? (
                   <div className="space-y-3 relative z-10">
                     <div className="h-5 bg-white/10 rounded-full w-full animate-pulse"></div>
                     <div className="h-5 bg-white/10 rounded-full w-[90%] animate-pulse"></div>
                     <div className="h-5 bg-white/10 rounded-full w-[70%] animate-pulse"></div>
                   </div>
                 ) : (
                   <div className="space-y-6 relative z-10">
                     <div className="prose prose-invert max-w-none">
                        <p className="text-slate-300 leading-relaxed text-lg">{aiResponse}</p>
                     </div>
                     
                     {groundingLinks.length > 0 && (
                       <div className="pt-8 border-t border-white/10 space-y-4">
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Knowledge Sources</p>
                         <div className="flex flex-wrap gap-3">
                           {groundingLinks.map((chunk, idx) => chunk.web && (
                             <a 
                              key={idx} 
                              href={chunk.web.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-xs text-primary hover:text-white transition-all flex items-center gap-2"
                             >
                               <div className="scale-75"><Icons.Search /></div>
                               {chunk.web.title || 'Source'}
                             </a>
                           ))}
                         </div>
                       </div>
                     )}
                   </div>
                 )}
               </div>
             )}

             {/* Catalog Header */}
             <div className="flex items-center justify-between">
               <div className="flex items-end gap-3">
                  <h2 className="text-2xl font-bold">Results</h2>
                  <span className="text-slate-400 font-bold text-sm mb-1">{filteredProducts.length} Items</span>
               </div>
               <div className="flex items-center gap-4">
                 <button 
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300"
                 >
                   <Icons.Filter /> Filters
                 </button>
                 <select className="bg-transparent dark:text-white text-xs font-bold focus:ring-0 cursor-pointer border-none outline-none hidden md:block">
                   <option>Sort: Most Relevant</option>
                   <option>Price: Low to High</option>
                   <option>Price: High to Low</option>
                   <option>Customer Rating</option>
                 </select>
               </div>
             </div>
             
             {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 animate-fade-in">
                 {filteredProducts.map((p, idx) => (
                   <ProductCard key={p.id} product={p} onClick={onProductClick} index={idx} />
                 ))}
               </div>
             ) : (
               <div className="py-32 text-center bg-white dark:bg-slate-800 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-700">
                 <div className="text-slate-200 dark:text-slate-700 mb-6 flex justify-center">
                    <div className="scale-[3]"><Icons.Search /></div>
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white">No items found</h3>
                 <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto">Try adjusting your filters or search query to find what you're looking for.</p>
                 <button 
                  onClick={() => {setSearchQuery(''); setActiveCategory('All');}} 
                  className="text-primary font-bold hover:underline mt-6 uppercase tracking-widest text-xs"
                 >Reset all filters</button>
               </div>
             )}
           </div>
         </div>
       </div>
    </div>
  );
};

export default SearchPage;
