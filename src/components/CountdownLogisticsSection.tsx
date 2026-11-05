import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink, Download, Sparkles } from 'lucide-react';
import { InvitationConfig, ThemeConfig, TimeLeft } from '../types';
import CustomQRCodeSVG from './CustomQRCodeSVG';

interface CountdownLogisticsSectionProps {
  timeLeft: TimeLeft;
  config: InvitationConfig;
  theme: ThemeConfig;
  onDownloadICS: () => void;
}

export const CountdownLogisticsSection: React.FC<CountdownLogisticsSectionProps> = ({
  timeLeft,
  config,
  theme,
  onDownloadICS
}) => {
  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-ruqaa text-3xl sm:text-5xl mt-1">باقي على فرحتنا</h2>
      </div>

      {/* Countdown Clock Boxes */}
      <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto mb-14">
        {[
          { label: 'يوم', value: timeLeft.days },
          { label: 'ساعة', value: timeLeft.hours },
          { label: 'دقيقة', value: timeLeft.minutes },
          { label: 'ثانية', value: timeLeft.seconds }
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-4 sm:p-6 rounded-2xl border ${theme.borderStrong} ${theme.bgCard} text-center shadow-xl flex flex-col items-center justify-center`}
          >
            <span className="font-amiri text-3xl sm:text-5xl font-bold text-[#D4AF37]">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className={`text-xs sm:text-sm ${theme.textSecondary} mt-1 font-semibold`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Logistics & Dress Code Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Venue & QR Location Card */}
        <div className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.bgCard} shadow-xl flex flex-col justify-between`}>
          <div>
            <h3 className="font-bold text-xl sm:text-2xl mb-2">{config.venueName}</h3>
            <p className={`text-sm ${theme.textSecondary} mb-4`}>{config.venueAddress}</p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold mb-6">
              <span className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {config.displayDateArabic}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {config.displayTimeArabic}
              </span>
            </div>

            {/* Dynamic SVG QR Code for Location */}
            <div className="my-4 text-center">
              <CustomQRCodeSVG value={config.mapsUrl} />
              <p className={`text-[11px] ${theme.textSecondary} mt-2`}>
                امسح الرمز بكاميرا الهاتف لفتح موقع القاعة مباشرة
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <a
              href={config.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`py-3 px-4 rounded-xl ${theme.buttonBg} text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition`}
            >
              <MapPin className="w-4 h-4" />
              <span>الموقع على الخريطة</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onDownloadICS}
              className={`py-3 px-4 rounded-xl border ${theme.borderStrong} font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#D4AF37]/10 transition`}
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              <span>حفظ الموعد في التقويم</span>
            </button>
          </div>
        </div>

        {/* Dress Code Palette & Party Notes Card */}
        <div className={`p-6 sm:p-8 rounded-3xl border ${theme.border} ${theme.bgCard} shadow-xl flex flex-col justify-between`}>
          <div>
            <h3 className="font-bold text-xl sm:text-2xl mb-2">ألوان مقترحة لإطلالتكم</h3>
            <p className={`text-sm ${theme.textSecondary} mb-6`}>
              وجودكم هو الأجمل دائماً! وإذا أحببتم تنسيق إطلالتكم مع ديكور وثيم الحفل، فهذه الألوان ستكون متناغمة جداً مع أجواء القاعة:
            </p>

            {/* 4 Swatches */}
            <div className="grid grid-cols-2 gap-3.5 mb-6">
              {theme.swatchColors.map((swatch, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border ${theme.border} flex items-center gap-3`}
                >
                  <div
                    className="w-10 h-10 rounded-full shrink-0 border-2 border-white/40 shadow-md"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <div className="text-right">
                    <div className="font-bold text-xs sm:text-sm">{swatch.name}</div>
                    <div className={`text-[11px] ${theme.textSecondary}`}>{swatch.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Polite Bride Dress Color Note */}
          <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs sm:text-sm font-medium flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <span>{theme.brideDressNote}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownLogisticsSection;

