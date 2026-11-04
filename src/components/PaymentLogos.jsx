import React from 'react';

// Indonesian Flag SVG
export function IndonesiaFlag({ className = "w-5 h-3.5" }) {
  return (
    <svg className={`${className} inline-block rounded-xs shadow-xs border border-white/20`} viewBox="0 0 600 400">
      <rect width="600" height="200" fill="#E70011" />
      <rect y="200" width="600" height="200" fill="#FFFFFF" />
    </svg>
  );
}

// QRIS National Standard Logo SVG
export function QrisLogo({ className = "h-5 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none">
      <rect width="120" height="40" rx="8" fill="#FFFFFF" />
      {/* Red chevron / QR mark */}
      <path d="M12 10H24V22H12V10Z" fill="#EE3124" />
      <path d="M15 13H21V19H15V13Z" fill="#FFFFFF" />
      <path d="M17 15H19V17H17V15Z" fill="#EE3124" />
      
      <path d="M12 24H18V30H12V24Z" fill="#EE3124" />
      <path d="M20 24H24V28H20V24Z" fill="#EE3124" />
      <path d="M22 28H26V30H22V28Z" fill="#EE3124" />

      {/* QRIS typography */}
      <text x="34" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" fill="#1B1B1B" letterSpacing="0.5">
        QRIS
      </text>
    </svg>
  );
}

// GoPay Logo SVG
export function GoPayLogo({ className = "h-5 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none">
      <rect width="120" height="40" rx="8" fill="#00AED6" />
      {/* GoPay circular pin mark */}
      <circle cx="22" cy="20" r="10" fill="#FFFFFF" />
      <circle cx="24" cy="18" r="4.5" fill="#00AED6" />
      {/* go pay text */}
      <text x="38" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="16" fill="#FFFFFF">
        gopay
      </text>
    </svg>
  );
}

// DANA Logo SVG
export function DanaLogo({ className = "h-5 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none">
      <rect width="120" height="40" rx="8" fill="#118EEA" />
      <text x="24" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" fill="#FFFFFF" letterSpacing="2">
        DANA
      </text>
      {/* Sparkle star */}
      <path d="M96 15L97.5 19.5L102 21L97.5 22.5L96 27L94.5 22.5L90 21L94.5 19.5L96 15Z" fill="#FFFFFF" />
    </svg>
  );
}

// OVO Logo SVG
export function OvoLogo({ className = "h-5 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none">
      <rect width="120" height="40" rx="8" fill="#4C3298" />
      <text x="28" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="20" fill="#FFFFFF" letterSpacing="4">
        OVO
      </text>
    </svg>
  );
}

// ShopeePay Logo SVG
export function ShopeePayLogo({ className = "h-5 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 130 40" fill="none">
      <rect width="130" height="40" rx="8" fill="#EE4D2D" />
      {/* Bag icon */}
      <path d="M18 15C18 13.3431 19.3431 12 21 12C22.6569 12 24 13.3431 24 15V16H18V15Z" stroke="#FFFFFF" strokeWidth="2" />
      <rect x="14" y="16" width="14" height="14" rx="2" fill="#FFFFFF" />
      <path d="M21 19C19.5 20 19.5 21 21 22C22.5 23 22.5 24 21 25" stroke="#EE4D2D" strokeWidth="1.8" strokeLinecap="round" />
      <text x="34" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="14" fill="#FFFFFF">
        ShopeePay
      </text>
    </svg>
  );
}

// BCA Logo SVG
export function BcaLogo({ className = "h-5 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none">
      <rect width="120" height="40" rx="8" fill="#00529C" />
      <circle cx="22" cy="20" r="10" fill="#FFFFFF" />
      <path d="M18 15L23 20L18 25M22 15L27 20L22 25" stroke="#00529C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="40" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" fill="#FFFFFF" letterSpacing="1">
        BCA
      </text>
    </svg>
  );
}

// Mandiri Logo SVG
export function MandiriLogo({ className = "h-5 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none">
      <rect width="120" height="40" rx="8" fill="#002D62" />
      {/* Yellow ribbon swoosh */}
      <path d="M12 22C16 16 24 15 28 17C26 21 20 23 16 24L12 22Z" fill="#FDB813" />
      <text x="32" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="15" fill="#FFFFFF">
        mandırı
      </text>
    </svg>
  );
}

// BRI Logo SVG
export function BriLogo({ className = "h-5 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none">
      <rect width="120" height="40" rx="8" fill="#00529C" />
      <text x="24" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="20" fill="#FFFFFF" letterSpacing="2">
        BRI
      </text>
      <rect x="76" y="12" width="4" height="16" fill="#F37021" rx="1" />
      <text x="84" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="10" fill="#FFFFFF">
        VA
      </text>
    </svg>
  );
}

// BNI Logo SVG
export function BniLogo({ className = "h-5 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none">
      <rect width="120" height="40" rx="8" fill="#005E6A" />
      <text x="20" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" fill="#FFFFFF" letterSpacing="1">
        BNI
      </text>
      <path d="M68 14H78L72 26H68V14Z" fill="#F15A24" />
      <text x="82" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="13" fill="#FFFFFF">
        46
      </text>
    </svg>
  );
}

// Indomaret Logo SVG
export function IndomaretLogo({ className = "h-5 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 130 40" fill="none">
      <rect width="130" height="40" rx="8" fill="#FFFFFF" />
      {/* 3 color bands */}
      <rect x="6" y="6" width="36" height="8" rx="2" fill="#00529C" />
      <rect x="6" y="16" width="36" height="8" fill="#EE3124" />
      <rect x="6" y="26" width="36" height="8" rx="2" fill="#FDB813" />
      <text x="46" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="13" fill="#00529C">
        Indomaret
      </text>
    </svg>
  );
}

// Alfamart Logo SVG
export function AlfamartLogo({ className = "h-5 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 130 40" fill="none">
      <rect width="130" height="40" rx="8" fill="#EE3124" />
      <rect x="8" y="8" width="114" height="24" rx="4" fill="#FFFFFF" />
      <text x="20" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="14" fill="#EE3124" letterSpacing="0.5">
        Alfamart
      </text>
    </svg>
  );
}

// Telkomsel Logo SVG
export function TelkomselLogo({ className = "h-5 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 130 40" fill="none">
      <rect width="130" height="40" rx="8" fill="#ED0226" />
      <circle cx="22" cy="20" r="10" fill="#FFFFFF" />
      <path d="M22 13L28 20L22 27L16 20Z" fill="#ED0226" />
      <text x="38" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="12" fill="#FFFFFF">
        Telkomsel
      </text>
    </svg>
  );
}

