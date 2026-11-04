import React from 'react';
import { ShieldCheck } from 'lucide-react';
import YumaShopLogo from './YumaShopLogo';

const DAYJHO_PAYMENT_LOGOS = [
  { name: 'QRIS', image: '/assets/payments/qris.png' },
  { name: 'DANA', image: '/assets/payments/dana.png' },
  { name: 'ShopeePay', image: '/assets/payments/shopeepay.png' },
  { name: 'OVO', image: '/assets/payments/ovo.png' },
  { name: 'LinkAja', image: '/assets/payments/linkaja.png' },
  { name: 'BCA', image: '/assets/payments/bca.png' },
  { name: 'Mandiri', image: '/assets/payments/mandiri.png' },
  { name: 'BRI', image: '/assets/payments/briva.png' },
  { name: 'BNI', image: '/assets/payments/bni.png' },
  { name: 'Permata', image: '/assets/payments/permata.png' },
  { name: 'CIMB', image: '/assets/payments/cimb.webp' },
  { name: 'Danamon', image: '/assets/payments/danamon.webp' },
  { name: 'BNC', image: '/assets/payments/bnc.png' },
  { name: 'BSI', image: '/assets/payments/bsi.webp' },
  { name: 'Indomaret', image: '/assets/payments/indomaret.webp' },
  { name: 'Alfamart', image: '/assets/payments/alfamart.webp' }
];

export default function Footer() {
  return (
    <footer className="bg-[#07080c] border-t border-[#181d2a] text-left pt-10 sm:pt-12 pb-14 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-[#181d2a]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <YumaShopLogo />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              YUMATOPUP adalah platform top up game dan voucher digital termurah, tercepat, dan terpercaya di Indonesia. Dapatkan pengiriman item otomatis dalam hitungan detik dengan dukungan metode pembayaran terlengkap.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Mitra Resmi Publisher Game Indonesia</span>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white mb-2.5 sm:mb-3">Tentang YUMATOPUP</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Karir & Peluang</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Program Kemitraan (Affiliate)</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Berita & Pengumuman</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">YumaRewards Poin</a></li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white mb-2.5 sm:mb-3">Bantuan & Dukungan</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Hubungi Customer Service</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Panduan Pembayaran</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Cek Status Pesanan</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Laporkan Kendala</a></li>
            </ul>
          </div>

          {/* Nav Column 3 */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white mb-2.5 sm:mb-3">Legal & Keamanan</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Pemberitahuan Hak Cipta</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Waspada Penipuan</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Kepatuhan Hukum (PSE)</a></li>
            </ul>
          </div>

        </div>

        {/* Supported Payment Logos */}
        <div className="py-6 sm:py-8 border-b border-[#181d2a]">
          <div className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 sm:mb-4">
            Metode Pembayaran Resmi yang Didukung di Indonesia
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
            {DAYJHO_PAYMENT_LOGOS.map((pay) => (
              <div 
                key={pay.name} 
                className="h-10 sm:h-12 bg-white rounded-lg sm:rounded-xl p-1.5 sm:p-2 flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                title={pay.name}
              >
                <img 
                  src={pay.image} 
                  alt={pay.name} 
                  className="max-h-5 sm:max-h-7 max-w-[70px] sm:max-w-[85px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left">
            &copy; 2026 PT Yuma Digital Solusindo (YUMATOPUP Indonesia - yumatopup.com). Seluruh hak cipta dilindungi undang-undang.
          </p>
          <p className="text-[10px] sm:text-[11px] max-w-xl text-center md:text-right text-slate-500">
            Seluruh nama dagang, logo game, dan karya seni yang ditampilkan adalah hak milik dari masing-masing penerbit (publisher) game.
          </p>
        </div>

        {/* Built by YUMA STUDIO Attribution */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#141824] flex items-center justify-center">
          <a
            href="https://yumastudio.digital/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#0d1017] hover:bg-[#131722] border border-[#1a2030] hover:border-[#ff4655]/40 transition-all text-xs text-slate-400 hover:text-white shadow-sm"
            title="Kunjungi Yuma Studio Digital"
          >
            <span className="text-slate-400 font-medium">Build by</span>
            <img 
              src="/yuma-logo-white.svg" 
              alt="Yuma Studio Logo" 
              className="h-4 sm:h-4.5 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity" 
            />
            <span className="font-extrabold tracking-wider text-white group-hover:text-[#ff4655] transition-colors">
              YUMA STUDIO
            </span>
          </a>
        </div>

      </div>
    </footer>
  );
}
