import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/interior/1920/1080" 
          alt="Refined interior"
          className="w-full h-full object-cover opacity-90 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdfcfb] via-transparent to-transparent opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-[#1a1a1a]/60 mb-6 block">
            Autumn Collection 2026
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-[0.85] tracking-tight mb-8">
            The Art of <br />
            <span className="italic">Essential</span> Living
          </h1>
          <p className="max-w-xl mx-auto text-lg text-[#1a1a1a]/70 mb-10 font-light">
            Curated objects for the modern sanctuary. Hand-picked materials meets timeless minimalist design.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-[#1a1a1a] text-white px-10 py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#333] transition-all flex items-center gap-2 group">
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-[#1a1a1a]/5 rounded-full transition-all">
              Our Story
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-6 flex items-center gap-4">
        <div className="w-12 h-[1px] bg-[#1a1a1a]/20" />
        <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">
          Scroll to explore
        </span>
      </div>
    </section>
  );
};
