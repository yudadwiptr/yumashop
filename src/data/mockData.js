// Data catalog untuk YUMATOPUP disesuaikan dengan Dayjhostore & Codashop
import enrichedGames from './enrichedGames.json';

export const BANNERS = [
  {
    id: 1,
    title: "Mobile Legends: Bang Bang",
    subtitle: "Weekly Diamond Pass & Double Diamonds Termurah!",
    tag: "PROMO SPESIAL",
    bgColor: "from-blue-900 via-indigo-950 to-purple-900",
    image: "/assets/codashop/ID-LinkyAI-CodashopLaunch-730x280.png",
    cta: "Top Up Sekarang",
    gameId: "mobile-legends-indonesia"
  },
  {
    id: 2,
    title: "Free Fire Booyah Pass",
    subtitle: "Dapatkan Diskon hingga 35% dan Diamond Ekstra!",
    tag: "FLASH SALE",
    bgColor: "from-amber-900 via-orange-950 to-red-900",
    image: "/assets/games/free-fire-indonesia.webp",
    cta: "Beli Diamond",
    gameId: "free-fire-indonesia"
  },
  {
    id: 3,
    title: "VALORANT Champions Tour",
    subtitle: "Bonus 15% Radianite Points untuk Setiap Pembelian VP",
    tag: "RESMI RIOT",
    bgColor: "from-rose-900 via-purple-950 to-slate-900",
    image: "/assets/games/valorant.webp",
    cta: "Klaim VP",
    gameId: "valorant"
  },
  {
    id: 4,
    title: "Genshin Impact",
    subtitle: "Blessing of the Welkin Moon & Genesis Crystal Murah",
    tag: "HOYOVERSE RESMI",
    bgColor: "from-cyan-950 via-teal-950 to-slate-900",
    image: "/assets/games/genshin-impact.webp",
    cta: "Top Up Genesis",
    gameId: "genshin-impact"
  }
];

export const CATEGORIES = [
  {
    id: "all",
    name: "Semua Game & Voucher",
    icon: "Gamepad2",
    badge: "128+ Produk",
    gradient: "from-[#6366f1] via-[#7c3aed] to-[#9333ea]",
    iconBg: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    glow: "shadow-purple-600/40",
    accentBorder: "border-purple-400/50"
  },
  {
    id: "popular",
    name: "Paling Populer",
    icon: "Flame",
    badge: "HOT 🔥",
    gradient: "from-[#ff5e3a] via-[#f97316] to-[#ef4444]",
    iconBg: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    glow: "shadow-orange-600/40",
    accentBorder: "border-orange-400/50"
  },
  {
    id: "mobile",
    name: "Mobile Games",
    icon: "Smartphone",
    badge: "Android & iOS",
    gradient: "from-[#10b981] via-[#059669] to-[#047857]",
    iconBg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    glow: "shadow-emerald-600/40",
    accentBorder: "border-emerald-400/50"
  },
  {
    id: "pc",
    name: "PC & Konsol",
    icon: "Monitor",
    badge: "Steam / Epic",
    gradient: "from-[#2563eb] via-[#3b82f6] to-[#6366f1]",
    iconBg: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    glow: "shadow-blue-600/40",
    accentBorder: "border-blue-400/50"
  },
  {
    id: "voucher",
    name: "Voucher Digital",
    icon: "Ticket",
    badge: "Diskon 20%",
    gradient: "from-[#d946ef] via-[#c026d3] to-[#9333ea]",
    iconBg: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30",
    glow: "shadow-fuchsia-600/40",
    accentBorder: "border-fuchsia-400/50"
  },
  {
    id: "entertainment",
    name: "Aplikasi & Pulsa",
    icon: "Tv",
    badge: "Instan 24/7",
    gradient: "from-[#f43f5e] via-[#e11d48] to-[#be123c]",
    iconBg: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    glow: "shadow-rose-600/40",
    accentBorder: "border-rose-400/50"
  }
];

export const GAMES = enrichedGames;

