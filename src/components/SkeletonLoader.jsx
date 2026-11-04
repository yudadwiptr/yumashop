import React from 'react';
import { Zap } from 'lucide-react';

export function CardSkeleton() {
  return (
    <div className="bg-[#1c1537] border border-[#352a5c] rounded-2xl overflow-hidden p-0 animate-pulse">
      <div className="aspect-square w-full bg-[#261d4a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>
      <div className="p-3.5 space-y-2">
        <div className="h-4 bg-[#261d4a] rounded-md w-3/4" />
        <div className="h-3 bg-[#20183e] rounded-md w-1/2" />
        <div className="pt-2 border-t border-[#2a204d] flex justify-between items-center">
          <div className="h-3 bg-[#261d4a] rounded w-1/3" />
          <div className="w-6 h-6 rounded-full bg-[#261d4a]" />
        </div>
      </div>
    </div>
  );
}

export function BannerSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="rounded-3xl border border-[#3b3062] bg-[#1a1236] min-h-[260px] sm:min-h-[320px] p-8 animate-pulse relative overflow-hidden flex flex-col justify-end">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        <div className="space-y-3 max-w-md">
          <div className="h-5 bg-[#2a1d56] rounded-full w-28" />
          <div className="h-8 bg-[#2a1d56] rounded-xl w-3/4" />
          <div className="h-4 bg-[#201644] rounded-lg w-full" />
          <div className="h-10 bg-[#2a1d56] rounded-full w-40 mt-4" />
        </div>
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0e0a1c] text-white">
      <div className="relative flex items-center justify-center mb-4">
        {/* Animated glowing rings */}
        <div className="w-20 h-20 rounded-full border-4 border-purple-500/20 border-t-[#6242fc] animate-spin" />
        <div className="absolute w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6242fc] to-[#f54291] flex items-center justify-center shadow-lg shadow-purple-500/50 animate-pulse">
          <Zap className="w-7 h-7 text-white fill-white" />
        </div>
      </div>
      <div className="font-extrabold text-xl tracking-tight">
        YUMA<span className="text-[#ff5e3a]">SHOP</span>
      </div>
      <div className="text-xs text-purple-300/80 mt-1 uppercase tracking-widest font-semibold flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
        <span>Memuat Katalog Game...</span>
      </div>
    </div>
  );
}

