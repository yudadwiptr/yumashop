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

  // Accordion open/collapse states (default all open)
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

  // Method price calculator
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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-28 lg:pb-8">

      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-xs sm:text-sm flex-wrap">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121622] hover:bg-[#181d2a] text-slate-300 hover:text-white border border-[#1e2538] hover:border-[#ff4655]/50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Kembali</span>
        </button>
        <span className="text-slate-600">/</span>
        <span className="text-slate-400">Top Up</span>
        <span className="text-slate-600">/</span>
        <span className="font-semibold text-white truncate max-w-[200px] sm:max-w-none">{game.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">

        {/* Left Column: Game Info & Instructions */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          <div className="bg-[#11141d] border border-[#1e2436] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl sticky top-20 sm:top-24 text-left">

            {/* Game Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <img
                src={game.thumbnail}
                alt={game.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover border-2 border-[#222a3d] shadow-lg shadow-black/50 flex-shrink-0"
              />
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold mb-1">
                  <ShieldCheck className="w-3 h-3 flex-shrink-0" />
                  <span>Resmi & Legal 100%</span>
                </div>
                <h1 className="text-base sm:text-xl font-black text-white leading-tight truncate">
                  {game.name}
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium truncate">
                  {game.publisher}
                </p>
              </div>
            </div>

            {/* Rating & Speed Indicators */}
            <div className="grid grid-cols-2 gap-2 py-2.5 sm:py-3 border-y border-[#1c2232] text-center my-3 sm:my-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-amber-300 font-bold text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-300" />
                  <span>{game.rating} / 5.0</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-400">{game.reviewsCount} Ulasan</span>
              </div>
              <div className="flex flex-col items-center border-l border-[#1c2232]">
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs sm:text-sm">
                  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-emerald-400" />
                  <span>1-3 Detik</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-400">Pengiriman Instan</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed">
              {game.description}
            </p>

            {/* Safety badge */}
            <div className="mt-4 p-3 rounded-xl sm:rounded-2xl bg-[#141824] border border-[#1e2638] flex items-start gap-2.5 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Jaminan Tanpa Login Akun</span>
                <span className="text-[11px] sm:text-xs text-slate-300">Cukup masukkan ID game Anda. Password akun Anda tetap aman 100%.</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: 4-Step Top Up Form */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6 text-left">

          {/* ================= STEP 1: USER ID ================= */}
          <div className="bg-[#11141d] border border-[#1e2436] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between mb-3.5 sm:mb-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#ff4655] to-[#ff7a00] text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-md flex-shrink-0">
                  1
                </div>
                <h2 className="text-sm sm:text-lg font-bold text-white">
                  Masukkan Informasi Akun Game
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowIdHelp(!showIdHelp)}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-[#ff4655] hover:text-white transition-colors cursor-pointer flex-shrink-0"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Petunjuk ID</span>
              </button>
            </div>

            {/* Helper Alert */}
            {showIdHelp && (
              <div className="mb-4 p-3 rounded-xl bg-[#141824] border border-amber-500/30 text-xs text-slate-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">Cara Menemukan ID: </span>
                  {game.helperText}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#141824] text-white border border-[#1e2638] focus:outline-none focus:border-[#ff4655] focus:ring-2 focus:ring-[#ff4655]/20 text-xs sm:text-sm font-medium transition-all"
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
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#141824] text-white border border-[#1e2638] focus:outline-none focus:border-[#ff4655] text-xs sm:text-sm font-medium transition-all"
                    >
                      {game.serverOptions.map(srv => (
                        <option key={srv} value={srv} className="bg-[#11141d]">Server {srv}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder={game.zonePlaceholder || "Zone ID"}
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#141824] text-white border border-[#1e2638] focus:outline-none focus:border-[#ff4655] text-xs sm:text-sm font-medium transition-all"
                    />
                  )}
                </div>
              )}
            </div>

            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-2.5">
              Demi keamanan dan ketepatan pengiriman, pastikan ID akun yang Anda masukkan sudah sesuai.
            </p>
          </div>

          {/* ================= STEP 2: NOMINAL / DENOMINATIONS ================= */}
          <div className="bg-[#11141d] border border-[#1e2436] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between mb-3.5 sm:mb-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#ff4655] to-[#ff7a00] text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-md flex-shrink-0">
                  2
                </div>
                <h2 className="text-sm sm:text-lg font-bold text-white">
                  Pilih Nominal Top Up
                </h2>
              </div>
            </div>

            {/* Denomination Category Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2.5 mb-3.5">
              {denomCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedDenomCategory(cat)}
                  className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                    selectedDenomCategory === cat
                      ? 'bg-gradient-to-r from-[#ff4655] to-[#ff6b00] text-white border border-red-500/40 shadow-sm'
                      : 'bg-[#141824] text-slate-300 hover:text-white border border-[#1e2638]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Denomination Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {filteredDenominations.map((denom) => {
                const isSelected = selectedDenom && selectedDenom.id === denom.id;
                return (
                  <div
                    key={denom.id}
                    onClick={() => setSelectedDenom(denom)}
                    className={`relative p-2.5 sm:p-4 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 border text-left flex flex-col justify-between active:scale-[0.98] ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#241219] to-[#141824] border-[#ff4655] ring-2 ring-[#ff4655]/30 shadow-lg shadow-red-950/30 -translate-y-0.5'
                        : 'bg-[#141824] hover:bg-[#1a2030] border-[#1e2638] hover:border-[#ff4655]/60'
                    }`}
                  >
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-1 mb-1.5 sm:mb-2">
                      {denom.discount ? (
                        <span className="px-1.5 py-0.2 rounded text-[9px] sm:text-[10px] font-black bg-amber-400 text-slate-950">
                          {denom.discount}
                        </span>
                      ) : <span />}

                      {denom.bestValue && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] sm:text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Best Value
                        </span>
                      )}

                      {isSelected && (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#ff4655] text-white flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="font-black text-xs sm:text-sm text-white group-hover:text-amber-300 line-clamp-2">
                        {denom.name}
                      </div>
                      {denom.bonus && (
                        <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-400 mt-0.5">
                          {denom.bonus}
                        </div>
                      )}
                    </div>

                    <div className="mt-2.5 pt-1.5 sm:mt-3 sm:pt-2 border-t border-[#1c2232]">
                      {denom.originalPrice && (
                        <span className="text-[9px] sm:text-[11px] text-slate-500 line-through block -mb-0.5">
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

          {/* ================= STEP 3: PAYMENT METHOD ================= */}
          <div className="bg-[#11141d] border border-[#1e2436] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3.5 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#ff4655] to-[#ff7a00] text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-md flex-shrink-0">
                3
              </div>
              <div>
                <h2 className="text-sm sm:text-lg font-bold text-white">
                  Pilih Metode Pembayaran
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  Tarif harga disinkronkan otomatis sesuai kanal pembayaran resmi.
                </p>
              </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-3 sm:space-y-4">
              {PAYMENT_METHODS.map((group) => {
                const isOpen = openAccordions[group.group] !== false;

                return (
                  <div
                    key={group.group}
                    className="rounded-xl sm:rounded-2xl border border-[#1e2638] bg-[#0c0e14] overflow-hidden shadow-md"
                  >
                    {/* Accordion Header */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(group.group)}
                      className="w-full px-3.5 sm:px-5 py-3 sm:py-3.5 bg-[#141824] hover:bg-[#1b2132] flex items-center justify-between text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff4655]" />
                        <span className="font-extrabold text-xs sm:text-sm text-white tracking-wide">
                          {group.group}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline text-xs text-slate-400">
                          {group.description}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#ff4655]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#ff4655]" />
                        )}
                      </div>
                    </button>

                    {/* Accordion Body: Cards Grid */}
                    {isOpen && (
                      <div className="p-2.5 sm:p-5 bg-[#0c0e14]">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                          {group.items.map((item) => {
                            const isSelected = selectedPayment && selectedPayment.id === item.id;
                            const calculatedPrice = calculateMethodPrice(item);

                            return (
                              <div
                                key={item.id}
                                onClick={() => setSelectedPayment(item)}
                                className={`group relative p-2.5 sm:p-4 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 border text-left flex flex-col justify-between select-none active:scale-[0.98] ${
                                  isSelected
                                    ? 'bg-gradient-to-b from-[#241219] to-[#141824] border-[#ff4655] ring-2 ring-[#ff4655]/35 shadow-xl shadow-red-950/40 -translate-y-0.5'
                                    : 'bg-[#141824] hover:bg-[#191f30] border-[#1e2638] hover:border-[#ff4655]/50 hover:shadow-lg'
                                }`}
                              >
                                {/* Top: Image Logo & Checkmark */}
                                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                                  <div className="h-7 sm:h-8 px-2 sm:px-2.5 py-1 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="max-h-4 sm:max-h-5 max-w-[70px] sm:max-w-[85px] object-contain object-left"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                  </div>

                                  {/* Selected Checkmark Badge */}
                                  {isSelected && (
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-[#ff4655] to-[#ff7a00] text-white flex items-center justify-center shadow-md shadow-red-500/30 flex-shrink-0">
                                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                                    </div>
                                  )}
                                </div>

                                {/* Middle: Bold Price in Esports Amber */}
                                <div className="my-1">
                                  <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold block leading-none">
                                    Total Bayar
                                  </span>
                                  <span className="text-xs sm:text-base font-extrabold text-amber-400 tracking-tight mt-0.5 block">
                                    {formatIDR(calculatedPrice)}
                                  </span>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-[#1e2638] my-1.5 sm:my-2" />

                                {/* Bottom: Uppercase Name */}
                                <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
                                  <span className="font-bold text-slate-300 group-hover:text-white truncate">
                                    {item.name}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[8px] sm:text-[9px] px-1 py-0.2 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 font-bold ml-1 flex-shrink-0">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Bottom Logo Strip */}
                    <div className="bg-[#10131d] px-3 sm:px-4 py-2 sm:py-2.5 border-t border-[#1a2030] flex items-center justify-end gap-2 overflow-x-auto">
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium mr-1 hidden sm:inline">Dukungan:</span>
                      {group.items.map((item) => (
                        <div key={item.id} className="h-4.5 sm:h-5 px-1.5 py-0.5 bg-white/90 hover:bg-white rounded flex items-center justify-center transition-colors flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-2.5 sm:h-3 w-auto object-contain"
                          />
                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= STEP 4: CONTACT & CHECKOUT ================= */}
          <div className="bg-[#11141d] border border-[#1e2436] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3.5 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#ff4655] to-[#ff7a00] text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-md flex-shrink-0">
                4
              </div>
              <div>
                <h2 className="text-sm sm:text-lg font-bold text-white">
                  Beli & Selesaikan Pembayaran
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  Bukti transaksi dan kode/status pembelian akan dikirimkan secara instan.
                </p>
              </div>
            </div>

            {/* Contact Input */}
            <div className="space-y-3.5 sm:space-y-4 mb-4 sm:mb-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nomor WhatsApp atau Alamat Email (Opsional tapi disarankan)
                </label>
                <input
                  type="text"
                  placeholder="08123456789 atau email@domain.com"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#141824] text-white border border-[#1e2638] focus:outline-none focus:border-[#ff4655] text-xs sm:text-sm font-medium"
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
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#141824] text-white border border-[#1e2638] focus:outline-none focus:border-[#ff4655] text-xs sm:text-sm uppercase font-bold tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#ff4655] to-[#ff6b00] hover:brightness-110 text-white text-xs font-bold transition-colors cursor-pointer flex-shrink-0"
                  >
                    Terapkan
                  </button>
                </div>

                {appliedPromo && (
                  <div className="mt-2 p-2 sm:p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                      <span className="text-[11px] sm:text-xs">Kode "{appliedPromo.code}" Berhasil Diterapkan! {appliedPromo.description}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setAppliedPromo(null)}
                      className="text-xs text-rose-400 hover:underline ml-2 cursor-pointer flex-shrink-0"
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
                  className="w-4 h-4 rounded bg-[#141824] border-[#1e2638] text-[#ff4655] focus:ring-0"
                />
                <label htmlFor="remember" className="text-xs text-slate-300 cursor-pointer">
                  Ingat data ID saya untuk transaksi berikutnya di YUMATOPUP
                </label>
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#141824] border border-[#1e2638] space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 text-xs sm:text-sm">
              <div className="font-bold text-white text-xs sm:text-base border-b border-[#1c2232] pb-2 flex items-center justify-between">
                <span>Ringkasan Pesanan</span>
                <span className="text-[11px] sm:text-xs font-normal text-[#ff4655]">YUMATOPUP Checkout</span>
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
                <span className="font-mono text-[#ff4655]">{userId || '-'} {zoneId ? `(${zoneId})` : ''}</span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span>Metode Pembayaran</span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {selectedPayment?.image && (
                    <img
                      src={selectedPayment.image}
                      alt={selectedPayment.name}
                      className="h-3.5 sm:h-4 w-auto object-contain"
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

              <div className="pt-2 border-t border-[#1c2232] flex justify-between items-center text-xs sm:text-base font-black text-white">
                <span>Total Pembayaran:</span>
                <span className="text-base sm:text-xl text-amber-400 font-extrabold">
                  {formatIDR(currentTotalPrice)}
                </span>
              </div>
            </div>

            {/* Desktop Action CTA Button */}
            <button
              type="button"
              onClick={handleFormSubmit}
              className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black text-sm sm:text-lg text-white bg-gradient-to-r from-[#ff4655] via-[#ff5400] to-[#ff7a00] hover:brightness-110 shadow-xl shadow-orange-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
              <span>Beli Sekarang ({formatIDR(currentTotalPrice)})</span>
            </button>

            <div className="mt-2.5 sm:mt-3 text-center text-[10px] sm:text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Transaksi dienkripsi 256-bit SSL & Diproses Secara Realtime</span>
            </div>

          </div>

        </div>

      </div>

      {/* Sticky Mobile Buy Bar with Safe-Area Inset Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b0d13]/95 backdrop-blur-md border-t border-[#1e2638] pt-2.5 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex items-center justify-between shadow-2xl">
        <div className="text-left">
          <span className="text-[10px] text-slate-400 block uppercase font-semibold">Total Tagihan</span>
          <span className="text-base font-black text-amber-400">{formatIDR(currentTotalPrice)}</span>
        </div>
        <button
          onClick={handleFormSubmit}
          className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#ff4655] via-[#ff5400] to-[#ff6b00] hover:brightness-110 shadow-lg shadow-red-600/30 active:scale-95 cursor-pointer flex items-center gap-1.5"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Beli Sekarang</span>
        </button>
      </div>

    </div>
  );
}
