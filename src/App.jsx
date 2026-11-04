import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import AnnoucementBar from './components/AnnoucementBar';
import HeroBanner from './components/HeroBanner';
import CategoryTabs from './components/CategoryTabs';
import ProductCard from './components/ProductCard';
import TopUpFlow from './components/TopUpFlow';
import CheckoutModal from './components/CheckoutModal';
import FeaturesSection from './components/FeaturesSection';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import UnifiedModal from './components/UnifiedModal';
import { CardSkeleton, PageLoader } from './components/SkeletonLoader';
import { GAMES } from './data/mockData';
import { Flame, ChevronDown, RotateCw } from 'lucide-react';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(24);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  // Initial page loader simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter games by category and search
  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesCategory =
        activeCategory === 'all'
          ? true
          : game.category.includes(activeCategory);

      const matchesSearch =
        searchQuery.trim() === ''
          ? true
          : game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.publisher.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Games currently shown on page
  const displayedGames = filteredGames.slice(0, visibleCount);
  const hasMore = visibleCount < filteredGames.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 24);
      setIsLoadingMore(false);
    }, 350);
  };

  const handleSelectGameById = (gameId) => {
    const found = GAMES.find(g => g.id === gameId);
    if (found) {
      setSelectedGame(found);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectGame = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedGame(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSecurityTips = () => {
    setModalConfig({
      type: 'security',
      title: 'Tips Keamanan Transaksi YUMATOPUP',
      message: 'Demi kenyamanan dan keamanan berbelanja Anda, mohon perhatikan panduan resmi berikut:',
      items: [
        'Selalu pastikan Anda bertransaksi di website resmi YUMATOPUP (yumatopup.com).',
        'YUMATOPUP tidak pernah meminta password akun game, PIN akun, atau kode OTP.',
        'Jangan pernah mengunduh file APK dari sumber tidak terverifikasi.',
        'Laporkan kendala pembayaran langsung ke Layanan Pelanggan 24/7 kami.'
      ],
      actionText: 'Saya Mengerti & Lanjutkan'
    });
  };

  if (isInitialLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-[#0e0a1c] text-slate-100 flex flex-col font-sans selection:bg-[#ff5e3a] selection:text-white">

      {/* Announcement Warning Bar */}
      <AnnoucementBar onOpenSecurityTips={handleOpenSecurityTips} />

      {/* Main Header / Navbar */}
      <Navbar
        games={GAMES}
        onSearch={(query) => { setSearchQuery(query); setVisibleCount(24); }}
        onSelectGame={(game) => setSelectedGame(game)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1">
        {selectedGame ? (
          /* ================= PRODUCT DETAIL & TOP-UP FLOW ================= */
          <TopUpFlow
            game={selectedGame}
            onBack={handleBackToHome}
            onCheckout={(orderData) => setActiveOrder(orderData)}
            onShowModal={(cfg) => setModalConfig(cfg)}
          />
        ) : (
          /* ================= HOME / LANDING PAGE ================= */
          <div>
            {/* Hero Banner Carousel */}
            <HeroBanner onSelectGameById={handleSelectGameById} />

            {/* Category Filter Pills */}
            <CategoryTabs
              activeCategory={activeCategory}
              onSelectCategory={(catId) => { setActiveCategory(catId); setVisibleCount(24); }}
            />

            {/* Game Catalog Grid Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Flame className="w-4 h-4 fill-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-white text-left">
                      Pilihan Game & Voucher Terpopuler
                    </h2>
                    <p className="text-xs text-slate-400 text-left">
                      Pilih game favoritmu dari katalog {GAMES.length} produk resmi YUMATOPUP
                    </p>
                  </div>
                </div>

                <div className="text-xs text-purple-300 font-semibold bg-[#1e1738] px-3 py-1.5 rounded-full border border-[#352a5c]">
                  {filteredGames.length} Game Tersedia
                </div>
              </div>

              {/* Product Cards Grid */}
              {filteredGames.length > 0 ? (
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                    {displayedGames.map((game) => (
                      <ProductCard
                        key={game.id}
                        game={game}
                        onSelect={handleSelectGame}
                      />
                    ))}

                    {/* Skeleton loaders during Load More */}
                    {isLoadingMore && Array.from({ length: 6 }).map((_, i) => (
                      <CardSkeleton key={`skeleton-${i}`} />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMore && (
                    <div className="mt-8 text-center">
                      <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#1e1738] hover:bg-[#281f4a] text-slate-200 hover:text-white border border-[#3d3164] text-xs sm:text-sm font-bold shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        {isLoadingMore ? (
                          <>
                            <RotateCw className="w-4 h-4 animate-spin text-purple-400" />
                            <span>Memuat Produk...</span>
                          </>
                        ) : (
                          <>
                            <span>Tampilkan Lebih Banyak Game ({filteredGames.length - visibleCount} tersisa)</span>
                            <ChevronDown className="w-4 h-4 text-purple-400" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-16 text-center bg-[#1b1437] rounded-3xl border border-[#362b5d] my-6">
                  <p className="text-slate-400 text-sm">Tidak ada game yang cocok dengan pencarian "{searchQuery}".</p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                    className="mt-3 px-4 py-2 rounded-xl bg-[#6242fc] text-white text-xs font-bold cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              )}

            </section>

            {/* Value Propositions / Trust Features */}
            <FeaturesSection />

            {/* News and Updates */}
            <NewsSection onOpenNews={(cfg) => setModalConfig(cfg)} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Checkout & QRIS Modal */}
      {activeOrder && (
        <CheckoutModal
          order={activeOrder}
          onClose={() => setActiveOrder(null)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onShowSuccess={(msg) => setModalConfig({
          type: 'success',
          title: 'Berhasil Masuk',
          message: msg,
          actionText: 'Tutup'
        })}
      />

      {/* Unified Cool Pop-up System (Replaces native browser alerts) */}
      <UnifiedModal
        isOpen={!!modalConfig}
        config={modalConfig}
        onClose={() => setModalConfig(null)}
      />

    </div>
  );
}
