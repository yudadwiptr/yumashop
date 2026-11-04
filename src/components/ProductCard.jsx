import React from 'react';
import { Zap, Star, ChevronRight } from 'lucide-react';

export default function ProductCard({ game, onSelect }) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(game.startingPrice);

  return (
    <div 
      onClick={() => onSelect(game)}
      className="group relative bg-[#11141d] hover:bg-[#161b27] border border-[#1e2436] hover:border-[#ff4655]/70 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-950/25 flex flex-col select-none active:scale-[0.98]"
    >
      {/* Top ambient highlight line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-[#ff4655]/60 transition-colors z-10" />

      {/* Thumbnail with overlay gradient */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#090b10]">
        <img 
          src={game.thumbnail} 
          alt={game.name} 
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/assets/codashop/MLBB-2025-tiles-178x178.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11141d] via-transparent to-black/20" />

        {/* Promo / Discount Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 items-start z-10">
          {game.tag && (
            <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#ff4655] to-[#ff7a00] text-white shadow-md">
              {game.tag}
            </span>
          )}
          {game.discount && (
            <span className="px-1 sm:px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-extrabold bg-amber-400 text-slate-950 shadow-sm">
              {game.discount}
            </span>
          )}
        </div>

        {/* Instant processing badge */}
        {game.isInstant && (
          <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-500/40 text-[9px] sm:text-[10px] font-bold text-emerald-300 backdrop-blur-sm shadow-sm z-10">
            <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-emerald-400 text-emerald-400" />
            <span>Instan</span>
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/70 border border-white/10 text-[9px] sm:text-[10px] font-bold text-amber-300 backdrop-blur-sm z-10">
          <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
          <span>{game.rating}</span>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between text-left">
        <div>
          <h3 className="font-bold text-xs sm:text-base text-white group-hover:text-[#ff4655] transition-colors line-clamp-1 leading-snug">
            {game.name}
          </h3>
          <p className="text-[10px] sm:text-xs text-slate-400 font-medium line-clamp-1 mt-0.5">
            {game.publisher}
          </p>
        </div>

        <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-[#1c2232] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold">Mulai Dari</span>
            <span className="text-xs sm:text-sm font-black text-amber-400">
              {formattedPrice}
            </span>
          </div>

          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#181d2a] group-hover:bg-[#ff4655] text-slate-300 group-hover:text-white flex items-center justify-center transition-colors shadow-inner flex-shrink-0">
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>

    </div>
  );
}
