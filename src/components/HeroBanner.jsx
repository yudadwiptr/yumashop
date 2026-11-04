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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="relative rounded-3xl overflow-hidden border border-[#3b3062] shadow-2xl bg-gradient-to-r from-[#17112e] via-[#1e153d] to-[#27194f] group min-h-[220px] sm:min-h-[290px] md:min-h-[340px] flex items-center">
        
        {/* Background Image & Ambient Glow */}
        <div className="absolute inset-0 z-0">
          <img 
            src={banner.image} 
            alt={banner.title} 
            className="w-full h-full object-cover object-center opacity-35 mix-blend-luminosity scale-105 group-hover:scale-100 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e091d] via-[#150f2e]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e091d] via-[#120c26]/90 to-transparent w-full md:w-3/4" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-2xl text-left">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/40 text-purple-300 text-xs font-bold tracking-wider uppercase mb-3 sm:mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{banner.tag}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight sm:leading-none mb-2 sm:mb-3 drop-shadow-md">
            {banner.title}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-medium mb-5 sm:mb-6 leading-relaxed max-w-xl">
            {banner.subtitle}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectGameById(banner.gameId)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#ff5e3a] via-[#f73859] to-[#6242fc] hover:brightness-110 shadow-lg shadow-orange-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{banner.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectGameById(banner.gameId)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-slate-200 bg-[#281f4a]/70 hover:bg-[#342962] border border-[#43376f] transition-all backdrop-blur-md"
            >
              Lihat Detail Promo
            </button>
          </div>

        </div>

        {/* Left / Right Carousel Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#181232]/80 hover:bg-[#6242fc] text-slate-300 hover:text-white border border-[#44386e] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg backdrop-blur-md"
          aria-label="Previous banner"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#181232]/80 hover:bg-[#6242fc] text-slate-300 hover:text-white border border-[#44386e] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg backdrop-blur-md"
          aria-label="Next banner"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots Indicators */}
        <div className="absolute bottom-4 right-6 sm:right-10 z-20 flex items-center gap-2">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx 
                  ? 'w-7 bg-gradient-to-r from-[#ff5e3a] to-[#6242fc]' 
                  : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

