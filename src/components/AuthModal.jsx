import React, { useState } from 'react';
import { X, Mail, Lock, Check } from 'lucide-react';
import YumaShopLogo from './YumaShopLogo';

export default function AuthModal({ isOpen, onClose, onShowSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      if (onShowSuccess) {
        onShowSuccess(`Selamat datang di YUMATOPUP! Akun ${identifier} berhasil masuk.`);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#11141d] border border-[#1e2436] rounded-3xl shadow-2xl p-6 sm:p-8 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#181d2a] text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand */}
        <div className="mb-6">
          <YumaShopLogo />
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-[#161a25] p-1 border border-[#1e2436] mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              isLogin 
                ? 'bg-gradient-to-r from-[#ff4655] to-[#ff6b00] text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Masuk Akun
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              !isLogin 
                ? 'bg-gradient-to-r from-[#ff4655] to-[#ff6b00] text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Daftar Baru
          </button>
        </div>

        <h3 className="text-xl font-black text-white mb-1 tracking-tight">
          {isLogin ? 'Masuk ke YUMATOPUP' : 'Daftar Akun YUMATOPUP'}
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          {isLogin 
            ? 'Nikmati kemudahan riwayat transaksi dan poin cashback YumaRewards.' 
            : 'Daftar sekarang dan dapatkan voucher diskon 10% untuk transaksi pertama.'}
        </p>

        {submitted ? (
          <div className="py-8 text-center text-emerald-400 font-bold text-sm flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <span>Memproses Akun...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nomor WhatsApp atau Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="08123456789 atau user@email.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#141824] text-white border border-[#1e2638] focus:outline-none focus:border-[#ff4655] text-sm font-medium"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#141824] text-white border border-[#1e2638] focus:outline-none focus:border-[#ff4655] text-sm font-medium"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#ff4655] via-[#ff5400] to-[#ff7a00] hover:brightness-110 shadow-lg shadow-red-500/25 transition-all mt-2 cursor-pointer"
            >
              {isLogin ? 'Masuk Sekarang' : 'Daftar Sekarang'}
            </button>

            <div className="pt-2 text-center text-[11px] text-slate-400">
              Dengan melanjutkan, Anda menyetujui <a href="#" className="text-[#ff4655] underline">Syarat & Ketentuan</a> dan <a href="#" className="text-[#ff4655] underline">Kebijakan Privasi</a> YUMATOPUP.
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
