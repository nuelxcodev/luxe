
import React, { useState, useMemo, useEffect } from 'react';
import { Product, CartItem, User, Creator } from './types';
import Layout from './components/Layout';
import Toast from './components/ui/Toast';
import WalletOverlay from './components/WalletOverlay';
import CreatorOverlay from './components/CreatorOverlay';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import MessagesPage from './pages/MessagesPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import VendorProfilePage from './pages/VendorProfilePage';
import SocialFeedPage from './pages/SocialFeedPage';
import AffiliateDashboard from './pages/AffiliateDashboard';
import StorefrontPage from './pages/StorefrontPage';
import LeaderboardPage from './pages/LeaderboardPage';

type Page = 'landing' | 'auth' | 'home' | 'search' | 'cart' | 'product' | 'profile' | 'notifications' | 'messages' | 'checkout' | 'success' | 'orders' | 'vendor' | 'feed' | 'affiliate' | 'storefront' | 'leaderboard';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [chatProduct, setChatProduct] = useState<Product | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [toast, setToast] = useState<ToastState | null>(null);
  const [walletOpen, setWalletOpen] = useState(false);
  
  const [user, setUser] = useState<User>({
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://picsum.photos/seed/user1/256/256',
    badges: ['Trusted Buyer', 'VIP'],
    referralCode: 'LUX-ALEX-2024',
    balance: 145.50,
    pendingEarnings: 24.00,
    totalEarned: 1250.00,
    affiliateStats: {
      clicks: 432,
      referrals: 24,
      conversionRate: '5.5%'
    },
    transactions: [
      { id: 't1', type: 'referral_bonus', amount: 20.00, status: 'completed', date: 'Oct 14, 2023', description: 'Referral bonus from @mark_stylist' },
      { id: 't2', type: 'affiliate_commission', amount: 45.50, status: 'completed', date: 'Oct 10, 2023', description: 'Commission for Stealth Pro sale' },
    ],
    addresses: [
      { id: 'addr-1', label: 'Home', street: '123 Luxury Ave', city: 'Beverly Hills', zip: '90210', isDefault: true }
    ],
    paymentMethods: [
      { id: 'pay-1', type: 'card', last4: '4242', expiry: '12/25', isDefault: true }
    ],
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true
    }
  });

  // Theme Sync
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  // Cart logic
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast("Item removed from cart", "info");
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);
  const cartItemCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  // View transitions
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  };

  const handleTabChange = (tab: string) => {
    if (tab !== 'messages') setChatProduct(null);
    setCurrentPage(tab as Page);
    window.scrollTo(0, 0);
  };

  const handleStartChat = (product: Product) => {
    setChatProduct(product);
    setCurrentPage('messages');
    window.scrollTo(0, 0);
  };

  const handleVendorClick = (vendorId: string) => {
    setSelectedVendorId(vendorId);
    setCurrentPage('vendor');
    window.scrollTo(0, 0);
  };

  const handleCreatorClick = (creator: Creator) => {
    setSelectedCreator(creator);
  };

  const handleCheckoutSuccess = () => {
    setCart([]);
    setCurrentPage('success');
    showToast("Order placed successfully!", "success");
  };

  const handleUpdateProfile = (updatedUser: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
    showToast("Profile updated");
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    showToast(`Switched to ${theme === 'light' ? 'Dark' : 'Light'} mode`);
  };

  if (currentPage === 'landing' && !isAuth) {
    return <LandingPage onStart={() => setCurrentPage('auth')} onExplore={() => { setIsAuth(true); setCurrentPage('search'); }} />;
  }

  if (currentPage === 'auth' && !isAuth) {
    return <AuthPage onLogin={() => { setIsAuth(true); setCurrentPage('home'); showToast("Welcome back, Alex!"); }} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onProductClick={handleProductClick} 
            onViewAll={() => handleTabChange('search')} 
            onOpenMessages={() => handleTabChange('messages')}
            onViewFeed={() => handleTabChange('feed')}
            onAffiliateClick={() => handleTabChange('affiliate')}
          />
        );
      case 'feed':
        return <SocialFeedPage onProductClick={handleProductClick} onCreatorClick={handleCreatorClick} />;
      case 'search':
        return <SearchPage onProductClick={handleProductClick} />;
      case 'product':
        if (!selectedProduct) return null;
        return (
          <ProductDetailsPage 
            product={selectedProduct} 
            onAddToCart={(p, q) => addToCart(p, q)} 
            onGoBack={() => handleTabChange('home')} 
            onOpenMessages={() => handleStartChat(selectedProduct)}
            onVendorClick={handleVendorClick}
            showToast={showToast}
          />
        );
      case 'cart':
        return (
          <CartPage 
            items={cart} 
            onUpdateQuantity={updateQuantity} 
            onRemove={removeFromCart} 
            onStartShopping={() => handleTabChange('home')} 
            total={cartTotal} 
            onCheckout={() => setCurrentPage('checkout')}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage 
            items={cart} 
            total={cartTotal} 
            onSuccess={handleCheckoutSuccess} 
            onCancel={() => setCurrentPage('cart')} 
          />
        );
      case 'orders':
        return <OrderHistoryPage onBack={() => handleTabChange('profile')} />;
      case 'affiliate':
        return <AffiliateDashboard user={user} onBack={() => handleTabChange('profile')} showToast={showToast} onLeaderboardClick={() => setCurrentPage('leaderboard')} />;
      case 'storefront':
        return <StorefrontPage creator={selectedCreator || ({} as any)} onBack={() => handleTabChange('feed')} onProductClick={handleProductClick} />;
      case 'leaderboard':
        return <LeaderboardPage onBack={() => handleTabChange('affiliate')} />;
      case 'vendor':
        if (!selectedVendorId) return null;
        return (
          <VendorProfilePage 
            vendorId={selectedVendorId} 
            onProductClick={handleProductClick}
            onBack={() => handleTabChange('home')}
            onOpenMessages={() => handleTabChange('messages')}
          />
        );
      case 'success':
        return (
          <div className="py-20 text-center space-y-6 animate-slide-up dark:text-white">
             <div className="w-24 h-24 bg-accent-success/10 text-accent-success rounded-full flex items-center justify-center mx-auto text-4xl shadow-lg">✓</div>
             <h1 className="text-4xl font-bold">Order Confirmed!</h1>
             <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Your order has been placed successfully. You will receive an email confirmation shortly.</p>
             <div className="pt-8">
               <button 
                onClick={() => setCurrentPage('home')}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
               >
                 Continue Shopping
               </button>
             </div>
          </div>
        );
      case 'profile':
        return (
          <ProfilePage 
            user={user}
            theme={theme}
            onToggleTheme={toggleTheme}
            onUpdateUser={handleUpdateProfile}
            onLogout={() => { setIsAuth(false); setCurrentPage('landing'); }} 
            onViewAllOrders={() => handleTabChange('orders')}
            onOpenMessages={() => handleTabChange('messages')}
            onAffiliateClick={() => handleTabChange('affiliate')}
          />
        );
      case 'notifications':
        return <NotificationsPage />;
      case 'messages':
        return <MessagesPage product={chatProduct} />;
      default:
        return <div className="p-20 text-center font-bold text-slate-400">Page under development</div>;
    }
  };

  return (
    <Layout 
      user={user}
      activeTab={currentPage} 
      onTabChange={handleTabChange} 
      cartCount={cartItemCount}
      onOpenWallet={() => setWalletOpen(true)}
    >
      {renderContent()}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      <WalletOverlay isOpen={walletOpen} onClose={() => setWalletOpen(false)} user={user} showToast={showToast} />
      <CreatorOverlay creator={selectedCreator} onClose={() => setSelectedCreator(null)} onViewStorefront={() => setCurrentPage('storefront')} />
    </Layout>
  );
};

export default App;
