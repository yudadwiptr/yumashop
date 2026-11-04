import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  HelpCircle,
  Check,
  ShieldCheck,
  Zap,
  Sparkles,
  Star,
  ChevronDown,
  ChevronUp,
  Info,
  CreditCard
} from 'lucide-react';
import { PAYMENT_METHODS } from '../data/mockData';

export default function TopUpFlow({ game, onBack, onCheckout, onShowModal }) {
  // Step 1: User ID & Zone ID
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState(game.serverOptions ? game.serverOptions[0] : '');
  const [showIdHelp, setShowIdHelp] = useState(false);

  // Step 2: Denomination selection
  const [selectedDenomCategory, setSelectedDenomCategory] = useState('Semua');
  const [selectedDenom, setSelectedDenom] = useState(
    game.denominations.find(d => d.popular) || game.denominations[0]
  );

  // Accordion open/collapse states (default all open like Dayjhostore)
  const [openAccordions, setOpenAccordions] = useState({
    "QRIS": true,
    "E-Wallet": true,
    "Virtual Account": true,
    "Convenience Store": true
  });

  const toggleAccordion = (groupName) => {
    setOpenAccordions(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  // Step 3: Payment method (default to QRIS)
  const [selectedPayment, setSelectedPayment] = useState(
    PAYMENT_METHODS[0].items[0]
  );

  // Step 4: Contact & Promo
  const [contactInfo, setContactInfo] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Filter denominations by category
  const denomCategories = ['Semua', ...new Set(game.denominations.map(d => d.category))];
  const filteredDenominations = selectedDenomCategory === 'Semua'
    ? game.denominations
    : game.denominations.filter(d => d.category === selectedDenomCategory);

  // Calculate pricing helper
  const basePrice = selectedDenom ? selectedDenom.price : 0;

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === 'percent') {
      return Math.round((basePrice * appliedPromo.value) / 100);
    }
    return appliedPromo.value;
  }, [basePrice, appliedPromo]);

  // Method price calculator matching Dayjhostore logic
  const calculateMethodPrice = (item) => {
    if (!selectedDenom) return 0;
    const base = selectedDenom.price;
    const fee = Math.round((base * (item.feeRate || 0)) + (item.flatFee || 0));
    return Math.max(0, base + fee - discountAmount);
  };

  const currentTotalPrice = selectedPayment ? calculateMethodPrice(selectedPayment) : basePrice;

  // Format currency helper
  const formatIDR = (num) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

      if (code === 'YUMATOPUP' || code === 'YUMASHOP' || code === 'YUMAHEMAT' || code === 'WELCOME') {
        setAppliedPromo({
          code: code,
          type: 'percent',
          value: 10,
        description: 'Diskon 10% Spesial Pengguna Baru YUMATOPUP!'
        });
      } else if (code === 'MLBB2026' || code === 'PROMO5K') {
        setAppliedPromo({
          code: code,
          type: 'flat',
          value: 5000,
          description: 'Potongan Langsung Rp 5.000!'
        });
      } else {
        setPromoError('Kode promo tidak valid atau telah kedaluwarsa.');
      }
    };

    const handleFormSubmit = (e) => {
      e.preventDefault();
      if (!userId.trim()) {
        if (onShowModal) {
          onShowModal({
            type: 'warning',
            title: 'Data Akun Belum Diisi',
            message: `Mohon masukkan ${game.inputLabel || 'User ID'} akun game Anda sebelum melanjutkan ke pembayaran.`
          });
        }
        return;
      }

      if (!selectedDenom) {
        if (onShowModal) {
          onShowModal({
            type: 'warning',
            title: 'Nominal Belum Dipilih',
            message: 'Silakan pilih salah satu nominal produk atau paket diamond yang ingin Anda top up.'
          });
        }
        return;
      }

      if (!selectedPayment) {
        if (onShowModal) {
          onShowModal({
            type: 'warning',
            title: 'Metode Pembayaran Belum Dipilih',
            message: 'Silakan pilih salah satu metode pembayaran yang tersedia (QRIS, E-Wallet, atau Virtual Account).'
          });
        }
        return;
      }

      onCheckout({
        game,
        userId,
        zoneId,
        denomination: selectedDenom,
        paymentMethod: selectedPayment,
        contactInfo,
        pricing: {
          basePrice,
          adminFee: currentTotalPrice - (basePrice - discountAmount),
          discountAmount,
          totalPrice: currentTotalPrice,
          appliedPromo
        }
      });
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Back button & Breadcrumb */}
        <div className="flex items-center gap-3 mb-6 text-sm">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1d163a] hover:bg-[#281f4f] text-slate-300 hover:text-white border border-[#372b5c] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400">Top Up</span>
          <span className="text-slate-500">/</span>
          <span className="font-semibold text-white">{game.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Game Info & Instructions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#1b1437] border border-[#362b5d] rounded-3xl p-6 shadow-xl sticky top-24">

              {/* Game Header */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={game.thumbnail}
                  alt={game.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#54438b] shadow-lg shadow-purple-950/50 flex-shrink-0"
                />
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold mb-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Resmi & Legal 100%</span>
                  </div>
                  <h1 className="text-xl font-black text-white leading-tight">
                    {game.name}
                  </h1>
                  <p className="text-xs text-slate-400 font-medium">
                    {game.publisher}
                  </p>
                </div>
              </div>

              {/* Rating & Speed Indicators */}
              <div className="grid grid-cols-2 gap-2 py-3 border-y border-[#2d2250] text-center my-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-amber-300 font-bold text-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span>{game.rating} / 5.0</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{game.reviewsCount} Ulasan</span>
                </div>
                <div className="flex flex-col items-center border-l border-[#2d2250]">
                  <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
                    <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                    <span>1-3 Detik</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Pengiriman Instan</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {game.description}
              </p>

              {/* Safety badge */}
              <div className="mt-4 p-3 rounded-2xl bg-[#231b46] border border-[#3b2f65] flex items-start gap-2.5 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Jaminan Tanpa Login Akun</span>
                  <span>Cukup masukkan ID game Anda. Password akun Anda tetap aman 100%.</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: 4-Step Top Up Form */}
          <div className="lg:col-span-8 space-y-6 text-left">

            {/* ================= STEP 1: USER ID ================= */}
            <div className="bg-[#1b1437] border border-[#362b5d] rounded-3xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6242fc] to-[#f54291] text-white font-black text-sm flex items-center justify-center shadow-md">
                    1
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    Masukkan Informasi Akun Game
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIdHelp(!showIdHelp)}
                  className="inline-flex items-center gap-1 text-xs text-purple-300 hover:text-white transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Petunjuk ID</span>
                </button>
              </div>

              {/* Helper Alert */}
              {showIdHelp && (
                <div className="mb-4 p-3 rounded-2xl bg-[#251c4b] border border-[#483777] text-xs text-slate-200 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300">Cara Menemukan ID: </span>
                    {game.helperText}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {game.inputLabel || "User ID"} <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={game.inputPlaceholder || "Masukkan ID"}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#241b46] text-white border border-[#3c2f68] focus:outline-none focus:border-[#7c4df7] focus:ring-2 focus:ring-[#7c4df7]/30 text-sm font-medium transition-all"
                  />
                </div>

                {game.hasZoneId && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {game.zoneLabel || "Zone ID"} <span className="text-rose-400">*</span>
                    </label>
                    {game.isServerSelect ? (
                      <select
                        value={zoneId}
                        onChange={(e) => setZoneId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#241b46] text-white border border-[#3c2f68] focus:outline-none focus:border-[#7c4df7] text-sm font-medium transition-all"
                      >
                        {game.serverOptions.map(srv => (
                          <option key={srv} value={srv} className="bg-[#1b1437]">Server {srv}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder={game.zonePlaceholder || "Zone ID"}
                        value={zoneId}
                        onChange={(e) => setZoneId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#241b46] text-white border border-[#3c2f68] focus:outline-none focus:border-[#7c4df7] text-sm font-medium transition-all"
                      />
                    )}
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-400 mt-2.5">
                Demi keamanan dan ketepatan pengiriman, pastikan ID akun yang Anda masukkan sudah sesuai.
              </p>
            </div>

            {/* ================= STEP 2: NOMINAL / DENOMINATIONS ================= */}
            <div className="bg-[#1b1437] border border-[#362b5d] rounded-3xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6242fc] to-[#f54291] text-white font-black text-sm flex items-center justify-center shadow-md">
                    2
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    Pilih Nominal Top Up
                  </h2>
                </div>
              </div>

              {/* Denomination Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4">
                {denomCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedDenomCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${selectedDenomCategory === cat
                        ? 'bg-gradient-to-r from-[#6242fc] to-[#8c52ff] text-white border border-purple-400/40 shadow-sm'
                        : 'bg-[#241b46] text-slate-300 hover:text-white border border-[#3a2f64]'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Denomination Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredDenominations.map((denom) => {
                  const isSelected = selectedDenom && selectedDenom.id === denom.id;
                  return (
                    <div
                      key={denom.id}
                      onClick={() => setSelectedDenom(denom)}
                      className={`relative p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all duration-200 border text-left flex flex-col justify-between ${isSelected
                          ? 'bg-gradient-to-b from-[#2a1d56] to-[#1e1540] border-[#7c4df7] ring-2 ring-[#7c4df7]/40 shadow-lg shadow-purple-950/40 -translate-y-0.5'
                          : 'bg-[#221a42] hover:bg-[#281f4f] border-[#372b5f] hover:border-[#524089]'
                        }`}
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        {denom.discount ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-400 text-slate-950">
                            {denom.discount}
                          </span>
                        ) : <span />}

                        {denom.bestValue && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Best Value
                          </span>
                        )}

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#7c4df7] text-white flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="font-black text-sm text-white group-hover:text-amber-300">
                          {denom.name}
                        </div>
                        {denom.bonus && (
                          <div className="text-[11px] font-semibold text-emerald-400 mt-0.5">
                            {denom.bonus}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#312556]">
                        {denom.originalPrice && (
                          <span className="text-[11px] text-slate-500 line-through block -mb-0.5">
                            {formatIDR(denom.originalPrice)}
                          </span>
                        )}
                        <span className="text-xs sm:text-sm font-extrabold text-amber-400">
                          {formatIDR(denom.price)}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= STEP 3: PAYMENT METHOD (DAYJHOSTORE DESIGN) ================= */}
            <div className="bg-[#1b1437] border border-[#362b5d] rounded-3xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6242fc] to-[#f54291] text-white font-black text-sm flex items-center justify-center shadow-md">
                  3
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    Pilih Metode Pembayaran
                  </h2>
                  <p className="text-xs text-slate-400">
                    Tarif harga disinkronkan otomatis sesuai kanal pembayaran resmi.
                  </p>
                </div>
              </div>

              {/* Accordion List Matching Dayjhostore UI */}
              <div className="space-y-4">
                {PAYMENT_METHODS.map((group) => {
                  const isOpen = openAccordions[group.group] !== false;

                  return (
                    <div
                      key={group.group}
                      className="rounded-2xl border border-[#372b60] bg-[#140e2b] overflow-hidden shadow-md"
                    >
                      {/* Accordion Header */}
                      <button
                        type="button"
                        onClick={() => toggleAccordion(group.group)}
                        className="w-full px-5 py-3.5 bg-[#211842] hover:bg-[#281d50] flex items-center justify-between text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <CreditCard className="w-4 h-4 text-purple-400" />
                          <span className="font-extrabold text-sm text-white tracking-wide">
                            {group.group}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="hidden sm:inline text-xs text-slate-400">
                            {group.description}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-purple-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-purple-400" />
                          )}
                        </div>
                      </button>

                      {/* Accordion Body: Cards Grid */}
                      {isOpen && (
                        <div className="p-4 sm:p-5">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {group.items.map((item) => {
                              const isSelected = selectedPayment && selectedPayment.id === item.id;
                              const calculatedPrice = calculateMethodPrice(item);

                              return (
                                <div
                                  key={item.id}
                                  onClick={() => setSelectedPayment(item)}
                                  className={`relative p-3.5 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col justify-between ${isSelected
                                      ? 'bg-white border-2 border-[#1677ff] shadow-xl ring-2 ring-[#1677ff]/30 -translate-y-0.5'
                                      : 'bg-[#f4f5f8] hover:bg-white border border-slate-200 hover:shadow-md'
                                    }`}
                                >
                                  {/* Top: Image Logo */}
                                  <div className="h-7 flex items-center justify-start mb-2">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="max-h-7 max-w-[100px] object-contain object-left"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                  </div>

                                  {/* Middle: Bold Price in Dayjhostore format */}
                                  <div className="text-sm sm:text-base font-extrabold text-[#0f172a] my-0.5 tracking-tight">
                                    {formatIDR(calculatedPrice)}
                                  </div>

                                  {/* Divider */}
                                  <hr className="border-slate-200 my-1" />

                                  {/* Bottom: Uppercase Name */}
                                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
                                    {item.name}
                                  </div>

                                  {/* Selected Checkmark Badge (Image 5 style) */}
                                  {isSelected && (
                                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#1677ff] text-white flex items-center justify-center shadow-md">
                                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Bottom Logo Strip Matching Dayjhostore (Image 5 footer strip) */}
                      <div className="bg-white/95 px-4 py-2 border-t border-slate-200 flex items-center justify-end gap-3 overflow-x-auto">
                        {group.items.map((item) => (
                          <img
                            key={item.id}
                            src={item.image}
                            alt={item.name}
                            className="h-3.5 sm:h-4 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity"
                          />
                        ))}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= STEP 4: CONTACT & CHECKOUT ================= */}
            <div className="bg-[#1b1437] border border-[#362b5d] rounded-3xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6242fc] to-[#f54291] text-white font-black text-sm flex items-center justify-center shadow-md">
                  4
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    Beli & Selesaikan Pembayaran
                  </h2>
                  <p className="text-xs text-slate-400">
                    Bukti transaksi dan kode/status pembelian akan dikirimkan secara instan.
                  </p>
                </div>
              </div>

              {/* Contact Input */}
              <div className="space-y-4 mb-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nomor WhatsApp atau Alamat Email (Opsional tapi disarankan)
                  </label>
                  <input
                    type="text"
                    placeholder="08123456789 atau email@domain.com"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#241b46] text-white border border-[#3c2f68] focus:outline-none focus:border-[#7c4df7] text-sm font-medium"
                  />
                </div>

                {/* Promo Coupon Form */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Punya Kode Promo? Gunakan untuk Diskon Ekstra:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Contoh: YUMATOPUP atau YUMAHEMAT"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#241b46] text-white border border-[#3c2f68] focus:outline-none focus:border-[#7c4df7] text-sm uppercase font-bold tracking-wider"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-5 py-2.5 rounded-xl bg-[#6242fc] hover:bg-[#7354fc] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Terapkan
                    </button>
                  </div>

                  {appliedPromo && (
                    <div className="mt-2 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                      <span className="font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Kode "{appliedPromo.code}" Berhasil Diterapkan! {appliedPromo.description}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setAppliedPromo(null)}
                        className="text-xs text-rose-400 hover:underline ml-2 cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  )}

                  {promoError && (
                    <div className="mt-2 text-xs text-rose-400 font-medium">
                      {promoError}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#241b46] border-[#3c2f68] text-[#6242fc] focus:ring-0"
                  />
                  <label htmlFor="remember" className="text-xs text-slate-300 cursor-pointer">
                    Ingat data ID saya untuk transaksi berikutnya di YUMATOPUP
                  </label>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#231a44] border border-[#392d63] space-y-2.5 mb-6 text-xs sm:text-sm">
                <div className="font-bold text-white text-sm sm:text-base border-b border-[#312556] pb-2 flex items-center justify-between">
                  <span>Ringkasan Pesanan</span>
                  <span className="text-xs font-normal text-purple-300">YUMATOPUP Checkout</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Game</span>
                  <span className="font-semibold text-white">{game.name}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Nominal Dipilih</span>
                  <span className="font-semibold text-white">{selectedDenom?.name}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>User ID Target</span>
                  <span className="font-mono text-purple-300">{userId || '-'} {zoneId ? `(${zoneId})` : ''}</span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>Metode Pembayaran</span>
                  <div className="flex items-center gap-2">
                    {selectedPayment?.image && (
                      <img
                        src={selectedPayment.image}
                        alt={selectedPayment.name}
                        className="h-4 w-auto object-contain"
                      />
                    )}
                    <span className="font-semibold text-white">{selectedPayment?.name}</span>
                  </div>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Harga Produk</span>
                  <span>{formatIDR(basePrice)}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Biaya Layanan Admin</span>
                  <span>
                    {currentTotalPrice - (basePrice - discountAmount) <= 0
                      ? 'Bebas Biaya Admin (Rp 0)'
                      : formatIDR(currentTotalPrice - (basePrice - discountAmount))}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Potongan Promo</span>
                    <span>- {formatIDR(discountAmount)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#312556] flex justify-between items-center text-sm sm:text-base font-black text-white">
                  <span>Total Pembayaran:</span>
                  <span className="text-lg sm:text-xl text-amber-400 font-extrabold">
                    {formatIDR(currentTotalPrice)}
                  </span>
                </div>
              </div>

              {/* Action CTA Button */}
              <button
                type="button"
                onClick={handleFormSubmit}
                className="w-full py-4 rounded-2xl font-black text-base sm:text-lg text-white bg-gradient-to-r from-[#ff5e3a] via-[#f73859] to-[#6242fc] hover:brightness-110 shadow-xl shadow-orange-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-white" />
                <span>Beli Sekarang ({formatIDR(currentTotalPrice)})</span>
              </button>

              <div className="mt-3 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Transaksi dienkripsi 256-bit SSL & Diproses Secara Realtime</span>
              </div>

            </div>

          </div>

        </div>

        {/* Sticky Mobile Buy Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#150f2e]/95 backdrop-blur-md border-t border-[#372b5f] p-3 px-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Total Tagihan</span>
            <span className="text-base font-black text-amber-400">{formatIDR(currentTotalPrice)}</span>
          </div>
          <button
            onClick={handleFormSubmit}
            className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#ff5e3a] to-[#6242fc] shadow-lg shadow-purple-600/30 cursor-pointer"
          >
            Beli Sekarang
          </button>
        </div>

      </div>
    );
  }
