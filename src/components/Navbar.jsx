import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck,
  Zap,
  Gamepad2
} from 'lucide-react';
import { IndonesiaFlag } from './PaymentLogos';
import YumaShopLogo from './YumaShopLogo';

export default function Navbar({ onSearch, onSelectGame, games = [], onOpenAuth }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const filteredGames = searchQuery.trim() === '' 
    ? [] 
    : games.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handleSelectSearchResult = (game) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    if (onSelectGame) onSelectGame(game);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#120d24]/95 backdrop-blur-md border-b border-[#2d244c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="cursor-pointer" onClick={() => onSelectGame(null)}>
            <YumaShopLogo />
          </div>

          {/* Search Bar - Desktop & Tablet */}
          <div className="relative flex-1 max-w-lg hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Cari game favoritmu (Mobile Legends, Free Fire, dll)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#1e1738] text-sm text-slate-100 placeholder-slate-400 border border-[#372d5b] focus:outline-none focus:border-[#7940f2] focus:ring-2 focus:ring-[#7940f2]/30 transition-all shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </form>

            {/* Quick Search Autocomplete Dropdown */}
            {isSearchFocused && filteredGames.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1b1434] border border-[#3b3062] rounded-2xl shadow-2xl overflow-hidden z-50">
                <div className="p-2 text-xs font-semibold text-purple-300 uppercase tracking-wider px-3 border-b border-[#2e2550]">
                  Game Ditemukan ({filteredGames.length})
                </div>
                <div className="divide-y divide-[#2a2249]">
                  {filteredGames.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => handleSelectSearchResult(game)}
                      className="flex items-center gap-3 p-3 hover:bg-[#281f4a] cursor-pointer transition-colors"
                    >
                      <img 
                        src={game.thumbnail} 
                        alt={game.name} 
                        className="w-10 h-10 rounded-lg object-cover border border-[#44386e]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-white truncate">{game.name}</div>
                        <div className="text-xs text-slate-400">{game.publisher}</div>
                      </div>
                      <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        Mulai {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(game.startingPrice)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Region / Currency Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e1738] border border-[#322858] text-xs font-medium text-slate-300">
              <IndonesiaFlag className="w-4 h-3" />
              <span>ID / IDR</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2.5 rounded-full bg-[#1e1738] hover:bg-[#281f4a] text-slate-300 hover:text-white border border-[#322858] transition-colors relative"
                title="Notifikasi Promo"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              </button>

              {/* Notification Popover */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#1b1434] border border-[#3b3062] rounded-2xl shadow-2xl p-4 z-50 text-left">
                  <div className="flex items-center justify-between border-b border-[#2e2550] pb-2 mb-3">
                    <span className="font-semibold text-sm text-white">Notifikasi & Promo</span>
                    <span className="text-[10px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full font-bold">2 Baru</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#241c42] border border-[#35295c]">
                      <div className="font-bold text-amber-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Bonus Diamond 2x Lipat
                      </div>
                      <p className="text-slate-300 mt-1">Mobile Legends AllStar 2026 kembali hadir! Dapatkan bonus recharge hingga 2x lipat.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#241c42] border border-[#35295c]">
                      <div className="font-bold text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Transaksi 100% Aman
                      </div>
                      <p className="text-slate-300 mt-1">YUMASHOP telah resmi bekerja sama langsung dengan publisher game internasional.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={onOpenAuth}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-[#1e1738] hover:bg-[#281f4a] border border-[#372d5b] transition-all"
              >
                <User className="w-4 h-4 text-purple-400" />
                <span>Masuk</span>
              </button>

              <button 
                onClick={onOpenAuth}
                className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#6242fc] via-[#7d3ff5] to-[#f54291] hover:brightness-110 shadow-lg shadow-purple-600/30 transition-all transform active:scale-95"
              >
                Daftar
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#1e1738] text-slate-300 hover:text-white border border-[#322858]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Cari game favorit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#1e1738] text-xs text-slate-100 placeholder-slate-400 border border-[#372d5b] focus:outline-none focus:border-[#7940f2]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </form>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#2d244c] space-y-3">
            <div className="flex items-center justify-between px-2 text-xs text-slate-300">
              <span>Negara / Mata Uang:</span>
              <span className="font-semibold text-white flex items-center gap-1.5">
                <IndonesiaFlag className="w-4 h-3" /> Indonesia (IDR)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="w-full py-2.5 rounded-xl bg-[#1e1738] text-slate-200 text-xs font-semibold border border-[#372d5b]"
              >
                Masuk
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#6242fc] to-[#f54291] text-white text-xs font-bold shadow"
              >
                Daftar Akun
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}

