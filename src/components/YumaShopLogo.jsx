import React from 'react';

export default function YumaShopLogo({ className = "h-9 w-auto", showTagline = true }) {
  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      {/* Official YUMA TOPUP Emblem - Direct without box/frame */}
      <img 
        src="/yuma-logo-128.png" 
        alt="Yuma Topup" 
        className="h-8 sm:h-10 w-auto object-contain hover:scale-105 transition-transform drop-shadow-md"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/yuma-topup.png";
        }}
      />

      {/* Brand Typography: Esports Style */}
      <div className="flex flex-col text-left">
        <div className="flex items-center tracking-tight leading-none font-black text-xl sm:text-[25px]">
          <span className="text-white drop-shadow-sm font-black tracking-[-0.04em]">
            YUMA
          </span>
          <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-[#ff4655] via-[#ff5a00] to-[#ff7a00] font-black tracking-[-0.02em]">
            TOPUP
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
            <span className="h-[2px] w-2 sm:w-2.5 bg-[#ff4655] rounded-full" />
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.16em] sm:tracking-[0.2em] font-extrabold text-slate-400 leading-none">
              Top Up Games &bull; Indonesia
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export { YumaShopLogo as YumaTopupLogo };
