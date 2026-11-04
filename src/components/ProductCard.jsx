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
      className="group relative bg-[#181132] hover:bg-[#221844] border border-[#312558] hover:border-[#8b5cf6]/80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-950/60 flex flex-col select-none"
    >
      {/* Top ambient highlight line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-purple-400/50 transition-colors z-10" />

      {/* Thumbnail with overlay gradient */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#100a20]">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#181132] via-transparent to-black/20" />

          {/* Promo / Discount Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
              {game.tag && (
                <span className="px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#ff5e3a] to-[#f54291] text-white shadow-md">
                  {game.tag}
                </span>
              )}
              {game.discount && (
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-400 text-slate-950 shadow-sm">
                    {game.discount}
                  </span>
          )}
                </div>

        {/* Instant processing badge */}
              {game.isInstant && (
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/85 border border-emerald-500/40 text-[10px] font-bold text-emerald-300 backdrop-blur-sm shadow-sm z-10">
                    <Zap className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                    <span>Instan</span>
                  </div>
        )}

                  {/* Rating */}
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/70 border border-white/10 text-[10px] font-bold text-amber-300 backdrop-blur-sm z-10">
                      <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                      <span>{game.rating}</span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between text-left">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors line-clamp-1 leading-snug">
                        {game.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium line-clamp-1 mt-0.5">
                        {game.publisher}
                      </p>
                    </div>

                      <div className="mt-3 pt-2.5 border-t border-[#291f4a] flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Mulai Dari</span>
                          <span className="text-xs sm:text-sm font-black text-amber-400">
                            {formattedPrice}
                          </span>
                        </div>

                          <div className="w-7 h-7 rounded-full bg-[#271d47] group-hover:bg-[#6242fc] text-slate-300 group-hover:text-white flex items-center justify-center transition-colors shadow-inner">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                    </div>
                    );
}
