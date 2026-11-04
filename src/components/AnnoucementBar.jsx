import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, ChevronRight, X } from 'lucide-react';

export default function AnnoucementBar({ onOpenSecurityTips }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20 border-b border-amber-500/30 py-2 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-400">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <div className="truncate text-slate-200">
            <span className="font-bold text-amber-300 mr-2">Waspada Penipuan APK:</span>
            <span>YUMASHOP tidak pernah meminta password game, PIN, atau mewajibkan install aplikasi APK modifikasi!</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button 
            type="button"
            onClick={onOpenSecurityTips}
            className="hidden sm:flex items-center gap-1 font-semibold text-amber-300 hover:text-amber-200 underline decoration-amber-400/50 cursor-pointer"
          >
            <span>Pelajari Selengkapnya</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          <button 
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
            title="Tutup pengumuman"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
