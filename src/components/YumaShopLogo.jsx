import React from 'react';

export default function YumaShopLogo({ className = "h-9 w-auto", showTagline = true, light = false }) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
          {/* Official YUMA TOPUP Emblem */}
          <div className="relative flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#6b3bfc] via-[#8b5cf6] to-[#ff5e3a] p-[1.5px] shadow-lg shadow-purple-600/35 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0a0614] rounded-[14px] flex items-center justify-center overflow-hidden">
              <img
                src="/icon-192.png"
                alt="Yuma Topup Emblem"
                className="w-full h-full object-cover rounded-[14px]"
                onError={(e) => {
                  // fallback if image not found
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Brand Typography: YUMA TOPUP */}
          <div className="flex flex-col text-left">
            <div className="flex items-center tracking-tight leading-none font-black text-2xl sm:text-[26px]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 drop-shadow-sm font-extrabold tracking-[-0.04em]">
                YUMA
              </span>
              <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e3a] via-[#ff7849] to-[#ffa133] font-black tracking-[-0.02em]">
                TOPUP
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

        export {YumaShopLogo as YumaTopupLogo};

