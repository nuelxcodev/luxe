
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { Icons } from '../constants';
import { CartItem } from '../types';

interface CheckoutPageProps {
  items: CartItem[];
  total: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ items, total, onSuccess, onCancel }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { id: 1, label: 'Shipping' },
    { id: 2, label: 'Payment' },
    { id: 3, label: 'Review' }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        onSuccess();
      }, 2000);
    }
  };

  return (
    <div className="px-4 md:px-0 max-w-4xl mx-auto py-8 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={onCancel} className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm">
          <div className="rotate-180"><Icons.ChevronRight /></div> Back to Cart
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Secure Checkout</h1>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between max-w-md mx-auto relative mb-12">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2"></div>
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              step >= s.id ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20' : 'bg-white border-2 border-slate-200 text-slate-400'
            }`}>
              {s.id}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s.id ? 'text-primary' : 'text-slate-400'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-soft space-y-8">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Street Address</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none" placeholder="123 Luxury Ave" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">City</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none" placeholder="Beverly Hills" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">ZIP Code</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none" placeholder="90210" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border-2 border-primary bg-rose-50 rounded-2xl cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">💳</div>
                    <div className="font-bold text-slate-900">Credit / Debit Card</div>
                  </div>
                  <div className="w-4 h-4 rounded-full border-4 border-primary bg-white"></div>
                </label>
                <div className="grid grid-cols-2 gap-4 pt-4">
                   <div className="space-y-1.5 col-span-2">
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Card Number</label>
                     <input className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none" placeholder="0000 0000 0000 0000" />
                   </div>
                   <div className="space-y-1.5">
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Expiry</label>
                     <input className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none" placeholder="MM/YY" />
                   </div>
                   <div className="space-y-1.5">
                     <label className="text-[10px] font-bold text-slate-500 uppercase">CVC</label>
                     <input className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none" placeholder="123" />
                   </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold">Review Order</h2>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <img src={item.image} className="w-10 h-10 rounded object-cover" alt="" />
                      <div>
                        <div className="text-sm font-bold">{item.name}</div>
                        <div className="text-xs text-slate-400">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-6 flex gap-4">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>Previous</Button>
            )}
            <Button 
              variant="primary" 
              fullWidth 
              onClick={handleNext}
              isLoading={isProcessing}
            >
              {step === 3 ? 'Place Order' : 'Continue to ' + (step === 1 ? 'Payment' : 'Review')}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
             <h3 className="font-bold border-b border-white/10 pb-2">Summary</h3>
             <div className="flex justify-between text-sm opacity-70">
               <span>Items ({items.length})</span>
               <span>${total.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-sm opacity-70">
               <span>Shipping</span>
               <span className="text-accent-success font-bold">FREE</span>
             </div>
             <div className="flex justify-between items-center pt-4 border-t border-white/10">
               <span className="font-bold">Total</span>
               <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
