import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const CartOverlay: React.FC<CartOverlayProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity,
  onRemove
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />
                <h2 className="text-lg font-serif">Your Bag ({items.length})</h2>
              </div>
              <button onClick={onClose} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-[#1a1a1a]/40 mb-6 font-light">Your shopping bag is currently empty.</p>
                  <button 
                    onClick={onClose}
                    className="text-xs uppercase tracking-widest font-bold border-b border-[#1a1a1a] pb-1 hover:opacity-50 transition-opacity"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 h-32 bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-medium pr-4">{item.name}</h4>
                        <span className="text-sm font-light">${item.price * item.quantity}</span>
                      </div>
                      <p className="text-[10px] uppercase tracking-widest font-medium text-black/40 mb-auto">
                        {item.category}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 border border-gray-100 px-3 py-1 rounded-full">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="hover:opacity-50"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="hover:opacity-50"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-[10px] uppercase tracking-widest font-bold text-red-400 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-gray-100 bg-[#fdfcfb]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm uppercase tracking-widest font-medium text-black/40">Subtotal</span>
                  <span className="text-xl font-serif">${subtotal}</span>
                </div>
                <button className="w-full bg-[#1a1a1a] text-white py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#333] transition-all">
                  Checkout Now
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
