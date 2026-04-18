/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ArrowRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartOverlay } from './components/CartOverlay';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Optional: show small toast or open cart
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />

        {/* Product Section */}
        <section className="py-24 max-w-7xl mx-auto px-6" id="shop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl mb-4 italic font-light tracking-tight">The Collection</h2>
              <p className="text-[#1a1a1a]/60 font-light max-w-sm">
                Each piece in our library is selected for its material integrity and silhouette.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
                    activeCategory === category 
                      ? 'bg-[#1a1a1a] text-white shadow-lg' 
                      : 'bg-transparent text-[#1a1a1a]/40 hover:text-[#1a1a1a] hover:bg-black/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Brand Philosophy */}
        <section className="bg-[#1a1a1a] text-white py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-white/40 mb-6 block">
                Our Philosophy
              </span>
              <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
                Design that respects the <span className="italic">silence</span> of a space.
              </h2>
              <p className="text-white/60 text-lg font-light mb-12 leading-relaxed">
                We believe that the objects you surround yourself with should have a quiet confidence. 
                Our curation process focuses on pure geometry and honest materials that age gracefully.
              </p>
              <button className="border-b border-white pb-1 text-xs uppercase tracking-widest font-bold hover:opacity-50 transition-opacity flex items-center gap-2">
                Discover our story <ArrowRight size={14} />
              </button>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-[4/5] bg-neutral-800 rounded-3xl overflow-hidden shadow-2xl rotate-2">
                <img 
                  src="https://picsum.photos/seed/artist/800/1000" 
                  alt="Process" 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-64 bg-neutral-700 rounded-3xl overflow-hidden shadow-2xl -rotate-6 hidden md:block border-4 border-[#1a1a1a]">
                <img 
                  src="https://picsum.photos/seed/texture/400/600" 
                  alt="Texture" 
                  className="w-full h-full object-cover opacity-70"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#fdfcfb] py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <h3 className="text-2xl font-serif mb-6 italic">Velvet & Stone</h3>
              <p className="text-[#1a1a1a]/50 font-light max-w-sm leading-relaxed">
                A selection of refined objects for the curated home. We ship worldwide from our studio in Kyoto.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Collections</h4>
              <ul className="flex flex-col gap-4 text-sm font-light text-[#1a1a1a]/70">
                <li><a href="#" className="hover:text-black">New Arrivals</a></li>
                <li><a href="#" className="hover:text-black">Best Sellers</a></li>
                <li><a href="#" className="hover:text-black">Ceramics</a></li>
                <li><a href="#" className="hover:text-black">Textiles</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Support</h4>
              <ul className="flex flex-col gap-4 text-sm font-light text-[#1a1a1a]/70">
                <li><a href="#" className="hover:text-black">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-black">Contact</a></li>
                <li><a href="#" className="hover:text-black">FAQ</a></li>
                <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between pt-12 border-t border-gray-100 gap-6">
            <span className="text-[10px] font-medium text-[#1a1a1a]/30">© 2026 VELVET & STONE STUDIO. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40">
              <a href="#" className="hover:text-black">Instagram</a>
              <a href="#" className="hover:text-black">Pinterest</a>
              <a href="#" className="hover:text-black">Vimeo</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <CartOverlay 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />

      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-white/70 backdrop-blur-md z-[200]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-20 bg-white shadow-2xl z-[201] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-black/5"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex-1 bg-[#f5f5f5] overflow-hidden">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 p-8 md:p-16 flex flex-col justify-center max-w-xl mx-auto">
                <span className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-4">
                  {selectedProduct.category}
                </span>
                <h2 className="text-4xl md:text-5xl font-serif mb-6">{selectedProduct.name}</h2>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-2xl font-light">${selectedProduct.price}</span>
                  <div className="w-[1px] h-6 bg-gray-200" />
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star size={14} fill="currentColor" />
                    <span>{selectedProduct.rating}</span>
                    <span className="text-black/30 font-light">({selectedProduct.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-[#1a1a1a]/70 font-light mb-12 leading-relaxed">
                  {selectedProduct.description}
                </p>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                      setIsCartOpen(true);
                    }}
                    className="w-full bg-[#1a1a1a] text-white py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#333] transition-all"
                  >
                    Add to Bag
                  </button>
                  <p className="text-center text-[10px] text-black/40 uppercase tracking-widest pt-4">
                    Free shipping on orders over $200
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
