import React from 'react';
import { Sparkles, Heart, Calendar } from 'lucide-react';
import { InvitationConfig } from '../types';

interface HeroSectionProps {
  config: InvitationConfig;
  guestName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, guestName }) => {
  return (
    <header className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
      {/* Background Photo with Slow Cinemagraph Zoom & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={config.heroImage}
          alt="Engagement Hero"
          className="w-full h-full object-cover object-center animate-cinemagraph filter brightness-50"
        />
        <div
          className={`absolute inset-0 ${
            config.themeId === 'royal'
              ? 'bg-gradient-to-b from-[#0B0B0E]/80 via-[#0B0B0E]/55 to-[#0B0B0E]'
              : config.themeId === 'boho'
              ? 'bg-gradient-to-b from-black/65 via-black/45 to-[#FAF6F0]'
              : 'bg-gradient-to-b from-black/75 via-black/50 to-[#FAFAFA]'
          }`}
        />
      </div>

      {/* Floating Golden Sparkle Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(14)].map((_, idx) => (
          <div
            key={idx}
            className="absolute rounded-full animate-float-slow"
            style={{
              width: `${(idx % 3) * 4 + 4}px`,
              height: `${(idx % 3) * 4 + 4}px`,
              background: '#F5DC8B',
              top: `${(idx * 17) % 85}%`,
              left: `${(idx * 29) % 90}%`,
              animationDelay: `${idx * 0.4}s`,
              boxShadow: '0 0 12px #D4AF37'
            }}
          />
        ))}
      </div>

      {/* Main Hero Content Card */}
      <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center">
        {/* Personalized Guest Greeting */}
        {guestName && (
          <div className="mb-5 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/55 backdrop-blur-md border border-[#D4AF37]/60 text-[#FAF5E8] shadow-xl">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs sm:text-sm">
              مرحباً بتشريفكم: <strong className="text-[#F5DC8B]">{guestName}</strong>
            </span>
          </div>
        )}

        {/* Quranic Verse Calligraphic Header */}
        <div className="mb-6 px-4 py-3 rounded-2xl bg-black/35 backdrop-blur-sm border border-white/15 max-w-xl">
          <p className="font-amiri text-base sm:text-xl md:text-2xl leading-relaxed text-[#FAF5E8] tracking-wide">
            ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾
          </p>
        </div>

        {/* Monogram Crest */}
        <div className="font-monogram text-2xl sm:text-3xl tracking-[0.25em] text-[#D4AF37] mb-1">
          A &amp; M
        </div>

        {/* Couple Names in Calligraphic Font */}
        <h1 className="font-ruqaa text-5xl sm:text-7xl md:text-8xl text-white drop-shadow-2xl my-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          <span>{config.groomName}</span>
          <span className="text-[#D4AF37] text-4xl sm:text-6xl font-amiri">&amp;</span>
          <span>{config.brideName}</span>
        </h1>

        {/* Ornate Divider */}
        <div className="flex items-center justify-center gap-3 my-5 w-64">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <Heart className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Warm Arabic Invitation Message */}
        <p className="text-sm sm:text-lg text-stone-100 max-w-lg leading-relaxed font-normal bg-black/30 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/10">
          {config.welcomeMessage}
        </p>

        {/* Quick Date & Scroll Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#scratch-date"
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C59B27] via-[#F5DC8B] to-[#B38728] text-black font-bold text-sm sm:text-base shadow-2xl hover:scale-105 transition flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>تفاصيل الموعد والمكان</span>
          </a>
          <a
            href="#rsvp-section"
            className="px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 font-semibold text-sm sm:text-base transition flex items-center gap-2"
          >
            <Heart className="w-4 h-4 text-[#D4AF37]" />
            <span>دفتر المباركات</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;

