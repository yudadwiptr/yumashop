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
    <footer className="bg-[#07080c] border-t border-[#181d2a] text-left pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#181d2a]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <YumaShopLogo />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              YUMATOPUP adalah platform top up game dan voucher digital termurah, tercepat, dan terpercaya di Indonesia. Dapatkan pengiriman item otomatis dalam hitungan detik dengan dukungan metode pembayaran terlengkap.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Mitra Resmi Publisher Game Indonesia</span>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Tentang YUMATOPUP</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Karir & Peluang</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Program Kemitraan (Affiliate)</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Berita & Pengumuman</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">YumaRewards Poin</a></li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Bantuan & Dukungan</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Hubungi Customer Service</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Panduan Pembayaran</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Cek Status Pesanan</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Laporkan Kendala</a></li>
            </ul>
          </div>

          {/* Nav Column 3 */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Legal & Keamanan</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Pemberitahuan Hak Cipta</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Waspada Penipuan</a></li>
              <li><a href="#" className="hover:text-[#ff4655] transition-colors">Kepatuhan Hukum (PSE)</a></li>
            </ul>
          </div>

        </div>

        {/* Supported Payment Logos using Dayjhostore assets */}
        <div className="py-8 border-b border-[#181d2a]">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Metode Pembayaran Resmi yang Didukung di Indonesia
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {DAYJHO_PAYMENT_LOGOS.map((pay) => (
              <div 
                key={pay.name} 
                className="h-12 bg-white rounded-xl p-2 flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                title={pay.name}
              >
                <img 
                  src={pay.image} 
                  alt={pay.name} 
                  className="max-h-7 max-w-[85px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; 2026 PT Yuma Digital Solusindo (YUMATOPUP Indonesia - yumatopup.com). Seluruh hak cipta dilindungi undang-undang.
          </p>
          <p className="text-[11px] max-w-xl text-center md:text-right">
            Seluruh nama dagang, logo game, dan karya seni yang ditampilkan adalah hak milik dari masing-masing penerbit (publisher) game.
          </p>
        </div>

      </div>
    </footer>
  );
}
