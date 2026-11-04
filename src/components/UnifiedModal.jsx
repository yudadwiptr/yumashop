import React from 'react';
import { X, ShieldCheck, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export default function UnifiedModal({ isOpen, onClose, config }) {
  if (!isOpen || !config) return null;

  const {
    type = 'info', // 'security' | 'warning' | 'success' | 'info'
    title = '',
    message = '',
    items = [],
    actionText = 'Mengerti',
    onAction
  } = config;

  const iconMap = {
    security: {
      Icon: ShieldCheck,
      color: 'text-amber-400',
      badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      badgeText: 'KEAMANAN AKUN',
      buttonBg: 'bg-gradient-to-r from-[#ff4655] via-[#ff5400] to-[#ff7a00]'
    },
    warning: {
      Icon: AlertTriangle,
      color: 'text-rose-400',
      badgeBg: 'bg-red-500/15 text-rose-300 border-red-500/30',
      badgeText: 'PERHATIAN',
      buttonBg: 'bg-gradient-to-r from-[#ff4655] to-[#e11d48]'
    },
    success: {
      Icon: CheckCircle2,
      color: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      badgeText: 'BERHASIL',
      buttonBg: 'bg-gradient-to-r from-emerald-500 to-teal-600'
    },
    info: {
      Icon: Info,
      color: 'text-[#ff4655]',
      badgeBg: 'bg-red-500/15 text-[#ff4655] border-red-500/30',
      badgeText: 'INFORMASI YUMATOPUP',
      buttonBg: 'bg-gradient-to-r from-[#ff4655] via-[#ff5400] to-[#ff7a00]'
    }
  };

  const style = iconMap[type] || iconMap.info;
  const ModalIcon = style.Icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-md bg-[#0e1118] border border-[#1e2538] rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-7 text-left overflow-hidden max-h-[90vh] flex flex-col">

        {/* Top ambient esports glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff4655] via-[#ff5400] to-[#ffaa00]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-[#161a25] hover:bg-[#ff4655] text-slate-400 hover:text-white border border-[#202738] transition-colors cursor-pointer z-10"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto pr-1">
          {/* Header Icon & Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#161a25] border border-[#22293d] flex items-center justify-center ${style.color} shadow-inner flex-shrink-0`}>
              <ModalIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full border text-[9px] sm:text-[10px] font-black uppercase tracking-wider mb-1 ${style.badgeBg}`}>
                <span>{style.badgeText}</span>
              </div>
              <h3 className="text-base sm:text-xl font-black text-white leading-tight tracking-tight">
                {title}
              </h3>
            </div>
          </div>

          {/* Message body */}
          {message && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3 sm:mb-4">
              {message}
            </p>
          )}

          {/* Checklist / Items if provided */}
          {items && items.length > 0 && (
            <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#141824] border border-[#1e2638] flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13px] text-slate-200"
                >
                  <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-red-500/20 text-[#ff4655] border border-red-500/30 flex items-center justify-center font-black text-[10px] sm:text-[11px] flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1 leading-snug">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Button */}
          <button
            type="button"
            onClick={() => {
              if (onAction) onAction();
              onClose();
            }}
            className={`w-full py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white ${style.buttonBg} hover:brightness-110 shadow-lg shadow-red-500/25 transition-all transform active:scale-98 cursor-pointer mt-1`}
          >
            {actionText}
          </button>
        </div>

      </div>
    </div>
  );
}
