
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  isTrending?: boolean;
  isFlashSale?: boolean;
  sellerName?: string;
  vendorId: string;
  commissionRate?: number;
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  description: string;
  rating: number;
  followerCount: number;
  isVerified: boolean;
  joinedDate: string;
  stats: {
    totalSales: string;
    positiveFeedback: string;
    responseTime: string;
  };
  socialPosts: SocialPost[];
}

export type BadgeType = 'Top Earner' | 'Rising Creator' | 'Trusted Buyer' | 'VIP';

export interface Creator {
  id: string;
  username: string;
  name: string;
  avatar: string;
  reputationScore: number;
  totalEarnings: number;
  badges: BadgeType[];
  followerCount: number;
  isFollowing?: boolean;
}

export interface SocialPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  creator?: Creator;
  product?: Product;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  badges: BadgeType[];
  referralCode: string;
  balance: number;
  pendingEarnings: number;
  totalEarned: number;
  affiliateStats: {
    clicks: number;
    referrals: number;
    conversionRate: string;
  };
  transactions: Transaction[];
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  };
}

export interface Transaction {
  id: string;
  type: 'referral_bonus' | 'affiliate_commission' | 'withdrawal';
  amount: number;
  status: 'completed' | 'pending';
  date: string;
  description: string;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'shopping';
  lastMessage: string;
  time: string;
  type: 'friend' | 'seller' | 'concierge';
  isVerified?: boolean;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  zip: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  expiry?: string;
  isDefault: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type: 'order' | 'promo' | 'system';
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  sharedProduct?: Product;
  suggestion?: {
    text: string;
    actionLabel: string;
    productId: string;
  };
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: CartItem[];
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  earnings: number;
  rank: number;
}
