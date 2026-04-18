import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={() => onViewDetails(product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5] rounded-2xl mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/20 to-transparent">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full bg-white text-[#1a1a1a] py-3 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors"
          >
            <Plus size={14} />
            Quick Add
          </button>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-medium tracking-tight text-[#1a1a1a]">{product.name}</h3>
          <span className="text-sm font-light text-[#1a1a1a]/60">${product.price}</span>
        </div>
        <p className="text-[11px] uppercase tracking-widest font-medium text-[#1a1a1a]/40">{product.category}</p>
      </div>
    </motion.div>
  );
};
