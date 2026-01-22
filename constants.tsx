import React from 'react';
import { Product, Notification, Order, Vendor, Contact, Creator, LeaderboardEntry } from './types';
import { GiTShirt, GiLipstick, GiSparkles } from 'react-icons/gi';
import { MdLaptop } from 'react-icons/md';
import { AiFillHome, AiOutlineClockCircle } from 'react-icons/ai';
import { FaFutbol, FaHeadphones } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';

export const CATEGORIES = [
  { id: 'cat1', name: 'Fashion', icon: <GiTShirt />, color: 'bg-orange-100 text-orange-600' },
  { id: 'cat2', name: 'Electronics', icon: <MdLaptop />, color: 'bg-blue-100 text-blue-600' },
  { id: 'cat3', name: 'Home', icon: <AiFillHome />, color: 'bg-green-100 text-green-600' },
  { id: 'cat4', name: 'Beauty', icon: <GiLipstick />, color: 'bg-pink-100 text-pink-600' },
  { id: 'cat5', name: 'Sports', icon: <FaFutbol />, color: 'bg-indigo-100 text-indigo-600' },
  { id: 'cat6', name: 'Watches', icon: <AiOutlineClockCircle />, color: 'bg-slate-100 text-slate-600' },
  { id: 'cat7', name: 'Audio', icon: <FaHeadphones />, color: 'bg-purple-100 text-purple-600' },
  { id: 'cat8', name: 'More', icon: <FiStar />, color: 'bg-rose-100 text-rose-600' },
];

export const MOCK_CREATORS: Creator[] = [
  {
    id: 'cr1',
    username: '@mark_stylist',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    reputationScore: 980,
    totalEarnings: 4500.25,
    badges: ['Top Earner', 'VIP'],
    followerCount: 2400
  },
  {
    id: 'cr2',
    username: '@sarah_j',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    reputationScore: 850,
    totalEarnings: 1200.50,
    badges: ['Rising Creator', 'Trusted Buyer'],
    followerCount: 1100
  }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200', earnings: 4500.25, rank: 1 },
  { id: '2', name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200', earnings: 1200.50, rank: 2 },
  { id: '3', name: 'Alex Johnson', avatar: 'https://picsum.photos/seed/user1/200/200', earnings: 1250.00, rank: 3 },
  { id: '4', name: 'Elena Rodriguez', avatar: 'https://picsum.photos/seed/user4/200/200', earnings: 890.00, rank: 4 },
  { id: '5', name: 'David Kim', avatar: 'https://picsum.photos/seed/user5/200/200', earnings: 540.00, rank: 5 }
];

export const MOCK_CONTACTS: Contact[] = [
  {
    id: 'c1',
    name: 'LUXE Concierge',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=200&auto=format&fit=crop',
    status: 'online',
    lastMessage: 'How can I assist your luxury journey today?',
    time: 'Now',
    type: 'concierge',
    isVerified: true
  },
  {
    id: 'c2',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    status: 'shopping',
    lastMessage: 'OMG look at these headphones!',
    time: '2m',
    type: 'friend'
  },
  {
    id: 'c3',
    name: 'AudioElite (Seller)',
    avatar: 'https://picsum.photos/seed/audio/200/200',
    status: 'online',
    lastMessage: 'The Stealth Pro is back in stock.',
    time: '1h',
    type: 'seller',
    isVerified: true
  }
];

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'AudioElite',
    logo: 'https://picsum.photos/seed/audio/200/200',
    coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
    description: 'Pioneers in high-fidelity audio equipment.',
    rating: 4.9,
    followerCount: 12400,
    isVerified: true,
    joinedDate: 'Jan 2021',
    stats: {
      totalSales: '50k+',
      positiveFeedback: '99%',
      responseTime: '< 2h'
    },
    socialPosts: []
  },
  {
    id: 'v2',
    name: 'ChronoLuxe',
    logo: 'https://picsum.photos/seed/watch/200/200',
    coverImage: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop',
    description: 'Timeless elegance and precision engineering.',
    rating: 4.8,
    followerCount: 8900,
    isVerified: true,
    joinedDate: 'Mar 2020',
    stats: {
      totalSales: '15k+',
      positiveFeedback: '98%',
      responseTime: '< 4h'
    },
    socialPosts: []
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Stealth Pro Wireless Headphones',
    description: 'Noise-cancelling over-ear headphones with 40-hour battery life.',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviews: 124,
    isTrending: true,
    sellerName: 'AudioElite',
    vendorId: 'v1',
    commissionRate: 0.05
  },
  {
    id: '2',
    name: 'Minimalist Leather Watch',
    description: 'Elegant timepiece with Italian leather strap and sapphire glass.',
    price: 189.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviews: 89,
    isFlashSale: true,
    sellerName: 'ChronoLuxe',
    vendorId: 'v2',
    commissionRate: 0.05
  },
  {
    id: '3',
    name: 'Ergo-Dynamic Desk Chair',
    description: 'Full mesh ergonomic office chair with adjustable lumbar support.',
    price: 450.00,
    category: 'Home Office',
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    reviews: 210,
    isTrending: true,
    sellerName: 'OfficePro',
    vendorId: 'v3',
    commissionRate: 0.05
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Order Delivered!',
    message: 'Your order #LX-9921 has been delivered to your front door.',
    timestamp: new Date(Date.now() - 3600000),
    isRead: false,
    type: 'order'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'LX-8812',
    date: 'Oct 12, 2023',
    status: 'Delivered',
    total: 345.99,
    items: []
  }
];

export const Icons = {
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Cart: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" /></svg>,
  Message: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>, 
  Profile: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.121 17.804z" /></svg>,
  Notification: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>,
  Star: ({ filled }: { filled?: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.29a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.29c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.29a1 1 0 00-.364-1.118L2.98 8.717c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.29z"/></svg>,
  Share: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>,
  Filter: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13v6a1 1 0 01-1.447.894L9 17H5a1 1 0 01-1-1V4z" /></svg>,
};