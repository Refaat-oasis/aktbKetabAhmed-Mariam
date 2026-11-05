import React from 'react';
import { Send, CheckCircle2, Heart } from 'lucide-react';
import { ThemeConfig, WishFormData, WishItem } from '../types';

interface WishesRSVPSectionProps {
  theme: ThemeConfig;
  wishes: WishItem[];
  wishForm: WishFormData;
  onWishFormChange: React.Dispatch<React.SetStateAction<WishFormData>>;
  onSubmitWish: (e: React.FormEvent) => void;
  wishSubmittedBanner: boolean;
}

export const WishesRSVPSection: React.FC<WishesRSVPSectionProps> = ({
  theme,
  wishes,
  wishForm,
  onWishFormChange,
  onSubmitWish,
  wishSubmittedBanner
}) => {
  return (
    <section id="rsvp-section" className={`py-16 px-4 ${theme.bgSecondary}`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-ruqaa text-3xl sm:text-5xl mt-1">دفتر المباركات</h2>
          <p className={`text-sm ${theme.textSecondary} mt-2 max-w-lg mx-auto`}>
            كلماتكم ودعواتكم الصادقة تبقى ذكرى غالية في قلوبنا للأبد
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* RSVP & Blessing Form (5 cols) */}
          <form
            onSubmit={onSubmitWish}
            className={`lg:col-span-5 p-6 rounded-3xl border ${theme.borderStrong} ${theme.bgCard} shadow-xl space-y-4`}
          >
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Send className="w-4 h-4 text-[#D4AF37]" />
              <span>سجّل حضورك ومباركتك</span>
            </h3>

            {wishSubmittedBanner && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>شكراً من القلب! تمت إضافة مباركتك في دفتر العروسين ✨</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold mb-1.5">الاسم الكريم / اسم العائلة *</label>
              <input
                type="text"
                required
                placeholder="مثال: م. طارق عبد الرحمن والعائلة"
                value={wishForm.name}
                onChange={(e) => onWishFormChange((prev) => ({ ...prev, name: e.target.value }))}
                className={`w-full px-3.5 py-2.5 rounded-xl border ${theme.border} bg-transparent text-sm focus:border-[#D4AF37] focus:outline-none`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1.5">حالة الحضور</label>
                <select
                  value={wishForm.status}
                  onChange={(e) => onWishFormChange((prev) => ({ ...prev, status: e.target.value as 'attending' | 'wishes_only' }))}
                  className={`w-full px-3 py-2.5 rounded-xl border ${theme.border} ${theme.bgSecondary} text-xs sm:text-sm focus:border-[#D4AF37] focus:outline-none`}
                >
                  <option value="attending">سأحضر بإذن الله 🎉</option>
                  <option value="wishes_only">مبارك من القلب (معتذر)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">عدد الحضور</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={wishForm.guestsCount}
                  onChange={(e) => onWishFormChange((prev) => ({ ...prev, guestsCount: Number(e.target.value) || 1 }))}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${theme.border} bg-transparent text-sm focus:border-[#D4AF37] focus:outline-none`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">رسالة مباركة للعروسين *</label>
              <textarea
                rows={3}
                required
                placeholder="اكتب تهنئتك أو دعوة جميلة للعروسين..."
                value={wishForm.message}
                onChange={(e) => onWishFormChange((prev) => ({ ...prev, message: e.target.value }))}
                className={`w-full px-3.5 py-2.5 rounded-xl border ${theme.border} bg-transparent text-sm focus:border-[#D4AF37] focus:outline-none`}
              />
              {/* Quick Blessing Chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  'ألف مبروك وعقبال الفرحة الكبيرة! 💍✨',
                  'ربنا يتمم بخير ويسعد قلوبكم يارب 🤍',
                  'أحلى عرسان، جايين نفرح معاكم بإذن الله 🎉'
                ].map((chip, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => onWishFormChange((prev) => ({ ...prev, message: chip }))}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] hover:bg-[#D4AF37]/25 transition"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl ${theme.buttonBg} text-sm shadow-lg hover:scale-[1.01] transition flex items-center justify-center gap-2`}
            >
              <Heart className="w-4 h-4" />
              <span>إرسال المباركة وتأكيد الحضور</span>
            </button>
          </form>

          {/* Live Wishes Wall Showcase (7 cols) */}
          <div className="lg:col-span-7 space-y-4 max-h-[540px] overflow-y-auto pl-1">
            {wishes.map((w) => (
              <div
                key={w.id}
                className={`p-5 rounded-2xl border ${theme.border} ${theme.bgCard} shadow-md transition hover:border-[#D4AF37]/60`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-bold text-base flex items-center gap-2">
                      <span>{w.name}</span>
                      {w.status === 'attending' ? (
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold">
                          حاضر بإذن الله ({w.guestsCount})
                        </span>
                      ) : (
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-semibold">
                          تهنئة قلبية
                        </span>
                      )}
                    </h4>
                  </div>
                  <span className={`text-[11px] ${theme.textSecondary}`}>{w.time}</span>
                </div>
                <p className="text-sm leading-relaxed font-normal">{w.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishesRSVPSection;

