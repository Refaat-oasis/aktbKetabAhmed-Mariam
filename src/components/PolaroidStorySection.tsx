import React from 'react';
import { Upload, ChevronRight, ChevronLeft } from 'lucide-react';
import { InvitationConfig, PolaroidItem, ThemeConfig } from '../types';

interface PolaroidStorySectionProps {
  polaroids: PolaroidItem[];
  activePolaroidIndex: number;
  polaroidAnimating: boolean;
  onNextPolaroid: () => void;
  onPrevPolaroid: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  guestPreviewMode: boolean;
  theme: ThemeConfig;
  config: InvitationConfig;
}

export const PolaroidStorySection: React.FC<PolaroidStorySectionProps> = ({
  polaroids,
  activePolaroidIndex,
  polaroidAnimating,
  onNextPolaroid,
  onPrevPolaroid,
  onImageUpload,
  guestPreviewMode,
  theme,
  config
}) => {
  return (
    <section className={`py-16 px-4 ${theme.bgSecondary} transition-colors`}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Polaroid Photo Stack */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-ruqaa text-3xl sm:text-4xl mb-2">لقطات من حكايتنا</h2>
          <p className={`text-xs sm:text-sm ${theme.textSecondary} mb-8 max-w-md`}>
            لحظات غالية جمعت قلوبنا على خير ومودة
          </p>

          {/* Polaroid Stack Stage */}
          <div className="relative w-72 sm:w-80 h-96 flex items-center justify-center my-2">
            {polaroids.map((card, index) => {
              const offset = (index - activePolaroidIndex + polaroids.length) % polaroids.length;
              const isTop = offset === 0;
              return (
                <div
                  key={card.id}
                  onClick={isTop ? onNextPolaroid : undefined}
                  style={{
                    zIndex: polaroids.length - offset,
                    transform: isTop
                      ? polaroidAnimating
                        ? 'translateX(90px) rotate(12deg) scale(0.92)'
                        : 'translateY(0px) rotate(-1deg) scale(1)'
                      : `translateY(${offset * 10}px) rotate(${offset % 2 === 0 ? 4 : -4}deg) scale(${
                          1 - offset * 0.05
                        })`,
                    opacity: offset > 2 ? 0 : 1 - offset * 0.18
                  }}
                  className={`absolute inset-0 bg-[#FAF7F2] text-[#1C1917] p-3.5 pb-6 rounded-2xl shadow-2xl border border-stone-300 transition-all duration-300 flex flex-col justify-between ${
                    isTop ? 'cursor-pointer hover:-translate-y-1' : 'pointer-events-none'
                  }`}
                >
                  <div className="relative w-full h-64 rounded-xl overflow-hidden bg-stone-200 group">
                    <img
                      src={card.image}
                      alt={card.caption}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] backdrop-blur-sm">
                      {card.date}
                    </span>

                    {/* Upload custom photo onto this Polaroid */}
                    {!guestPreviewMode && isTop && (
                      <label
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bottom-2.5 left-2.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black text-white text-[11px] flex items-center gap-1 cursor-pointer shadow-md"
                      >
                        <Upload className="w-3 h-3 text-[#D4AF37]" />
                        <span>تغيير الصورة</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => onImageUpload(e, index)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  <div className="pt-3 text-center">
                    <p className="font-ruqaa text-lg sm:text-xl text-stone-800">{card.caption}</p>
                    <p className="text-[11px] text-stone-400 mt-1">
                      {index + 1} / {polaroids.length}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Polaroid Controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={onPrevPolaroid}
              className={`p-2.5 rounded-full border ${theme.border} ${theme.bgCard} hover:scale-105 transition`}
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold">
              {activePolaroidIndex + 1} / {polaroids.length}
            </span>
            <button
              onClick={onNextPolaroid}
              className={`p-2.5 rounded-full border ${theme.border} ${theme.bgCard} hover:scale-105 transition`}
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Timeline (حكايتنا) */}
        <div className="space-y-6">
          <div className="text-right">
            <h3 className="font-ruqaa text-3xl sm:text-4xl mt-1">حكايتنا خطوة بخطوة</h3>
          </div>

          <div className="relative pr-6 border-r-2 border-[#D4AF37]/50 space-y-6">
            {[
              {
                title: 'البداية وأول صدفة ✨',
                date: 'ربيع ٢٠٢٥',
                desc: 'حين جمع الله قلوبنا في أجمل صدفة، وبدأت رحلة المودة والتفاهم.'
              },
              {
                title: 'الوعد وقراءة الفاتحة 🤍',
                date: 'أغسطس ٢٠٢٦',
                desc: 'تلاقت العائلتان على خير وبركة، وقرأنا الفاتحة وسط دعوات الأحباب.'
              },
              {
                title: 'اختيار الدبل وتجهيزات الفرحة 💍',
                date: 'أكتوبر ٢٠٢٦',
                desc: 'أيام مليئة بالبهجة والترتيبات لنصنع ليلة تليق بوجودكم معنا.'
              },
              {
                title: 'ليلة الخطوبة المنتظرة 🎉',
                date: config.displayDateArabic,
                desc: `ننتظركم في ${config.venueName} لنحتفل معاً ببداية فصلنا الجديد.`
              }
            ].map((step, i) => (
              <div
                key={i}
                className={`relative p-4 rounded-2xl border ${theme.border} ${theme.bgCard} shadow-md transition hover:translate-x-[-4px]`}
              >
                <div className="absolute -right-[33px] top-5 w-4 h-4 rounded-full bg-[#D4AF37] ring-4 ring-[#D4AF37]/25" />
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-base">{step.title}</h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-semibold">
                    {step.date}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm ${theme.textSecondary} leading-relaxed`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolaroidStorySection;

