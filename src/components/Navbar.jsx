import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck
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
    : games.filter(g => 
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.publisher.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
    setIsSearchFocused(false);
  };

  const handleSelectSearchResult = (game) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    if (onSelectGame) onSelectGame(game);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b0d13]/95 backdrop-blur-md border-b border-[#1c2232]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="cursor-pointer flex-shrink-0" onClick={() => onSelectGame(null)}>
            <YumaShopLogo className="h-9 sm:h-12 w-auto" />
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
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#121622] text-sm text-slate-100 placeholder-slate-400 border border-[#1e2538] focus:outline-none focus:border-[#ff4655] focus:ring-2 focus:ring-[#ff4655]/20 transition-all shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </form>

            {/* Quick Search Autocomplete Dropdown - Desktop */}
            {isSearchFocused && filteredGames.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#121622] border border-[#222a3d] rounded-2xl shadow-2xl overflow-hidden z-50 text-left">
                <div className="p-2 text-xs font-semibold text-red-400 uppercase tracking-wider px-3 border-b border-[#1c2232]">
                  Game Ditemukan ({filteredGames.length})
                </div>
                <div className="divide-y divide-[#1a2030]">
                  {filteredGames.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => handleSelectSearchResult(game)}
                      className="flex items-center gap-3 p-3 hover:bg-[#181d2a] cursor-pointer transition-colors"
                    >
                      <img 
                        src={game.thumbnail} 
                        alt={game.name} 
                        className="w-10 h-10 rounded-lg object-cover border border-[#222a3d]"
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
          <div className="flex items-center gap-1.5 sm:gap-4">
            
            {/* Region / Currency Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121622] border border-[#1e2538] text-xs font-medium text-slate-300">
              <IndonesiaFlag className="w-4 h-3" />
              <span>ID / IDR</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 sm:p-2.5 rounded-full bg-[#121622] hover:bg-[#181d2a] text-slate-300 hover:text-white border border-[#1e2538] hover:border-[#ff4655]/50 transition-colors relative cursor-pointer"
                title="Notifikasi Promo"
                aria-label="Notifikasi"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 bg-[#ff4655] rounded-full animate-pulse" />
              </button>

              {/* Notification Popover - Constrained for Mobile */}
              {notificationOpen && (
                <div className="fixed sm:absolute top-14 sm:top-full right-3 sm:right-0 mt-1 w-[calc(100vw-1.5rem)] sm:w-80 max-w-sm bg-[#121622] border border-[#222a3d] rounded-2xl shadow-2xl p-4 z-50 text-left">
                  <div className="flex items-center justify-between border-b border-[#1c2232] pb-2 mb-3">
                    <span className="font-semibold text-sm text-white">Notifikasi & Promo</span>
                    <span className="text-[10px] bg-red-500/20 text-[#ff4655] px-2 py-0.5 rounded-full font-bold">2 Baru</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#161a25] border border-[#202738]">
                      <div className="font-bold text-amber-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Bonus Diamond 2x Lipat
                      </div>
                      <p className="text-slate-300 mt-1">Mobile Legends AllStar 2026 kembali hadir! Dapatkan bonus recharge hingga 2x lipat.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#161a25] border border-[#202738]">
                      <div className="font-bold text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Transaksi 100% Aman
                      </div>
                      <p className="text-slate-300 mt-1">YUMATOPUP telah resmi bekerja sama langsung dengan publisher game internasional.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button 
                onClick={onOpenAuth}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-[#121622] hover:bg-[#181d2a] border border-[#1e2538] hover:border-[#ff4655]/50 transition-all cursor-pointer"
              >
                <User className="w-4 h-4 text-[#ff4655]" />
                <span>Masuk</span>
              </button>

              <button 
                onClick={onOpenAuth}
                className="inline-flex items-center justify-center px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#ff4655] via-[#ff5400] to-[#ff6b00] hover:brightness-110 shadow-lg shadow-red-500/25 transition-all transform active:scale-95 cursor-pointer"
              >
                Daftar
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#121622] text-slate-300 hover:text-white border border-[#1e2538] cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>
        </div>

        {/* Mobile Search Bar with Live Autocomplete */}
        <div className="pb-2.5 pt-0.5 md:hidden relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Cari game favorit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#121622] text-xs text-slate-100 placeholder-slate-400 border border-[#1e2538] focus:outline-none focus:border-[#ff4655] shadow-inner"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          </form>

          {/* Quick Search Autocomplete Dropdown - Mobile */}
          {isSearchFocused && filteredGames.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#121622] border border-[#222a3d] rounded-2xl shadow-2xl overflow-hidden z-50 text-left">
              <div className="p-2 text-[11px] font-semibold text-red-400 uppercase tracking-wider px-3 border-b border-[#1c2232]">
                Game Ditemukan ({filteredGames.length})
              </div>
              <div className="divide-y divide-[#1a2030] max-h-64 overflow-y-auto">
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => handleSelectSearchResult(game)}
                    className="flex items-center gap-2.5 p-2.5 hover:bg-[#181d2a] active:bg-[#1f2536] cursor-pointer transition-colors"
                  >
                    <img 
                      src={game.thumbnail} 
                      alt={game.name} 
                      className="w-8 h-8 rounded-lg object-cover border border-[#222a3d] flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs text-white truncate">{game.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{game.publisher}</div>
                    </div>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded flex-shrink-0">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(game.startingPrice)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#1c2232] space-y-3">
            <div className="flex items-center justify-between px-1 text-xs text-slate-300">
              <span>Negara / Mata Uang:</span>
              <span className="font-semibold text-white flex items-center gap-1.5">
                <IndonesiaFlag className="w-4 h-3" /> Indonesia (IDR)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="w-full py-2.5 rounded-xl bg-[#121622] text-slate-200 text-xs font-semibold border border-[#1e2538] active:bg-[#181d2a]"
              >
                Masuk
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ff4655] to-[#ff6b00] text-white text-xs font-bold shadow"
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
