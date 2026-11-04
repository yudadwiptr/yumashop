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
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      badgeText: 'Keamanan Akun',
      buttonBg: 'bg-gradient-to-r from-amber-500 to-[#ff5e3a]'
    },
    warning: {
      Icon: AlertTriangle,
      color: 'text-rose-400',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      badgeText: 'Perhatian',
      buttonBg: 'bg-gradient-to-r from-rose-500 to-[#6b3bfc]'
    },
    success: {
      Icon: CheckCircle2,
      color: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      badgeText: 'Berhasil',
      buttonBg: 'bg-gradient-to-r from-emerald-500 to-teal-600'
    },
    info: {
      Icon: Info,
      color: 'text-purple-400',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      badgeText: 'Informasi YUMATOPUP',
      buttonBg: 'bg-gradient-to-r from-[#6b3bfc] to-[#ff5e3a]'
    }
  };

  const style = iconMap[type] || iconMap.info;
  const ModalIcon = style.Icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-md bg-[#181133] border border-[#3e3066] rounded-3xl shadow-2xl p-6 sm:p-7 text-left overflow-hidden">

        {/* Top ambient glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6b3bfc] via-[#ff5e3a] to-[#ffaa00]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#231a44] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-2xl bg-[#231a44] border border-[#3b2d66] flex items-center justify-center ${style.color} shadow-inner`}>
            <ModalIcon className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wider mb-1 ${style.badgeBg}`}>
              <span>{style.badgeText}</span>
            </div>
            <h3 className="text-lg font-black text-white leading-tight">
              {title}
            </h3>
          </div>
        </div>

        {/* Message body */}
        {message && (
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            {message}
          </p>
        )}

        {/* Checklist / Items if provided */}
        {items && items.length > 0 && (
          <div className="space-y-2 mb-5">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-[#221743] border border-[#382b60] flex items-start gap-2.5 text-xs text-slate-200"
              >
                <div className="w-5 h-5 rounded-full bg-[#6b3bfc]/20 text-[#a78bfa] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
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
          className={`w-full py-3 rounded-xl font-bold text-sm text-white ${style.buttonBg} hover:brightness-110 shadow-lg shadow-purple-950/40 transition-all transform active:scale-98`}
        >
          {actionText}
        </button>

      </div>
    </div>
  );
}

