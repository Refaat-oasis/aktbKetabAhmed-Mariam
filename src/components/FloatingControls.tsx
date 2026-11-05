import React from 'react';
import { Volume2, VolumeX, MailOpen, Settings, Eye } from 'lucide-react';
import { InvitationConfig, ThemeConfig } from '../types';
import { ROSE_STYLES } from '../constants';

interface FloatingControlsProps {
  theme: ThemeConfig;
  config: InvitationConfig;
  isPlayingAudio: boolean;
  guestPreviewMode: boolean;
  onToggleAudio: () => void;
  onCycleRoseStyle: () => void;
  onReopenEnvelope: () => void;
  onOpenStudio: () => void;
  onExitGuestPreview: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  theme,
  config,
  isPlayingAudio,
  guestPreviewMode,
  onToggleAudio,
  onCycleRoseStyle,
  onReopenEnvelope,
  onOpenStudio,
  onExitGuestPreview
}) => {
  return (
    <>
      {/* Spinning Vinyl Audio Toggle & Rose Petal Selector (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2.5">
        <button
          onClick={onToggleAudio}
          title={isPlayingAudio ? 'كتم الموسيقى' : 'تشغيل الموسيقى الاحتفالية'}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border-2 ${theme.borderStrong} ${theme.bgSecondary} transition-transform hover:scale-105`}
        >
          <div
            className={`w-9 h-9 rounded-full bg-gradient-to-tr from-stone-900 via-stone-700 to-stone-900 border border-[#D4AF37]/60 flex items-center justify-center ${
              isPlayingAudio ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '5s' }}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] flex items-center justify-center">
              {isPlayingAudio ? (
                <Volume2 className="w-2.5 h-2.5 text-black" />
              ) : (
                <VolumeX className="w-2.5 h-2.5 text-black" />
              )}
            </div>
          </div>
        </button>

        {/* Rose Petal Style Switcher Button */}
        <button
          onClick={onCycleRoseStyle}
          title="تغيير لون الورد المتساقط"
          className={`px-3.5 h-11 rounded-full flex items-center gap-2 shadow-2xl border ${theme.borderStrong} ${theme.bgCard} backdrop-blur-md text-xs font-bold transition-transform hover:scale-105`}
        >
          <span
            className="w-3.5 h-3.5 rounded-full border border-white/50 shadow-sm shrink-0"
            style={{ backgroundColor: ROSE_STYLES[config.roseStyleId]?.swatch || '#B81428' }}
          />
          <span className="hidden sm:inline">
            {ROSE_STYLES[config.roseStyleId]?.name || 'ورد جوري أحمر'}
          </span>
        </button>
      </div>

      {/* Floating Host Customization Studio Trigger (Bottom Right) */}
      {!guestPreviewMode ? (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={onReopenEnvelope}
              className={`px-3.5 py-2.5 rounded-full shadow-xl border ${theme.border} ${theme.bgCard} backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 hover:scale-105 transition`}
              title="إعادة عرض الظرف"
            >
              <MailOpen className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline">إعادة فتح الظرف</span>
            </button>

            <button
              onClick={onOpenStudio}
              className="px-4 py-3 rounded-full shadow-2xl bg-gradient-to-r from-[#C59B27] via-[#F0D57B] to-[#B38728] text-[#111] font-bold text-xs md:text-sm flex items-center gap-2 hover:scale-105 transition"
            >
              <Settings className="w-4 h-4 animate-spin" style={{ animationDuration: '9s' }} />
              <span>تخصيص الدعوة (للعروسين)</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={onExitGuestPreview}
          className="fixed bottom-5 right-5 z-40 px-3 py-1.5 rounded-full bg-black/70 text-white/80 text-xs border border-white/20 backdrop-blur-sm hover:text-white flex items-center gap-1"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>إنهاء وضع معاينة الضيف</span>
        </button>
      )}
    </>
  );
};

export default FloatingControls;

