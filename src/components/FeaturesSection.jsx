import React from 'react';
import { Zap, ShieldCheck, CreditCard, Headphones, Gift, Award } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: "Bayar dalam Hitungan Detik",
    description: "Hanya butuh beberapa detik untuk menyelesaikan pembelian di YUMATOPUP tanpa perlu registrasi yang rumit.",
    color: "from-amber-400 to-orange-500",
    bgIcon: "bg-amber-500/10 text-amber-400 border-amber-500/20"
  },
  {
    icon: Award,
    title: "Pengiriman Instan 24/7",
    description: "Ketika Anda menyelesaikan pembayaran, item game langsung masuk ke akun Anda secara otomatis tanpa jeda.",
    color: "from-emerald-400 to-teal-500",
    bgIcon: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  },
  {
    icon: CreditCard,
    title: "Metode Pembayaran Terbaik",
    description: "Kami menawarkan metode pembayaran paling lengkap di Indonesia: QRIS, GoPay, OVO, DANA, ShopeePay, VA Bank, Indomaret & Alfamart.",
    color: "from-blue-400 to-indigo-500",
    bgIcon: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  },
  {
    icon: Headphones,
    title: "Layanan Pelanggan Cepat & Ramah",
    description: "Tim support kami siap membantu Anda 24 jam setiap hari melalui Live Chat & WhatsApp untuk menangani segala pertanyaan.",
    color: "from-[#ff4655] to-[#ff7a00]",
    bgIcon: "bg-red-500/10 text-[#ff4655] border-red-500/20"
  },
  {
    icon: Gift,
    title: "Promosi Menarik & Bonus",
    description: "Nikmati penawaran double diamonds, diskon voucher, cashback e-wallet, dan program loyalitas YumaPoints setiap saat.",
    color: "from-rose-400 to-red-500",
    bgIcon: "bg-rose-500/10 text-rose-400 border-rose-500/20"
  },
  {
    icon: ShieldCheck,
    title: "100% Legal & Terpercaya",
    description: "YUMATOPUP adalah distributor resmi yang bekerja sama langsung dengan publisher game terkemuka di dunia.",
    color: "from-cyan-400 to-blue-500",
    bgIcon: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
  }
];

export default function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
        <h2 className="text-lg sm:text-3xl font-black text-white tracking-tight">
          Website Top-Up Terbesar, Tercepat & Terpercaya di Indonesia
        </h2>
        <p className="text-[11px] sm:text-sm text-slate-400 mt-1.5 sm:mt-2">
          Jutaan gamers Indonesia mempercayakan kebutuhan voucher dan top-up game mereka kepada YUMATOPUP setiap hari.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        {FEATURES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#11141d] border border-[#1e2436] hover:border-[#ff4655]/60 transition-all duration-300 text-left hover:-translate-y-1 shadow-lg hover:shadow-red-950/20 group"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border flex items-center justify-center mb-3 sm:mb-4 ${item.bgIcon} group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>

              <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors mb-1.5 sm:mb-2">
                {item.title}
              </h3>

              <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
