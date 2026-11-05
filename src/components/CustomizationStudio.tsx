import React from 'react';
import { Sparkles, Palette, Users, Copy, Check, Upload, Eye, X } from 'lucide-react';
import { InvitationConfig, RoseStyleId, ThemeId } from '../types';
import { THEMES, ROSE_STYLES } from '../constants';

interface CustomizationStudioProps {
  isOpen: boolean;
  onClose: () => void;
  config: InvitationConfig;
  onConfigChange: React.Dispatch<React.SetStateAction<InvitationConfig>>;
  vipInput: string;
  onVipInputChange: (value: string) => void;
  onCopyVipLink: () => void;
  copiedLink: boolean;
  onHeroImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterGuestPreview: () => void;
  onRoseBurstTrigger: () => void;
}

export const CustomizationStudio: React.FC<CustomizationStudioProps> = ({
  isOpen,
  onClose,
  config,
  onConfigChange,
  vipInput,
  onVipInputChange,
  onCopyVipLink,
  copiedLink,
  onHeroImageUpload,
  onEnterGuestPreview,
  onRoseBurstTrigger
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-start">
      <div className="w-full max-w-lg bg-[#121217] text-[#FAF5E8] h-full overflow-y-auto p-5 md:p-6 border-l border-[#D4AF37]/40 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-bold text-lg">لوحة تخصيص دعوة الخطوبة</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 mt-5 text-sm">
          {/* Theme Switcher */}
          <div>
            <label className="block font-bold text-[#D4AF37] mb-2 flex items-center gap-1.5">
              <Palette className="w-4 h-4" />
              <span>اختر ثيم وتصميم الموقع (٣ إطلالات):</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {Object.values(THEMES).map((t) => (
                <button
                  key={t.id}
                  onClick={() => onConfigChange((prev) => ({ ...prev, themeId: t.id as ThemeId }))}
                  className={`p-3 rounded-xl border text-right transition-all ${
                    config.themeId === t.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-2 ring-[#D4AF37]/40'
                      : 'border-white/15 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="font-bold text-xs text-white">{t.name}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">{t.subtitle}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Falling Roses Style Switcher */}
          <div>
            <label className="block font-bold text-[#D4AF37] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>لون الورد الطبيعي المتساقط في الخلفية:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {Object.values(ROSE_STYLES).map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    onConfigChange((prev) => ({ ...prev, roseStyleId: r.id as RoseStyleId }));
                    onRoseBurstTrigger();
                  }}
                  className={`p-3 rounded-xl border text-right transition-all flex items-center gap-2.5 ${
                    config.roseStyleId === r.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-2 ring-[#D4AF37]/40'
                      : 'border-white/15 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-white/40 shrink-0"
                    style={{ backgroundColor: r.swatch }}
                  />
                  <div>
                    <div className="font-bold text-xs text-white">{r.name}</div>
                    <div className="text-[10px] text-stone-400">{r.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Couple Names */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-stone-300 mb-1">اسم العريس</label>
              <input
                type="text"
                value={config.groomName}
                onChange={(e) => onConfigChange((prev) => ({ ...prev, groomName: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-300 mb-1">اسم العروسة</label>
              <input
                type="text"
                value={config.brideName}
                onChange={(e) => onConfigChange((prev) => ({ ...prev, brideName: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-stone-300 mb-1">تاريخ الحفل (للعد التنازلي)</label>
              <input
                type="date"
                value={config.eventDate}
                onChange={(e) => onConfigChange((prev) => ({ ...prev, eventDate: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-300 mb-1">التاريخ المكتوب بالعربية</label>
              <input
                type="text"
                value={config.displayDateArabic}
                onChange={(e) => onConfigChange((prev) => ({ ...prev, displayDateArabic: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          </div>

          {/* Venue Details */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-stone-300 mb-1">اسم القاعة أو المكان</label>
              <input
                type="text"
                value={config.venueName}
                onChange={(e) => onConfigChange((prev) => ({ ...prev, venueName: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-300 mb-1">العنوان التفصيلي</label>
              <input
                type="text"
                value={config.venueAddress}
                onChange={(e) => onConfigChange((prev) => ({ ...prev, venueAddress: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-300 mb-1">رابط Google Maps (يحدث الـ QR تلقائياً)</label>
              <input
                type="url"
                value={config.mapsUrl}
                onChange={(e) => onConfigChange((prev) => ({ ...prev, mapsUrl: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#D4AF37] focus:outline-none text-left"
                dir="ltr"
              />
            </div>
          </div>

          {/* Personalized VIP Guest Link Generator */}
          <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 space-y-3">
            <div className="font-bold text-[#F3E5AB] flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#D4AF37]" />
              <span>مولّد روابط الضيوف الخاصة (VIP Link):</span>
            </div>
            <p className="text-xs text-stone-300">
              اكتب اسم الضيف أو العائلة ليظهر اسمهم على الظرف الذهبي وفي مقدمة الدعوة عند إرسال الرابط عبر واتساب:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="مثال: عائلة المهندس طارق"
                value={vipInput}
                onChange={(e) => onVipInputChange(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-[#D4AF37]/40 text-white text-xs focus:outline-none"
              />
              <button
                onClick={onCopyVipLink}
                className="px-3.5 py-2 rounded-lg bg-[#D4AF37] text-black font-bold text-xs flex items-center gap-1.5 shrink-0"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'تم النسخ!' : 'نسخ الرابط'}</span>
              </button>
            </div>
          </div>

          {/* Upload Custom Hero Photo */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <label className="block font-bold text-xs text-[#D4AF37]">
              تغيير صورة الغلاف الرئيسية (Hero Photo):
            </label>
            <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border border-dashed border-[#D4AF37]/50 bg-black/30 hover:bg-black/50 cursor-pointer transition text-xs">
              <Upload className="w-4 h-4 text-[#D4AF37]" />
              <span>اختر صورة من جهازك أو هاتفك</span>
              <input
                type="file"
                accept="image/*"
                onChange={onHeroImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Guest Preview Mode Button */}
          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                onClose();
                onEnterGuestPreview();
              }}
              className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>معاينة كضيف (إخفاء زر الإعدادات)</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs"
            >
              حفظ وإغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationStudio;

