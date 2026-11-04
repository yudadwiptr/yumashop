import React from 'react';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { NEWS_LIST } from '../data/mockData';

export default function NewsSection({ onOpenNews }) {
  const handleShowAll = () => {
    if (onOpenNews) {
      onOpenNews({
        type: 'info',
        title: 'Arsip Berita & Promo YUMASHOP',
        message: 'Seluruh pembaruan event game, jadwal maintenance, turnamen, dan penawaran cashback terupdate secara realtime di saluran resmi YUMASHOP.'
      });
    }
  };

  const handleReadArticle = (news) => {
    if (onOpenNews) {
      onOpenNews({
        type: 'info',
        title: news.title,
        message: `${news.excerpt}\n\nTanggal Rilis: ${news.date}. Kategori: ${news.tag}. Pastikan selalu memeriksa kanal resmi YUMASHOP sebelum melakukan transaksi.`
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-[#29204a]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            News and Updates
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Berita terbaru, tips keamanan, dan promo game terhangat di YUMASHOP
          </p>
        </div>
        <button 
          onClick={handleShowAll}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 hover:text-white cursor-pointer"
        >
          <span>Lihat Semua Berita</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {NEWS_LIST.map((news) => (
          <div
            key={news.id}
            onClick={() => handleReadArticle(news)}
            className="group bg-[#1c1537] border border-[#352a5c] hover:border-[#6242fc] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg text-left flex flex-col justify-between"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-[#120d24]">
              <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#6242fc] text-white">
                {news.tag}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1.5 font-medium">
                  <Calendar className="w-3 h-3 text-purple-400" />
                  <span>{news.date}</span>
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 line-clamp-2">
                  {news.excerpt}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#2e2350] flex items-center gap-1 text-xs font-semibold text-purple-300 group-hover:text-amber-300">
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
