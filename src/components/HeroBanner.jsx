import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { BANNERS } from '../data/mockData';

export default function HeroBanner({ onSelectGameById }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  };

  const banner = BANNERS[currentSlide];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-2">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#202738] shadow-2xl bg-gradient-to-r from-[#0d0f15] via-[#121622] to-[#181d2a] group min-h-[190px] sm:min-h-[280px] md:min-h-[340px] flex items-center">
        
        {/* Background Image & Ambient Glow */}
        <div className="absolute inset-0 z-0">
          <img 
            src={banner.image} 
            alt={banner.title} 
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 group-hover:scale-100 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#0d0f15]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090d] via-[#0d0f15]/90 to-transparent w-full md:w-3/4" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 p-4 sm:p-8 md:p-12 max-w-2xl text-left">
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-red-500/20 border border-red-500/40 text-[#ff4655] text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-2 sm:mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
            <span>{banner.tag}</span>
          </div>

          <h2 className="text-lg sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight sm:leading-none mb-1.5 sm:mb-3 drop-shadow-md">
            {banner.title}
          </h2>

          <p className="text-xs sm:text-base md:text-lg text-slate-300 font-medium mb-3.5 sm:mb-6 leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-none">
            {banner.subtitle}
          </p>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => onSelectGameById(banner.gameId)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-base font-bold text-white bg-gradient-to-r from-[#ff4655] via-[#ff5400] to-[#ff7a00] hover:brightness-110 shadow-lg shadow-red-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>{banner.cta}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => onSelectGameById(banner.gameId)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-[#161a25]/85 hover:bg-[#1f2535] border border-[#273044] hover:border-[#ff4655]/50 transition-all backdrop-blur-md cursor-pointer"
            >
              Lihat Detail Promo
            </button>
          </div>

        </div>

        {/* Left / Right Carousel Controls - Touch friendly */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#11141d]/85 hover:bg-[#ff4655] text-slate-300 hover:text-white border border-[#273044] flex items-center justify-center transition-all opacity-60 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg backdrop-blur-md cursor-pointer"
          aria-label="Previous banner"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#11141d]/85 hover:bg-[#ff4655] text-slate-300 hover:text-white border border-[#273044] flex items-center justify-center transition-all opacity-60 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg backdrop-blur-md cursor-pointer"
          aria-label="Next banner"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Dots Indicators */}
        <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-10 z-20 flex items-center gap-1.5 sm:gap-2">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx 
                  ? 'w-5 sm:w-7 bg-gradient-to-r from-[#ff4655] to-[#ff7a00]' 
                  : 'w-1.5 sm:w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
