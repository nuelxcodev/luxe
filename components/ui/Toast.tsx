
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success: 'bg-accent-success text-white shadow-accent-success/20',
    error: 'bg-primary text-white shadow-primary/20',
    info: 'bg-secondary text-white shadow-secondary/20',
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
      <div className={`${styles[type]} px-6 py-3 rounded-full shadow-2xl font-bold text-sm whitespace-nowrap flex items-center gap-3`}>
        {type === 'success' && <span>✓</span>}
        {type === 'error' && <span>✕</span>}
        {type === 'info' && <span>ℹ</span>}
        {message}
      </div>
    </div>
  );
};

export default Toast;
