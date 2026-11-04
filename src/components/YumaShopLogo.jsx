import React from 'react';

export default function YumaShopLogo({ className = "h-9 sm:h-11 w-auto" }) {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Official YUMA TOPUP Emblem - Clean & Direct without duplicate text */}
      <img 
        src="/yuma-logo-128.png" 
        alt="YUMA TOPUP" 
        className="h-full w-auto object-contain hover:scale-105 transition-transform drop-shadow-md"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/yuma-topup.png";
        }}
      />
    </div>
  );
}

export { YumaShopLogo as YumaTopupLogo };
