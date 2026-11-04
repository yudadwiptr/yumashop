import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ order, onClose }) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins
  const [isPaid, setIsPaid] = useState(false);
  const [receiptDownloaded, setReceiptDownloaded] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (isPaid) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaid]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const formatIDR = (num) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num);

  // Generate order reference
  const orderId = `YUMA-${Date.now().toString().slice(-8)}`;
  const virtualAccountNo = `8809${Math.floor(1000000000 + Math.random() * 9000000000)}`;

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    setIsPaid(true);
    // Trigger confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
  };

  const handleDownloadReceipt = () => {
    setReceiptDownloaded(true);
    setTimeout(() => {
      setReceiptDownloaded(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0e1118] border border-[#1e2538] rounded-3xl shadow-2xl p-6 sm:p-7 text-left my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#161a25] text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isPaid ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Menunggu Pembayaran
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              Selesaikan Pembayaran
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Selesaikan transaksi sebelum batas waktu berakhir untuk menghindari pembatalan otomatis.
            </p>

            {/* Countdown Banner */}
            <div className="my-4 p-3 rounded-2xl bg-[#161a25] border border-[#1e2436] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-rose-400" />
                <span>Batas Waktu Pembayaran:</span>
              </div>
              <span className="font-mono text-base font-black text-rose-400">
                {formattedTime}
              </span>
            </div>

            {/* Order Details Preview */}
            <div className="p-4 rounded-2xl bg-[#141824] border border-[#1e2436] space-y-2 text-xs mb-5">
              <div className="flex justify-between text-slate-400">
                <span>No. Transaksi</span>
                <span className="font-mono text-[#ff4655] font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Item</span>
                <span className="font-bold text-white">{order.game.name} - {order.denomination.name}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>User ID Target</span>
                <span className="font-mono text-amber-300">{order.userId} {order.zoneId ? `(${order.zoneId})` : ''}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Metode Pembayaran</span>
                <div className="flex items-center gap-2">
                  {order.paymentMethod?.image && (
                    <img 
                      src={order.paymentMethod.image} 
                      alt={order.paymentMethod.name}
                      className="h-5 w-auto max-w-[80px] object-contain"
                    />
                  )}
                  <span className="font-bold text-white">{order.paymentMethod.name}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-[#1c2232] flex justify-between items-center text-sm font-bold text-white">
                <span>Total Tagihan</span>
                <span className="text-base font-black text-amber-400">
                  {formatIDR(order.pricing.totalPrice)}
                </span>
              </div>
            </div>

            {/* Payment Instructions Based on Channel */}
            {order.paymentMethod.id === 'qris' ? (
              <div className="text-center p-5 rounded-2xl bg-[#161a25] border border-[#1e2436] mb-5">
                <div className="text-xs font-bold text-slate-200 mb-3">
                  Scan QRIS Menggunakan Aplikasi E-Wallet atau M-Banking:
                </div>
                
                {/* QRIS Code */}
                <div className="inline-block p-4 bg-white rounded-2xl shadow-xl">
                  {order.paymentMethod.image && (
                    <div className="mb-2 flex justify-center">
                      <img src={order.paymentMethod.image} alt="QRIS" className="h-6 w-auto object-contain" />
                    </div>
                  )}
                  <svg className="w-44 h-44 mx-auto" viewBox="0 0 200 200">
                    <rect width="200" height="200" fill="#ffffff" />
                    <rect x="20" y="20" width="45" height="45" fill="#000000" />
                    <rect x="25" y="25" width="35" height="35" fill="#ffffff" />
                    <rect x="30" y="30" width="25" height="25" fill="#000000" />
                    
                    <rect x="135" y="20" width="45" height="45" fill="#000000" />
                    <rect x="140" y="25" width="35" height="35" fill="#ffffff" />
                    <rect x="145" y="30" width="25" height="25" fill="#000000" />

                    <rect x="20" y="135" width="45" height="45" fill="#000000" />
                    <rect x="25" y="140" width="35" height="35" fill="#ffffff" />
                    <rect x="30" y="145" width="25" height="25" fill="#000000" />

                    <rect x="75" y="25" width="10" height="10" fill="#000000" />
                    <rect x="95" y="35" width="10" height="10" fill="#000000" />
                    <rect x="115" y="25" width="10" height="10" fill="#000000" />
                    <rect x="85" y="55" width="30" height="10" fill="#000000" />
                    <rect x="75" y="75" width="50" height="50" fill="#000000" rx="4" />
                    <rect x="85" y="85" width="30" height="30" fill="#ffffff" rx="2" />
                    <circle cx="100" cy="100" r="10" fill="#ff4655" />

                    <rect x="30" y="85" width="25" height="10" fill="#000000" />
                    <rect x="40" y="105" width="15" height="15" fill="#000000" />
                    <rect x="145" y="85" width="25" height="10" fill="#000000" />
                    <rect x="135" y="115" width="15" height="20" fill="#000000" />
                    <rect x="85" y="145" width="20" height="15" fill="#000000" />
                    <rect x="125" y="145" width="30" height="10" fill="#000000" />
                    <rect x="160" y="160" width="20" height="20" fill="#000000" />
                  </svg>
                  <div className="text-[11px] font-extrabold tracking-widest text-slate-800 uppercase mt-2">
                    NMID: ID1020088912301
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-300">
                  <span className="font-semibold">Mendukung:</span>
                  <span className="font-bold text-white">GoPay, OVO, DANA, BCA, Mandiri, ShopeePay</span>
                </div>
              </div>
            ) : (
              /* Virtual Account / Payment Code */
              <div className="p-4 rounded-2xl bg-[#161a25] border border-[#1e2436] mb-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-slate-400">
                    Nomor {order.paymentMethod.name}:
                  </div>
                  {order.paymentMethod?.image && (
                    <img 
                      src={order.paymentMethod.image} 
                      alt={order.paymentMethod.name}
                      className="h-5 w-auto object-contain"
                    />
                  )}
                </div>
                <div className="flex items-center justify-between bg-[#11141d] p-3 rounded-xl border border-[#1e2436]">
                  <span className="font-mono text-base sm:text-lg font-bold text-amber-300 tracking-wider">
                    {virtualAccountNo}
                  </span>
                  <button
                    onClick={() => handleCopy(virtualAccountNo)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#ff4655] to-[#ff6b00] text-white text-xs font-bold transition-all hover:brightness-110 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Masukkan nomor rekening virtual di atas pada menu transfer m-banking atau ATM Anda.
                </p>
              </div>
            )}

            {/* Test Simulation Button */}
            <button
              onClick={handleSimulatePayment}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:brightness-110 shadow-lg shadow-emerald-700/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Saya Sudah Membayar (Simulasikan Sukses)</span>
            </button>

          </div>
        ) : (
          /* Payment Success State */
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Transaksi Berhasil Diproses!</span>
            </div>

            <h3 className="text-2xl font-black text-white">
              Top Up Berhasil Dikirim!
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
              Item <span className="font-bold text-white">{order.denomination.name}</span> telah berhasil dimasukkan ke akun <span className="font-bold text-amber-300">{order.userId}</span>.
            </p>

            {/* Receipt Summary Card */}
            <div className="my-5 p-4 rounded-2xl bg-[#141824] border border-[#1e2436] text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Status Transaksi</span>
                <span className="font-bold text-emerald-400 uppercase">LUNAS / BERHASIL</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Nomor Referensi</span>
                <span className="font-mono text-[#ff4655] font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Tanggal & Waktu</span>
                <span>{new Date().toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Metode Pembayaran</span>
                <div className="flex items-center gap-2">
                  {order.paymentMethod?.image && (
                    <img 
                      src={order.paymentMethod.image} 
                      alt={order.paymentMethod.name}
                      className="h-4 w-auto object-contain"
                    />
                  )}
                  <span className="font-bold text-white">{order.paymentMethod.name}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-[#1c2232] flex justify-between items-center text-sm font-bold text-white">
                <span>Total Dibayar</span>
                <span className="text-amber-400 font-black">{formatIDR(order.pricing.totalPrice)}</span>
              </div>
            </div>

            {/* Download Receipt notification */}
            {receiptDownloaded && (
              <div className="mb-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Struk transaksi {orderId} telah berhasil disimpan!</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadReceipt}
                className="py-3 rounded-xl bg-[#161a25] hover:bg-[#1c2233] text-white text-xs font-bold border border-[#1e2436] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#ff4655]" />
                <span>{receiptDownloaded ? 'Tersimpan' : 'Unduh Struk'}</span>
              </button>

              <button
                onClick={onClose}
                className="py-3 rounded-xl bg-gradient-to-r from-[#ff4655] to-[#ff6b00] text-white text-xs font-bold shadow-lg transition-transform hover:scale-102 cursor-pointer"
              >
                Kembali ke Beranda
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
