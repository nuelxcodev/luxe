
import React, { useState } from 'react';
import { Icons, MOCK_ORDERS } from '../constants';
import { User, Address, PaymentMethod } from '../types';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

interface ProfilePageProps {
  user: User;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onUpdateUser: (updatedUser: Partial<User>) => void;
  onLogout: () => void;
  onViewAllOrders: () => void;
  onOpenMessages: () => void;
  onAffiliateClick: () => void;
}

type SettingsSection = 'main' | 'personal' | 'addresses' | 'payment' | 'security' | 'notifications';

const ProfilePage: React.FC<ProfilePageProps> = ({ user, theme, onToggleTheme, onUpdateUser, onLogout, onViewAllOrders, onOpenMessages, onAffiliateClick }) => {
  const [section, setSection] = useState<SettingsSection>('main');
  const [isLoading, setIsLoading] = useState(false);

  const [personalForm, setPersonalForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || ''
  });

  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onUpdateUser(personalForm);
      setSection('main');
      setIsLoading(false);
    }, 800);
  };

  const handleTogglePref = (key: keyof User['preferences']) => {
    onUpdateUser({
      preferences: {
        ...user.preferences,
        [key]: !user.preferences[key]
      }
    });
  };

  const renderSection = () => {
    switch (section) {
      case 'personal':
        return (
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-soft border border-slate-50 dark:border-slate-700 animate-slide-in-right">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setSection('main')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors rotate-180">
                <Icons.ChevronRight />
              </button>
              <h2 className="text-2xl font-bold dark:text-white">Personal Information</h2>
            </div>
            <form onSubmit={handleSavePersonal} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    value={personalForm.name}
                    onChange={(e) => setPersonalForm({...personalForm, name: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    value={personalForm.email}
                    onChange={(e) => setPersonalForm({...personalForm, email: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="tel" 
                    value={personalForm.phone}
                    onChange={(e) => setPersonalForm({...personalForm, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-50 dark:border-slate-700">
                <Button type="submit" isLoading={isLoading}>Save Changes</Button>
                <Button variant="outline" type="button" onClick={() => setSection('main')}>Cancel</Button>
              </div>
            </form>
          </div>
        );

      case 'addresses':
        return (
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-soft border border-slate-50 dark:border-slate-700 animate-slide-in-right">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <button onClick={() => setSection('main')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors rotate-180">
                    <Icons.ChevronRight />
                  </button>
                  <h2 className="text-2xl font-bold dark:text-white">Shipping Addresses</h2>
                </div>
                <Button size="sm" leftIcon={<span>+</span>}>Add New</Button>
             </div>
             <div className="space-y-4">
                {user.addresses.map(addr => (
                  <div key={addr.id} className="p-4 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-between group hover:border-primary/20 transition-all">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-slate-900 dark:text-white">{addr.label}</span>
                        {addr.isDefault && <Badge variant="success">Default</Badge>}
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{addr.street}, {addr.city}, {addr.zip}</p>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2 text-slate-300 hover:text-primary transition-colors"><Icons.Search /></button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        );

      case 'payment':
        return (
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-soft border border-slate-50 dark:border-slate-700 animate-slide-in-right">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <button onClick={() => setSection('main')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors rotate-180">
                    <Icons.ChevronRight />
                  </button>
                  <h2 className="text-2xl font-bold dark:text-white">Payment Methods</h2>
                </div>
                <Button size="sm" leftIcon={<span>+</span>}>Add Card</Button>
             </div>
             <div className="space-y-4">
                {user.paymentMethods.map(pm => (
                  <div key={pm.id} className="p-4 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-between group hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center text-xl">💳</div>
                      <div>
                        <div className="flex items-center gap-3 mb-0.5">
                          <span className="font-bold text-slate-900 dark:text-white">•••• {pm.last4}</span>
                          {pm.isDefault && <Badge variant="success">Default</Badge>}
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Expires {pm.expiry}</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-primary hover:underline">Edit</button>
                  </div>
                ))}
             </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-soft border border-slate-50 dark:border-slate-700 animate-slide-in-right">
             <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setSection('main')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors rotate-180">
                  <Icons.ChevronRight />
                </button>
                <h2 className="text-2xl font-bold dark:text-white">Notification Preferences</h2>
             </div>
             <div className="space-y-6">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'News, collection drops and order updates via email' },
                  { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Real-time order delivery alerts to your phone' },
                  { key: 'pushNotifications', label: 'Push Notifications', desc: 'Instant alerts on your mobile and desktop' }
                ].map(pref => (
                  <div key={pref.key} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{pref.label}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{pref.desc}</p>
                    </div>
                    <button 
                      onClick={() => handleTogglePref(pref.key as any)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${user.preferences[pref.key as keyof User['preferences']] ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${user.preferences[pref.key as keyof User['preferences']] ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
             </div>
          </div>
        );

      case 'security':
        return (
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-soft border border-slate-50 dark:border-slate-700 animate-slide-in-right">
             <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setSection('main')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors rotate-180">
                  <Icons.ChevronRight />
                </button>
                <h2 className="text-2xl font-bold dark:text-white">Security & Password</h2>
             </div>
             <div className="space-y-6 max-w-md">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 dark:text-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 dark:text-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 dark:text-white" />
                </div>
                <Button fullWidth>Update Password</Button>
                <div className="pt-4 border-t border-slate-50 dark:border-slate-700">
                   <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Two-Factor Authentication</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Add an extra layer of security to your luxe account.</p>
                   <Button variant="outline" size="sm">Enable 2FA</Button>
                </div>
             </div>
          </div>
        );

      default:
        return (
          <div className="space-y-12 animate-fade-in dark:text-white">
             {/* Profile Header Card */}
             <div className="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-soft border border-slate-50 dark:border-slate-700 animate-slide-up">
                <div className="relative group">
                   <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-700 shadow-xl overflow-hidden bg-slate-200 dark:bg-slate-900 ring-1 ring-slate-100 dark:ring-slate-800">
                     <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                   </div>
                   <button 
                    onClick={onOpenMessages}
                    className="absolute bottom-1 right-1 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform ring-4 ring-white dark:ring-slate-800"
                   >
                     <Icons.Message />
                   </button>
                </div>
                
                <div className="text-center md:text-left flex-1 space-y-4">
                  <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">{user.email}</p>
                  </div>
                  <div className="flex gap-4 justify-center md:justify-start">
                     <div className="bg-slate-50 dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm text-center min-w-[100px] hover:scale-105 transition-transform cursor-default">
                        <div className="text-lg font-bold text-slate-900 dark:text-white">12</div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Orders</div>
                     </div>
                     <div 
                        onClick={onAffiliateClick}
                        className="bg-accent-success/10 px-5 py-3 rounded-2xl border border-accent-success/20 shadow-sm text-center min-w-[100px] hover:scale-105 transition-transform cursor-pointer group"
                      >
                        <div className="text-lg font-bold text-accent-success">${user.balance.toFixed(0)}</div>
                        <div className="text-[10px] text-accent-success-900 font-bold uppercase tracking-widest group-hover:underline">Credits</div>
                     </div>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <Button variant="outline" className="h-fit" onClick={() => setSection('personal')}>Edit Profile</Button>
                    <button 
                      onClick={onToggleTheme}
                      className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      title="Toggle Dark Mode"
                    >
                      {theme === 'light' ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                      )}
                    </button>
                  </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {/* Recent Orders List */}
               <div className="space-y-6 animate-slide-up stagger-1">
                 <h3 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3 flex items-center gap-2">
                    <Icons.Cart /> Recent Orders
                 </h3>
                 <div className="space-y-4">
                   {MOCK_ORDERS.slice(0, 3).map((order, idx) => (
                     <div 
                       key={order.id} 
                       className={`bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between shadow-soft hover:border-primary/20 transition-all cursor-pointer animate-slide-in-right stagger-${idx+1}`}
                     >
                        <div className="space-y-1">
                          <div className="text-sm font-bold text-slate-900 dark:text-white">Order {order.id}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">{order.date}</div>
                        </div>
                        <div className="flex flex-col items-end">
                           <Badge variant={order.status === 'Delivered' ? 'success' : 'primary'}>
                             {order.status}
                           </Badge>
                           <span className="text-sm font-bold mt-1.5 text-slate-900 dark:text-white">${order.total}</span>
                        </div>
                     </div>
                   ))}
                 </div>
                 <button 
                  onClick={onViewAllOrders}
                  className="w-full py-3 text-slate-500 text-sm font-bold hover:text-primary transition-colors"
                 >
                   View All Order History
                 </button>
               </div>

               {/* Account Settings List */}
               <div className="space-y-6 animate-slide-up stagger-2">
                 <h3 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3 flex items-center gap-2">
                    <Icons.Profile /> Partner & Settings
                 </h3>
                 <div className="space-y-2">
                   {[
                     { label: 'Earning & Affiliate Dashboard', icon: <div className="text-accent-success">✨</div>, sec: 'affiliate' },
                     { label: 'Personal Information', icon: <Icons.Profile />, sec: 'personal' },
                     { label: 'Shipping Addresses', icon: <Icons.Search />, sec: 'addresses' },
                     { label: 'Payment Methods', icon: <Icons.Cart />, sec: 'payment' },
                     { label: 'Security & Password', icon: <Icons.Notification />, sec: 'security' }
                   ].map((item, idx) => (
                     <button 
                       key={item.label} 
                       onClick={() => item.sec === 'affiliate' ? onAffiliateClick() : setSection(item.sec as SettingsSection)}
                       className={`w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-50 dark:border-slate-700 transition-all group animate-slide-in-right stagger-${idx+1} ${item.sec === 'affiliate' ? 'bg-accent-success/5 border-accent-success/10' : ''}`}
                     >
                        <div className="flex items-center gap-3">
                           <div className="text-slate-400 group-hover:text-primary transition-colors">{item.icon}</div>
                           <span className={`text-sm font-semibold group-hover:text-primary ${item.sec === 'affiliate' ? 'text-accent-success' : 'text-slate-700 dark:text-slate-300'}`}>{item.label}</span>
                        </div>
                        <div className="text-slate-300 group-hover:text-primary transition-colors"><Icons.ChevronRight /></div>
                     </button>
                   ))}
                   <button 
                    onClick={onLogout}
                    className="w-full mt-4 p-4 text-primary font-bold hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-2xl transition-all border border-transparent hover:border-rose-100 animate-slide-up stagger-4"
                   >
                     Log Out
                   </button>
                 </div>
               </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="px-4 md:px-0 max-w-4xl mx-auto pb-20">
      {renderSection()}
    </div>
  );
};

export default ProfilePage;
