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
  Gamepad2: Gamepad2,
  Flame: Flame,
  Smartphone: Smartphone,
  Monitor: Monitor,
  Ticket: Ticket,
  Tv: Tv
};

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {CATEGORIES.map((cat) => {
          const IconComponent = iconMap[cat.icon] || Gamepad2;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#6242fc] to-[#8c52ff] text-white shadow-lg shadow-purple-600/30 border border-purple-400/40 scale-105'
                  : 'bg-[#1b1535] hover:bg-[#261e47] text-slate-300 hover:text-white border border-[#352a5c]'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-purple-400'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

