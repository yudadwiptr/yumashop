import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { NEWS_LIST } from '../data/mockData';

export default function NewsSection({ onOpenNews }) {
  const handleShowAll = () => {
    if (onOpenNews) {
      onOpenNews({
        type: 'info',
        title: 'Arsip Berita & Promo YUMATOPUP',
        message: 'Seluruh pembaruan event game, jadwal maintenance, turnamen, dan penawaran cashback terupdate secara realtime di saluran resmi YUMATOPUP.'
      });
    }
  };

  const handleReadArticle = (news) => {
    if (onOpenNews) {
      onOpenNews({
        type: 'info',
        title: news.title,
        message: `${news.excerpt}\n\nTanggal Rilis: ${news.date}. Kategori: ${news.tag}. Pastikan selalu memeriksa kanal resmi YUMATOPUP sebelum melakukan transaksi.`
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 border-t border-[#1c2232]">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight text-left">
            News and Updates
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 text-left">
            Berita terbaru, tips keamanan, dan promo game terhangat di YUMATOPUP
          </p>
        </div>
        <button 
          onClick={handleShowAll}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#ff4655] hover:text-white cursor-pointer"
        >
          <span>Lihat Semua Berita</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
        {NEWS_LIST.map((news) => (
          <div
            key={news.id}
            onClick={() => handleReadArticle(news)}
            className="group bg-[#11141d] border border-[#1e2436] hover:border-[#ff4655] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg text-left flex flex-col justify-between active:scale-[0.98]"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-[#090b10]">
              <img 
                src={news.image} 
                alt={news.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#ff4655] to-[#ff6b00] text-white">
                {news.tag}
              </div>
            </div>

            <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 font-medium">
                  <Calendar className="w-3 h-3 text-[#ff4655]" />
                  <span>{news.date}</span>
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#ff4655] transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-1 line-clamp-2">
                  {news.excerpt}
                </p>
              </div>

              <div className="mt-2.5 pt-2 sm:mt-3 sm:pt-2.5 border-t border-[#1c2232] flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#ff4655] group-hover:text-white transition-colors">
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 sm:hidden text-center">
        <button 
          onClick={handleShowAll}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff4655] hover:text-white cursor-pointer"
        >
          <span>Lihat Semua Berita</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
