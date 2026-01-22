
import React from 'react';
import { CartItem } from '../types';
import { Icons } from '../constants';
import Button from '../components/ui/Button';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onStartShopping: () => void;
  total: number;
  onCheckout: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ items, onUpdateQuantity, onRemove, onStartShopping, total, onCheckout }) => {
  return (
    <div className="px-4 md:px-0 animate-fade-in pb-32 lg:pb-12">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-6 bg-white dark:bg-slate-800 rounded-[40px] border border-slate-100 dark:border-slate-700">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-700">
            <div className="scale-150"><Icons.Cart /></div>
          </div>
          <div className="text-center">
             <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your cart is empty</h2>
             <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto">Looks like you haven't added any premium items to your collection yet.</p>
          </div>
          <Button onClick={onStartShopping} size="lg" className="rounded-2xl px-12">Start Shopping</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 p-5 bg-white dark:bg-slate-800 rounded-card shadow-soft border border-slate-50 dark:border-slate-700 hover:shadow-lg transition-all">
                <div className="w-28 h-28 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 text-lg">{item.name}</h3>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 shadow-inner">
                       <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-4 py-2 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 font-bold">-</button>
                       <span className="px-2 text-sm font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                       <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-4 py-2 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 font-bold">+</button>
                     </div>
                     <div className="font-bold text-primary text-xl">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} className="p-2 text-slate-300 hover:text-primary transition-colors h-fit self-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="space-y-6">
             {/* Sticky Bottom Bar for Mobile / Normal Sidebar for Desktop */}
             <div className={`
               fixed bottom-[72px] left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 p-6 shadow-2xl z-40 lg:relative lg:bottom-auto lg:p-8 lg:rounded-[40px] lg:border lg:shadow-soft lg:animate-slide-up
             `}>
               <h3 className="hidden lg:block font-bold text-xl text-slate-900 dark:text-white mb-6">Order Summary</h3>
               <div className="space-y-4">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium text-sm">
                    <span>Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
                    <span className="font-bold text-slate-900 dark:text-white">${total.toFixed(2)}</span>
                  </div>
                  <div className="hidden lg:flex justify-between text-slate-500 font-medium text-sm">
                    <span>Shipping</span>
                    <span className="text-accent-success font-bold uppercase text-xs">Free</span>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-700 pt-4 flex justify-between items-end">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Total</span>
                      <span className="font-bold text-2xl md:text-3xl text-primary">${total.toFixed(2)}</span>
                    </div>
                    <Button variant="primary" size="lg" className="rounded-2xl px-8 shadow-primary/30" onClick={onCheckout}>
                      Checkout
                    </Button>
                  </div>
               </div>
               <div className="hidden lg:flex items-center justify-center gap-2 pt-6">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse"></div>
                 <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Secure encrypted checkout</p>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
