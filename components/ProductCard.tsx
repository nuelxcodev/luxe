
import React from 'react';
import { Product } from '../types';
import { Icons } from '../constants';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, index = 0 }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className={`bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 group cursor-pointer border border-slate-100 animate-slide-up stagger-${(index % 4) + 1}`}
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <button 
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-primary hover:text-white transition-colors"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </button>
        {product.isFlashSale && (
          <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Flash Sale
          </div>
        )}
      </div>
      <div className="p-5 space-y-1.5">
        <div className="flex items-center gap-1">
          <Icons.Star filled />
          <span className="text-xs font-bold text-slate-700">{product.rating}</span>
          <span className="text-[10px] text-slate-400 font-medium">({product.reviews})</span>
        </div>
        <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors text-sm md:text-base">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
          {product.description}
        </p>
        <div className="pt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
          <button 
            className="p-2.5 bg-secondary text-white rounded-2xl hover:bg-primary transition-all shadow-lg active:scale-90"
            onClick={(e) => { e.stopPropagation(); onClick(product); }}
          >
            <Icons.Cart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
