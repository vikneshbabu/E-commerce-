import React from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="hidden lg:flex gap-6 text-xs uppercase tracking-widest font-medium">
            <a href="#" className="hover:opacity-50 transition-opacity">Shop All</a>
            <a href="#" className="hover:opacity-50 transition-opacity">Categories</a>
            <a href="#" className="hover:opacity-50 transition-opacity">Journal</a>
          </div>
        </div>

        <a href="/" className="text-2xl font-serif tracking-tight absolute left-1/2 -translate-x-1/2">
          Velvet & Stone
        </a>

        <div className="flex items-center gap-6">
          <button className="hidden sm:block hover:opacity-50 transition-opacity">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button 
            className="relative hover:opacity-50 transition-opacity group"
            onClick={onOpenCart}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-[#1a1a1a] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-t border-gray-100 p-8 flex flex-col gap-6 text-sm uppercase tracking-widest font-medium lg:hidden"
          >
            <a href="#" onClick={() => setIsMenuOpen(false)}>Shop All</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Categories</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Journal</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Account</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
