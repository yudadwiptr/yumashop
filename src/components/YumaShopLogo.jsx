import React from 'react';

export default function YumaShopLogo({ className = "h-9 w-auto", showTagline = true, light = false }) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon Emblem */}
      <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#6b3bfc] via-[#8b5cf6] to-[#ff5e3a] p-[1.5px] shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
        <div className="w-full h-full bg-[#120a26] rounded-[14px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#6b3bfc]/20 to-[#ff5e3a]/20" />
          
          {/* Custom Y Emblem */}
          <svg viewBox="0 0 40 40" className="w-6 h-6 z-10" fill="none">
            <defs>
              <linearGradient id="yumaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#ff5e3a" />
              </linearGradient>
              <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff7849" />
                <stop offset="100%" stopColor="#ffaa00" />
              </linearGradient>
            </defs>
            {/* Geometric stylized Y */}
            <path 
              d="M8 8 L17 21 L17 33 C17 34.1 17.9 35 19 35 L21 35 C22.1 35 23 34.1 23 33 L23 21 L32 8 C32.9 6.7 32 5 30.4 5 L25.5 5 C24.7 5 24 5.4 23.6 6.1 L20 12.5 L16.4 6.1 C16 5.4 15.3 5 14.5 5 L9.6 5 C8 5 7.1 6.7 8 8 Z" 
              fill="url(#yumaGrad)" 
            />
            {/* Center spark */}
            <polygon points="20,13 22,17 19.5,17 21,21 18,17 20.5,17" fill="url(#lightningGrad)" />
          </svg>
        </div>
      </div>

      {/* Custom Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-center tracking-tight leading-none font-black text-2xl sm:text-[26px]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 drop-shadow-sm font-extrabold tracking-[-0.04em]">
            YUMA
          </span>
          <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e3a] via-[#ff7849] to-[#ffa133] font-black tracking-[-0.02em]">
            SHOP
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-[2px] w-2.5 bg-gradient-to-r from-purple-500 to-[#ff5e3a] rounded-full" />
            <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-purple-300/80 leading-none">
              Top Up Games &bull; Indonesia
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

