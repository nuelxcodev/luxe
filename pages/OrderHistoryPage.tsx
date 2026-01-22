
import React from 'react';
import { Icons, MOCK_ORDERS } from '../constants';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

interface OrderHistoryPageProps {
  onBack: () => void;
}

const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({ onBack }) => {
  return (
    <div className="px-4 md:px-0 max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors rotate-180">
            <Icons.ChevronRight />
          </button>
          <h1 className="text-3xl font-bold text-slate-900">Order History</h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 font-medium">
          <Icons.Search />
          <span>Search orders</span>
        </div>
      </div>

      <div className="space-y-6">
        {MOCK_ORDERS.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-slate-100 shadow-soft">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <Icons.Cart />
            </div>
            <p className="text-slate-500 font-medium">No orders found yet.</p>
          </div>
        ) : (
          MOCK_ORDERS.map((order, idx) => (
            <div 
              key={order.id} 
              className={`bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden animate-slide-up stagger-${(idx % 4) + 1}`}
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-50">
                <div className="flex flex-wrap gap-x-12 gap-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order Number</p>
                    <p className="font-bold text-slate-900">#{order.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date Placed</p>
                    <p className="font-bold text-slate-900">{order.date}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Amount</p>
                    <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={order.status === 'Delivered' ? 'success' : 'primary'}>
                    {order.status}
                  </Badge>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
              
              <div className="p-6 md:p-8 bg-slate-50/30">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3 overflow-hidden">
                    {[1, 2].map(i => (
                      <div key={i} className="inline-block h-12 w-12 rounded-xl ring-4 ring-white bg-slate-100 overflow-hidden">
                        <img src={`https://picsum.photos/seed/order-${order.id}-${i}/100/100`} alt="" className="object-cover h-full w-full" />
                      </div>
                    ))}
                    <div className="inline-block h-12 w-12 rounded-xl ring-4 ring-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      +1
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-500">Items: Stealth Pro Wireless, Minimalist Leather Watch +1 more</p>
                  </div>
                  <button className="text-sm font-bold text-primary hover:underline">Reorder</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-bold text-slate-900">Need help with an order?</h3>
          <p className="text-sm text-slate-500 max-w-sm">Our premium concierge team is available 24/7 to assist with returns, tracking, or general inquiries.</p>
        </div>
        <Button variant="primary">Contact Concierge</Button>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