// Metode Pembayaran Dayjhostore dengan aset gambar asli
export const PAYMENT_METHODS = [
  {
    group: "QRIS",
    description: "Scan instan dari semua e-wallet & m-banking",
    items: [
      {
        id: "qris",
        name: "QRIS ( ALL PAYMENT )",
        subtitle: "BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA",
        badge: "Paling Populer",
        badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        feeRate: 0.007, // 0.7% fee
        flatFee: 0,
        image: "/assets/payments/qris.png",
        logoType: "qris"
      }
    ]
  },
  {
    group: "E-Wallet",
    description: "Pembayaran dompet digital otomatis instan 1 detik",
    items: [
      {
        id: "dana",
        name: "DANA",
        subtitle: "Aplikasi Dompet Digital DANA",
        badge: "Instan",
        feeRate: 0.02,
        flatFee: 200,
        image: "/assets/payments/dana.png",
        logoType: "dana"
      },
      {
        id: "shopeepay",
        name: "SHOPEEPAY",
        subtitle: "ShopeePay & Saldo Shopee",
        feeRate: 0.025,
        flatFee: 250,
        image: "/assets/payments/shopeepay.png",
        logoType: "shopeepay"
      },
      {
        id: "ovo",
        name: "OVO",
        subtitle: "OVO Cash / OVO Points",
        feeRate: 0.02,
        flatFee: 200,
        image: "/assets/payments/ovo.png",
        logoType: "ovo"
      },
      {
        id: "linkaja",
        name: "LINKAJA",
        subtitle: "BUMN Digital Wallet",
        feeRate: 0.02,
        flatFee: 200,
        image: "/assets/payments/linkaja.png",
        logoType: "linkaja"
      }
    ]
  },
  {
    group: "Virtual Account",
    description: "Verifikasi otomatis 24 Jam bebas gangguan",
    items: [
      {
        id: "briva",
        name: "BRI VIRTUAL ACCOUNT",
        subtitle: "BRIVA Mobile & ATM BRI",
        feeRate: 0,
        flatFee: 3000,
        image: "/assets/payments/briva.png",
        logoType: "briva"
      },
      {
        id: "bni",
        name: "BNI VIRTUAL ACCOUNT",
        subtitle: "BNI Mobile & ATM BNI",
        feeRate: 0,
        flatFee: 3500,
        image: "/assets/payments/bni.png",
        logoType: "bni"
      },
      {
        id: "mandiri",
        name: "MANDIRI VIRTUAL ACCOUNT",
        subtitle: "Livin' by Mandiri & ATM Mandiri",
        feeRate: 0,
        flatFee: 3000,
        image: "/assets/payments/mandiri.png",
        logoType: "mandiri"
      },
      {
        id: "bca",
        name: "BCA VIRTUAL ACCOUNT",
        subtitle: "m-BCA, KlikBCA & ATM BCA",
        badge: "Favorit",
        feeRate: 0,
        flatFee: 5000,
        image: "/assets/payments/bca.png",
        logoType: "bca"
      },
      {
        id: "permata",
        name: "PERMATA VIRTUAL ACCOUNT",
        subtitle: "PermataMobile X & ATM",
        feeRate: 0,
        flatFee: 2500,
        image: "/assets/payments/permata.png",
        logoType: "permata"
      },
      {
        id: "cimb",
        name: "CIMB VIRTUAL ACCOUNT",
        subtitle: "OCTO Mobile & ATM CIMB Niaga",
        feeRate: 0,
        flatFee: 2500,
        image: "/assets/payments/cimb.webp",
        logoType: "cimb"
      },
      {
        id: "danamon",
        name: "DANAMON VIRTUAL ACCOUNT",
        subtitle: "D-Bank PRO & ATM Danamon",
        feeRate: 0,
        flatFee: 2500,
        image: "/assets/payments/danamon.webp",
        logoType: "danamon"
      },
      {
        id: "bnc",
        name: "BNC (Neo Commerce) VIRTUAL ACCOUNT",
        subtitle: "Neobank & Bank Neo Commerce",
        feeRate: 0,
        flatFee: 3000,
        image: "/assets/payments/bnc.png",
        logoType: "bnc"
      },
      {
        id: "bsi",
        name: "BSI VIRTUAL ACCOUNT",
        subtitle: "BSI Mobile & ATM Syariah Indonesia",
        feeRate: 0,
        flatFee: 3000,
        image: "/assets/payments/bsi.webp",
        logoType: "bsi"
      }
    ]
  },
  {
    group: "Convenience Store",
    description: "Bayar tunai di kasir gerai terdekat seluruh Indonesia",
    items: [
      {
        id: "indomaret",
        name: "INDOMARET",
        subtitle: "Kasir Indomaret, Ceriamart & i-Saku",
        feeRate: 0,
        flatFee: 1500,
        image: "/assets/payments/indomaret.webp",
        logoType: "indomaret"
      },
      {
        id: "alfamart",
        name: "ALFAMART",
        subtitle: "Kasir Alfamart, Alfamidi, Dan+Dan",
        feeRate: 0,
        flatFee: 1500,
        image: "/assets/payments/alfamart.webp",
        logoType: "alfamart"
      }
    ]
  }
];

export const NEWS_LIST = [
  {
    id: 1,
    title: "Waspada Penipuan APK Berkedok Promo Gim!",
    excerpt: "Kenali modus penipuan aplikasi ilegal. YUMATOPUP tidak pernah mewajibkan install file APK di luar saluran resmi.",
    date: "04 Nov 2026",
    tag: "KEAMANAN",
    image: "/assets/codashop/ID-LinkyAI-CodashopLaunch-730x280.png"
  },
  {
    id: 2,
    title: "YUMATOPUP Hadirkan Double Diamonds Mobile Legends",
    excerpt: "Nikmati bonus diamond hingga 2x lipat untuk setiap pembelian nominal promo di YUMATOPUP Indonesia.",
    date: "03 Nov 2026",
    tag: "PROMO",
    image: "/assets/codashop/MLBB-2025-tiles-178x178.jpg"
  },
  {
    id: 3,
    title: "Program YumaRewards: Kumpulkan Poin, Dapatkan Voucher Gratis",
    excerpt: "Setiap transaksi menghasilkan YumaPoints yang dapat ditukarkan dengan potongan belanja hingga 50%.",
    date: "01 Nov 2026",
    tag: "FITUR BARU",
    image: "/assets/codashop/Roblox-Gift-Cards-tile.png"
  }
];
