import React from 'react';
import { EnvelopeStage, InvitationConfig } from '../types';

interface EnvelopeOverlayProps {
  config: InvitationConfig;
  guestName: string;
  envelopeStage: EnvelopeStage;
  onOpen: () => void;
}

export const EnvelopeOverlay: React.FC<EnvelopeOverlayProps> = ({
  config,
  guestName,
  envelopeStage,
  onOpen
}) => {
  if (envelopeStage === 'opened') return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-[#07070A] overflow-hidden transition-opacity duration-700 ${
        envelopeStage === 'expand' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient Romantic Rose-Garden Bokeh Backdrop Behind Envelope */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45 animate-cinemagraph"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 35%, rgba(184, 20, 40, 0.28) 0%, rgba(212, 175, 55, 0.14) 38%, rgba(7, 7, 10, 0.96) 75%)'
        }}
      />

      {/* Ambient Floating Gold Dust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-slow"
            style={{
              width: `${(i % 3) * 3 + 3}px`,
              height: `${(i % 3) * 3 + 3}px`,
              background: '#D4AF37',
              top: `${(i * 19) % 90}%`,
              left: `${(i * 23) % 92}%`,
              animationDelay: `${(i % 5) * 0.7}s`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      {/* Personalized VIP Guest Greeting above Envelope */}
      {guestName && (
        <div
          className={`mb-10 z-20 text-center transition-all duration-700 ${
            envelopeStage === 'closed'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-6 pointer-events-none'
          }`}
        >
          <p className="font-amiri text-lg md:text-xl text-[#F5E6C4] tracking-wide">
            دعوة خاصة لتشريف <span className="text-[#D4AF37] font-bold">{guestName}</span>
          </p>
        </div>
      )}

      {/* 3D Perspective Stage */}
      <div
        className="relative w-full max-w-[460px] aspect-[1.45/1] flex items-center justify-center select-none"
        style={{ perspective: '1600px' }}
      >
        {/* Envelope Body Wrapper */}
        <div
          className={`relative w-full h-full transition-all duration-1000 ease-in-out ${
            envelopeStage === 'closed'
              ? 'translate-y-0 scale-100'
              : envelopeStage === 'flap'
              ? 'translate-y-4 scale-100'
              : envelopeStage === 'extract'
              ? 'translate-y-24 sm:translate-y-28 scale-[0.96]'
              : 'translate-y-32 scale-90'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* LAYER 1: Envelope Back Plate & Damask Gold Interior Lining */}
          <div
            className={`absolute inset-0 rounded-[14px] paper-texture transition-opacity duration-700 ${
              envelopeStage === 'present' || envelopeStage === 'expand' ? 'opacity-30' : 'opacity-100'
            }`}
            style={{
              zIndex: 5,
              background: 'linear-gradient(165deg, #181620 0%, #0E0C12 100%)',
              boxShadow:
                '0 35px 70px -15px rgba(0, 0, 0, 0.95), 0 0 1px 1px rgba(212, 175, 55, 0.35), inset 0 0 40px rgba(0,0,0,0.8)'
            }}
          >
            {/* Gold Foil Inner Trim on the Back Lining */}
            <div className="absolute inset-3 rounded-[10px] border border-[#D4AF37]/25 pointer-events-none" />
            <div
              className="absolute inset-0 opacity-20 pointer-events-none rounded-[14px]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(212,175,55,0.12) 0px, rgba(212,175,55,0.12) 1px, transparent 1px, transparent 14px)'
              }}
            />
          </div>

          {/* LAYER 2: The Physical "A & M" Invitation Card Inside the Pocket */}
          <div
            className={`absolute left-[6%] right-[6%] top-[6%] bottom-[6%] ivory-cardstock rounded-[10px] shadow-2xl flex flex-col items-center justify-between p-5 sm:p-7 text-center transition-all ease-in-out ${
              envelopeStage === 'closed'
                ? 'translate-y-2 scale-[0.94] opacity-95 duration-500'
                : envelopeStage === 'flap'
                ? 'translate-y-0 scale-[0.96] opacity-100 duration-700'
                : envelopeStage === 'extract'
                ? '-translate-y-[74%] scale-[0.98] opacity-100 duration-1000'
                : envelopeStage === 'present'
                ? '-translate-y-[26%] scale-[1.08] sm:scale-[1.14] opacity-100 duration-1000'
                : '-translate-y-[26%] scale-[1.35] opacity-0 duration-700'
            }`}
            style={{
              zIndex: envelopeStage === 'present' || envelopeStage === 'expand' ? 35 : 15,
              boxShadow:
                envelopeStage === 'present' || envelopeStage === 'expand'
                  ? '0 40px 90px rgba(0,0,0,0.9), 0 0 35px rgba(212,175,55,0.35)'
                  : '0 -8px 25px rgba(0,0,0,0.55)'
            }}
          >
            {/* Double Gold-Foil Card Border */}
            <div className="absolute inset-2.5 border border-[#C59B27]/70 rounded-[6px] pointer-events-none" />
            <div className="absolute inset-3.5 border border-[#C59B27]/35 rounded-[4px] pointer-events-none" />

            {/* Corner Gold Flourishes */}
            <div className="w-full flex items-center justify-center pt-1">
              <p className="font-amiri text-[11px] sm:text-xs text-[#8A6922] tracking-wider">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>

            {/* Center Prominent "A & M" Monogram */}
            <div className="my-auto flex flex-col items-center justify-center">
              <div
                className="font-monogram text-4xl sm:text-6xl font-bold tracking-widest leading-none select-none"
                style={{
                  background: 'linear-gradient(135deg, #8A6214 0%, #D4AF37 48%, #AA771C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 2px 4px rgba(138, 98, 20, 0.2))'
                }}
              >
                A <span className="text-2xl sm:text-4xl italic font-normal">&amp;</span> M
              </div>

              {/* Ornamental Gold Divider */}
              <div className="flex items-center gap-2 my-2 sm:my-2.5 w-28 sm:w-36">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C59B27]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#C59B27]" />
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C59B27]" />
              </div>

              {/* Couple Arabic Names */}
              <h2 className="font-ruqaa text-xl sm:text-2xl text-[#1F1A14]">
                {config.groomName} <span className="text-[#B88924] font-amiri">&amp;</span> {config.brideName}
              </h2>
            </div>

            {/* Date Footer on Card */}
            <div className="w-full pb-0.5">
              <p className="font-amiri text-xs sm:text-sm text-[#6E5219] font-semibold">
                {config.displayDateArabic}
              </p>
            </div>
          </div>

          {/* LAYER 3: Front Pocket Flaps */}
          <div
            className={`absolute inset-0 rounded-[14px] overflow-hidden pointer-events-none transition-opacity duration-700 ${
              envelopeStage === 'present' || envelopeStage === 'expand' ? 'opacity-30' : 'opacity-100'
            }`}
            style={{ zIndex: 20 }}
          >
            {/* Left Triangular Pocket Flap */}
            <div
              className="absolute inset-0 paper-texture"
              style={{
                clipPath: 'polygon(0 0, 52% 50%, 0 100%)',
                background: 'linear-gradient(115deg, #23202E 0%, #17151F 100%)'
              }}
            />

            {/* Right Triangular Pocket Flap */}
            <div
              className="absolute inset-0 paper-texture"
              style={{
                clipPath: 'polygon(100% 0, 48% 50%, 100% 100%)',
                background: 'linear-gradient(-115deg, #211E2B 0%, #15131D 100%)'
              }}
            />

            {/* Crease Shadows & Gold Foil Edges */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 460 317"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="flapShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="-3" stdDeviation="6" floodColor="#000000" floodOpacity="0.75" />
                </filter>
                <linearGradient id="bottomFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#262332" />
                  <stop offset="100%" stopColor="#14121B" />
                </linearGradient>
                <linearGradient id="goldTrimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9A721C" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#F5DC8B" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#9A721C" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Side Flap Diagonal Crease Lines */}
              <line x1="0" y1="0" x2="230" y2="158" stroke="rgba(0,0,0,0.65)" strokeWidth="3" />
              <line x1="460" y1="0" x2="230" y2="158" stroke="rgba(0,0,0,0.65)" strokeWidth="3" />
              <line x1="0" y1="0" x2="230" y2="158" stroke="url(#goldTrimGrad)" strokeWidth="1" />
              <line x1="460" y1="0" x2="230" y2="158" stroke="url(#goldTrimGrad)" strokeWidth="1" />

              {/* Bottom Fold */}
              <polygon
                points="0,317 212,148 248,148 460,317"
                fill="url(#bottomFlapGrad)"
                filter="url(#flapShadow)"
              />
              <polyline
                points="0,317 212,148 248,148 460,317"
                fill="none"
                stroke="url(#goldTrimGrad)"
                strokeWidth="1.5"
              />
            </svg>

            {/* Subtle Outer Gold Rim on Pocket */}
            <div className="absolute inset-0 rounded-[14px] border border-[#D4AF37]/30 pointer-events-none" />
          </div>

          {/* LAYER 4: Top Triangular Flap */}
          <div
            onClick={onOpen}
            className={`absolute top-0 left-0 right-0 h-[54%] origin-top transition-transform duration-700 ease-in-out ${
              envelopeStage === 'closed'
                ? 'cursor-pointer [transform:rotateX(0deg)]'
                : '[transform:rotateX(180deg)] pointer-events-none'
            } ${envelopeStage === 'present' || envelopeStage === 'expand' ? 'opacity-25' : 'opacity-100'}`}
            style={{
              zIndex: envelopeStage === 'closed' ? 30 : 8,
              transformStyle: 'preserve-3d'
            }}
          >
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 460 172"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="topFlapDropShadow" x="-20%" y="-10%" width="140%" height="150%">
                  <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.8" />
                </filter>
                <linearGradient id="topFlapSurface" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2B2838" />
                  <stop offset="100%" stopColor="#1B1924" />
                </linearGradient>
              </defs>
              <path
                d="M 0,0 L 460,0 L 244,162 Q 230,172 216,162 Z"
                fill="url(#topFlapSurface)"
                filter="url(#topFlapDropShadow)"
              />
              <path
                d="M 14,6 L 446,6 L 241,154 Q 230,162 219,154 Z"
                fill="none"
                stroke="rgba(212, 175, 55, 0.55)"
                strokeWidth="1.2"
              />
              <path
                d="M 0,0 L 460,0 L 244,162 Q 230,172 216,162 Z"
                fill="none"
                stroke="rgba(212, 175, 55, 0.75)"
                strokeWidth="1.8"
              />
            </svg>
          </div>

          {/* LAYER 5: Centered 3D Embossed Wax Seal ("A & M") */}
          <button
            onClick={onOpen}
            aria-label="افتح الدعوة"
            style={{ zIndex: 40 }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-all duration-500 ${
              envelopeStage === 'closed'
                ? 'scale-100 opacity-100 hover:scale-105 active:scale-95 cursor-pointer'
                : 'scale-125 -translate-y-2/3 opacity-0 pointer-events-none'
            }`}
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center animate-pulse-glow">
              <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible">
                <defs>
                  <radialGradient id="waxGoldGrad" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FFF2B2" />
                    <stop offset="35%" stopColor="#E0B84C" />
                    <stop offset="72%" stopColor="#AC7E1E" />
                    <stop offset="100%" stopColor="#69490A" />
                  </radialGradient>
                  <radialGradient id="waxInnerStamp" cx="65%" cy="70%" r="65%">
                    <stop offset="0%" stopColor="#E6C35C" />
                    <stop offset="55%" stopColor="#B88924" />
                    <stop offset="100%" stopColor="#78540D" />
                  </radialGradient>
                </defs>

                <path
                  d="M60,5 C73,4 85,9 95,17 C105,25 114,36 115,49 C116,62 112,75 105,86 C98,97 88,108 75,112 C62,116 48,115 36,110 C24,105 13,96 8,84 C3,72 4,58 7,45 C10,32 17,20 28,13 C39,6 47,6 60,5 Z"
                  fill="url(#waxGoldGrad)"
                  stroke="#5C3F07"
                  strokeWidth="1"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="42"
                  fill="url(#waxInnerStamp)"
                  stroke="#593D06"
                  strokeWidth="2"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="38"
                  fill="none"
                  stroke="#FBE89E"
                  strokeWidth="0.9"
                  strokeDasharray="3 2"
                  opacity="0.8"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span
                  className="font-monogram text-xl sm:text-2xl font-bold tracking-wider text-[#332102]"
                  style={{
                    textShadow: '0 1px 1px rgba(255, 242, 178, 0.75), 0 -1px 1px rgba(0, 0, 0, 0.45)'
                  }}
                >
                  A &amp; M
                </span>
                <span className="font-amiri text-[10px] sm:text-[11px] font-bold text-[#422B04] -mt-0.5">
                  {config.groomName} و {config.brideName}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeOverlay;

