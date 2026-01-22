
import React from 'react';
import Button from '../components/ui/Button';

interface LandingPageProps {
  onStart: () => void;
  onExplore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onExplore }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden text-center px-6">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="relative z-10 max-w-2xl animate-fade-in">
        <h2 className="text-primary font-bold tracking-[0.2em] text-sm mb-6 uppercase">Experience Premium</h2>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1]">
          Shop Smarter. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">Live Better.</span>
        </h1>
        <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
          Discover a curated collection of high-end products designed for the modern lifestyle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onStart} size="lg">
            Shop Now
          </Button>
          <Button variant="secondary" size="lg" onClick={onExplore}>
            Explore Deals
          </Button>
        </div>
        
        <div className="mt-24 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {['Apple', 'Nike', 'Sony', 'Bose'].map(brand => (
            <span key={brand} className="text-white font-bold text-xl tracking-widest">{brand}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
