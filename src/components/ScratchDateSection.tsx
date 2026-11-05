import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Clock, RotateCcw } from 'lucide-react';
import { EnvelopeStage, InvitationConfig, ThemeConfig } from '../types';

interface ScratchDateSectionProps {
  config: InvitationConfig;
  theme: ThemeConfig;
  envelopeStage: EnvelopeStage;
}

export function ScratchDateSection({
  config,
  theme,
  envelopeStage
}: ScratchDateSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const isDrawingRef = useRef(false);

  // Initialize & Draw Metallic Foil on Scratch Canvas
  const initScratchCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;

    ctx.globalCompositeOperation = 'source-over';

    // Metallic Gold Foil Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#B38728');
    grad.addColorStop(0.25, '#FBF5B7');
    grad.addColorStop(0.5, '#D4AF37');
    grad.addColorStop(0.75, '#FDF0A6');
    grad.addColorStop(1, '#AA771C');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle decorative border on foil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Shimmer dots on foil
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 45; i++) {
      const x = (i * 53) % width;
      const y = (i * 37) % height;
      ctx.beginPath();
      ctx.arc(x, y, (i % 3) + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Arabic instruction text on foil
    ctx.fillStyle = '#2A1F04';
    ctx.font = 'bold 20px Amiri, serif';
    ctx.textAlign = 'center';
    ctx.fillText('امسح الكارت الذهبي للكشف عن الموعد', width / 2, height / 2 - 4);

    ctx.font = '15px Cormorant Garamond, serif';
    ctx.fillStyle = '#4A3708';
    ctx.fillText('A & M', width / 2, height / 2 + 22);

    setIsScratched(false);
  }, []);

  useEffect(() => {
    // Initialize canvas after mount or when envelope opens
    const timeout = setTimeout(() => {
      initScratchCanvas();
    }, 150);
    return () => clearTimeout(timeout);
  }, [envelopeStage, config.themeId, initScratchCanvas]);

  const triggerScratchComplete = () => {
    setIsScratched(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // Scratch Interaction Logic
  const handleScratchMove = (clientX: number, clientY: number) => {
    if (isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratched area percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    const totalSampled = pixels.length / 16; // sample every 4th pixel for speed

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] < 128) transparentPixels++;
    }

    const percent = Math.min(100, Math.round((transparentPixels / totalSampled) * 100));

    if (percent >= 42 && !isScratched) {
      triggerScratchComplete();
    }
  };

  return (
    <section id="scratch-date" className="py-16 px-4 max-w-3xl mx-auto text-center relative">
      {/* Confetti Burst Overlay when Scratched */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          {[...Array(28)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                left: `${(i * 13) % 95}%`,
                top: '-10px',
                backgroundColor: ['#D4AF37', '#F59E0B', '#EC4899', '#10B981', '#FAF5E8'][i % 5],
                animation: `confettiFall ${1.8 + (i % 4) * 0.4}s ease-out forwards`,
                animationDelay: `${(i % 5) * 0.1}s`
              }}
            />
          ))}
        </div>
      )}

      <h2 className="font-ruqaa text-3xl sm:text-4xl mb-3">موعد ليلتنا المنتظرة</h2>
      <p className={`text-sm ${theme.textSecondary} mb-8`}>
        يسعدنا تشريفكم ومشاركتنا أجمل لحظات العمر
      </p>

      {/* Scratch Card Container */}
      <div
        className={`relative w-full max-w-md mx-auto h-52 rounded-3xl p-6 shadow-2xl border-2 ${theme.borderStrong} ${theme.bgCard} flex flex-col items-center justify-center overflow-hidden select-none`}
      >
        {/* Underlying Revealed Date Content */}
        <div className="flex flex-col items-center justify-center text-center z-10">
          <span className="font-monogram text-sm tracking-widest text-[#D4AF37] mb-1">
            A &amp; M
          </span>
          <h3 className="font-amiri text-2xl sm:text-3xl font-bold my-1">
            {config.displayDateArabic}
          </h3>
          <p className={`text-sm font-semibold ${theme.textSecondary} mt-1 flex items-center gap-1.5`}>
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span>{config.displayTimeArabic}</span>
          </p>
          <p className="text-xs text-[#D4AF37] mt-2 font-medium">{config.venueName}</p>
        </div>

        {/* Interactive Gold Foil HTML5 Canvas Overlay */}
        <canvas
          ref={canvasRef}
          width={420}
          height={210}
          onMouseDown={() => {
            isDrawingRef.current = true;
          }}
          onMouseUp={() => {
            isDrawingRef.current = false;
          }}
          onMouseLeave={() => {
            isDrawingRef.current = false;
          }}
          onMouseMove={(e) => {
            if (isDrawingRef.current) {
              handleScratchMove(e.clientX, e.clientY);
            }
          }}
          onTouchStart={(e) => {
            isDrawingRef.current = true;
            const touch = e.touches[0];
            if (touch) handleScratchMove(touch.clientX, touch.clientY);
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            if (touch) handleScratchMove(touch.clientX, touch.clientY);
          }}
          onTouchEnd={() => {
            isDrawingRef.current = false;
          }}
          className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-700 z-20 ${
            isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      {/* Scratch Helper Controls */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs">
        {!isScratched ? (
          <button
            onClick={triggerScratchComplete}
            className="px-4 py-2 rounded-full border border-[#D4AF37]/50 hover:bg-[#D4AF37]/15 transition font-semibold"
          >
            إظهار التاريخ مباشرة ✨
          </button>
        ) : (
          <button
            onClick={initScratchCanvas}
            className="px-4 py-2 rounded-full border border-[#D4AF37]/50 hover:bg-[#D4AF37]/15 transition font-semibold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة الطبقة الذهبية</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default ScratchDateSection;

