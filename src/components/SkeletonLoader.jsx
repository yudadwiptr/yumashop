import React from 'react';

export function CardSkeleton() {
  return (
    <div className="bg-[#11141d] border border-[#1e2436] rounded-2xl overflow-hidden p-0 animate-pulse">
      <div className="aspect-square w-full bg-[#181d2a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>
      <div className="p-3 sm:p-3.5 space-y-2">
        <div className="h-4 bg-[#181d2a] rounded-md w-3/4" />
        <div className="h-3 bg-[#141824] rounded-md w-1/2" />
        <div className="pt-2 border-t border-[#1c2232] flex justify-between items-center">
          <div className="h-3 bg-[#181d2a] rounded w-1/3" />
          <div className="w-6 h-6 rounded-full bg-[#181d2a]" />
        </div>
      </div>
    </div>
  );
}

export function BannerSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="rounded-3xl border border-[#1e2436] bg-[#11141d] min-h-[220px] sm:min-h-[300px] p-6 sm:p-8 animate-pulse relative overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        <div className="space-y-3 max-w-md">
          <div className="h-5 bg-[#181d2a] rounded-full w-28" />
          <div className="h-8 bg-[#181d2a] rounded-xl w-3/4" />
          <div className="h-4 bg-[#141824] rounded-lg w-full" />
          <div className="h-10 bg-[#181d2a] rounded-full w-40 mt-4" />
        </div>
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090d] text-white px-4">
      {/* Official Yuma Logo with Glowing Tactical Esports Pulse Ring */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Animated outer spinning ring */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[3px] border-[#ff4655]/20 border-t-[#ff4655] animate-spin" />
        
        {/* Secondary subtle counter-ring */}
        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-[#ff6b00]/15 border-b-[#ff6b00] animate-[spin_3s_linear_infinite_reverse]" />
        
        {/* Unboxed Official Yuma Logo Emblem */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/yuma-logo-128.png" 
            alt="YUMA TOPUP Logo" 
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain animate-pulse drop-shadow-[0_0_20px_rgba(255,70,85,0.5)] select-none"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/yuma-logo-white.svg";
            }}
          />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="font-black text-2xl sm:text-3xl tracking-tight flex items-center select-none">
        <span className="text-white drop-shadow-sm font-black tracking-[-0.04em]">YUMA</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4655] via-[#ff5a00] to-[#ff7a00] ml-1.5 font-black tracking-[-0.02em]">TOPUP</span>
      </div>

      {/* Animated Loading Subtext */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mt-2.5">
        <span className="w-2 h-2 rounded-full bg-[#ff4655] animate-ping" />
        <span>Memuat Game Store Resmi Indonesia...</span>
      </div>
    </div>
  );
}
