import React, { useRef } from 'react';
import {
  Gamepad2,
  Flame,
  Smartphone,
  Monitor,
  Ticket,
  Tv,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

const iconMap = {
  Gamepad2,
  Flame,
  Smartphone,
  Monitor,
  Ticket,
  Tv
};

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
            <div className="relative group/tabs">
              {/* Left Scroll Arrow (Desktop) */}
              <button
                onClick={() => handleScroll('left')}
                aria-label="Scroll Kiri"
                className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#181133]/90 hover:bg-[#6242fc] text-slate-300 hover:text-white border border-[#3b2d68] shadow-lg items-center justify-center transition-all opacity-0 group-hover/tabs:opacity-100 hover:scale-110 cursor-pointer backdrop-blur-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Scrollable Container */}
              <div
                ref={scrollRef}
                className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
              >
                {CATEGORIES.map((cat) => {
                  const IconComponent = iconMap[cat.icon] || Gamepad2;
                  const isActive = activeCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.id)}
                      className={`group relative flex-shrink-0 flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl transition-all duration-300 text-left select-none cursor-pointer ${isActive
                          ? `bg-gradient-to-r ${cat.gradient} text-white ${cat.glow} shadow-xl scale-[1.02] border-t border-t-white/40 border-b border-b-black/30 border-x border-white/20`
                          : 'bg-[#181133]/90 hover:bg-[#231846] text-slate-300 hover:text-white border border-[#312558] hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-950/40 hover:-translate-y-0.5'
                        }`}
                    >
                      {/* Icon Container with glowing effect */}
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isActive
                          ? 'bg-white/20 text-white shadow-inner backdrop-blur-sm scale-105'
                          : `${cat.iconBg} border group-hover:scale-110`
                        }`}>
                        <IconComponent className="w-5 h-5 transition-transform" />
                      </div>

                      {/* Text & Dynamic Subtitle/Badge */}
                      <div className="flex flex-col pr-1">
                        <span className={`text-xs sm:text-sm font-extrabold tracking-tight leading-tight ${isActive ? 'text-white drop-shadow-sm' : 'text-slate-200 group-hover:text-white'
                          }`}>
                          {cat.name}
                        </span>

                        <span className={`text-[10px] font-semibold mt-0.5 leading-none ${isActive
                            ? 'text-white/85 font-bold'
                            : 'text-slate-400 group-hover:text-purple-300'
                          }`}>
                          {cat.badge}
                        </span>
                      </div>

                      {/* Active Indicator Bar */}
                      {isActive && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full shadow-lg shadow-white/80" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right Scroll Arrow (Desktop) */}
              <button
                onClick={() => handleScroll('right')}
                aria-label="Scroll Kanan"
                className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#181133]/90 hover:bg-[#6242fc] text-slate-300 hover:text-white border border-[#3b2d68] shadow-lg items-center justify-center transition-all opacity-0 group-hover/tabs:opacity-100 hover:scale-110 cursor-pointer backdrop-blur-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
  );
}
