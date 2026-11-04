import React from 'react';
import { 
  Gamepad2, 
  Flame, 
  Smartphone, 
  Monitor, 
  Ticket, 
  Tv 
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
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      {/* Compact Esports Grid - Fits completely without horizontal scroll! */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
        {CATEGORIES.map((cat) => {
          const IconComponent = iconMap[cat.icon] || Gamepad2;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl transition-all duration-200 select-none cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#ff4655] via-[#ff5400] to-[#ff6b00] text-white shadow-lg shadow-red-500/25 border-t border-t-white/30 border-b border-b-black/30 scale-[1.02]'
                  : 'bg-[#11141d] hover:bg-[#181d2a] text-slate-300 hover:text-white border border-[#1e2436] hover:border-[#ff4655]/60 hover:shadow-md'
              }`}
            >
              <IconComponent 
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 transition-transform ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#ff4655]'
                }`} 
              />
              
              <span className={`text-[11px] sm:text-xs md:text-sm font-extrabold tracking-tight truncate leading-tight ${
                isActive ? 'text-white drop-shadow-sm' : 'text-slate-200 group-hover:text-white'
              }`}>
                {cat.name}
              </span>

              {cat.badge && (
                <span className={`hidden md:inline-block px-1 py-0.2 rounded text-[8px] font-black uppercase tracking-wider ${
                  isActive 
                    ? 'bg-black/30 text-amber-200 border border-white/20' 
                    : 'bg-red-500/20 text-[#ff4655] border border-red-500/30'
                }`}>
                  {cat.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
