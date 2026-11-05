import React, { useState, useEffect, useRef } from 'react';
import {
  InvitationConfig,
  EnvelopeStage,
  TimeLeft,
  WishItem,
  WishFormData,
  PartyPhotoItem,
  PolaroidItem,
  RoseStyleId
} from './types';
import {
  DEFAULT_CONFIG,
  THEMES,
  DEFAULT_POLAROIDS,
  INITIAL_WISHES,
  INITIAL_PARTY_PHOTOS
} from './constants';
import { RomanticAudioEngine } from './utils/audio';
import {
  RealisticRosesBackground,
  EnvelopeOverlay,
  FloatingControls,
  CustomizationStudio,
  HeroSection,
  ScratchDateSection,
  PolaroidStorySection,
  CountdownLogisticsSection,
  WishesRSVPSection,
  SharedPhotoDropSection,
  FooterSection
} from './components';

export function App() {
  // --- Host Customization State ---
  const [config, setConfig] = useState<InvitationConfig>(DEFAULT_CONFIG);

  // --- Rose Burst Signal (Triggered when Envelope Opens or Rose Style Changes) ---
  const [roseBurstSignal, setRoseBurstSignal] = useState(0);

  // --- VIP Guest Name State (URL Query or Custom Preview) ---
  const [guestName, setGuestName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('guest') || 'عائلة المهندس طارق';
    }
    return 'عائلة المهندس طارق';
  });
  const [vipInput, setVipInput] = useState('عائلة المهندس طارق');
  const [copiedLink, setCopiedLink] = useState(false);

  // --- Envelope & Audio State ---
  const [envelopeStage, setEnvelopeStage] = useState<EnvelopeStage>('closed');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioEngineRef = useRef<RomanticAudioEngine | null>(null);

  // --- Studio Drawer & Guest Preview Mode ---
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [guestPreviewMode, setGuestPreviewMode] = useState(false);

  // --- Polaroid Stack State ---
  const [polaroids, setPolaroids] = useState<PolaroidItem[]>(DEFAULT_POLAROIDS);
  const [activePolaroidIndex, setActivePolaroidIndex] = useState(0);
  const [polaroidAnimating, setPolaroidAnimating] = useState(false);

  // --- Countdown Timer State ---
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 48, hours: 14, minutes: 32, seconds: 19 });

  // --- Wall of Wishes (RSVP) State ---
  const [wishes, setWishes] = useState<WishItem[]>(() => {
    try {
      const saved = localStorage.getItem('khotouba_wishes_v1');
      return saved ? JSON.parse(saved) : INITIAL_WISHES;
    } catch {
      return INITIAL_WISHES;
    }
  });
  const [wishForm, setWishForm] = useState<WishFormData>({
    name: '',
    status: 'attending',
    guestsCount: 2,
    message: ''
  });
  const [wishSubmittedBanner, setWishSubmittedBanner] = useState(false);

  // --- Shared Party Photo Album State ---
  const [partyPhotos, setPartyPhotos] = useState<PartyPhotoItem[]>(INITIAL_PARTY_PHOTOS);
  const [photoUploaderName, setPhotoUploaderName] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');

  const theme = THEMES[config.themeId] || THEMES.royal;

  // Initialize Web Audio Engine
  useEffect(() => {
    audioEngineRef.current = new RomanticAudioEngine();
    return () => {
      audioEngineRef.current?.dispose();
    };
  }, []);

  // Persist Wishes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('khotouba_wishes_v1', JSON.stringify(wishes.slice(0, 50)));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishes]);

  // Live Countdown Effect
  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(`${config.eventDate}T${config.eventTime || '20:00'}:00`).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0 || isNaN(diff)) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [config.eventDate, config.eventTime]);

  // Handle Opening the 3D Envelope with Staged Real-Physics Paper Extraction
  const handleOpenEnvelope = () => {
    if (envelopeStage !== 'closed') return;

    // Trigger celebratory rose & petal burst around the envelope
    setRoseBurstSignal((prev) => prev + 1);

    // Start gentle celebratory music on tap
    if (audioEngineRef.current) {
      audioEngineRef.current.start();
      setIsPlayingAudio(true);
    }

    // Step 1: Wax seal lifts & top flap opens
    setEnvelopeStage('flap');

    // Step 2: Card slides upward out of the pocket
    setTimeout(() => {
      setEnvelopeStage('extract');
      setRoseBurstSignal((prev) => prev + 1);
    }, 700);

    // Step 3: Card steps in front of envelope
    setTimeout(() => {
      setEnvelopeStage('present');
    }, 2000);

    // Step 4: Card expands and smoothly transitions to main site
    setTimeout(() => {
      setEnvelopeStage('expand');
    }, 3000);

    setTimeout(() => {
      setEnvelopeStage('opened');
    }, 3700);
  };

  const cycleRoseStyle = () => {
    const order: RoseStyleId[] = ['crimson', 'ivory', 'blush'];
    const nextIdx = (order.indexOf(config.roseStyleId) + 1) % order.length;
    setConfig((prev) => ({ ...prev, roseStyleId: order[nextIdx] }));
    setRoseBurstSignal((prev) => prev + 1);
  };

  const toggleAudio = () => {
    if (!audioEngineRef.current) return;
    if (isPlayingAudio) {
      audioEngineRef.current.stop();
      setIsPlayingAudio(false);
    } else {
      audioEngineRef.current.start();
      setIsPlayingAudio(true);
    }
  };

  // Cycle Polaroid Cards
  const nextPolaroid = () => {
    if (polaroidAnimating) return;
    setPolaroidAnimating(true);
    setTimeout(() => {
      setActivePolaroidIndex((prev) => (prev + 1) % polaroids.length);
      setPolaroidAnimating(false);
    }, 280);
  };

  const prevPolaroid = () => {
    if (polaroidAnimating) return;
    setPolaroidAnimating(true);
    setTimeout(() => {
      setActivePolaroidIndex((prev) => (prev - 1 + polaroids.length) % polaroids.length);
      setPolaroidAnimating(false);
    }, 280);
  };

  // Generate & Download .ICS Calendar File
  const handleDownloadICS = () => {
    const cleanDate = config.eventDate.replace(/-/g, '');
    const cleanTime = (config.eventTime || '20:00').replace(':', '') + '00';
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Khotouba Interactive Invitation//AR',
      'BEGIN:VEVENT',
      `SUMMARY:حفل خطوبة ${config.groomName} و ${config.brideName} 💍`,
      `DTSTART:${cleanDate}T${cleanTime}`,
      `DTEND:${cleanDate}T235900`,
      `LOCATION:${config.venueName} - ${config.venueAddress}`,
      `DESCRIPTION:${config.welcomeMessage} - الموقع: ${config.mapsUrl}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `khotouba-${config.groomName}-${config.brideName}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Personalized Guest Link
  const handleCopyVipLink = () => {
    setGuestName(vipInput);
    const baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://khotouba-invite.app/';
    const shareUrl = `${baseUrl}?guest=${encodeURIComponent(vipInput)}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Handle Custom Photo Uploads
  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const resultUrl = event.target?.result as string;
      if (resultUrl) {
        setConfig((prev) => ({ ...prev, heroImage: resultUrl }));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handlePolaroidImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const resultUrl = event.target?.result as string;
      if (resultUrl) {
        setPolaroids((prev) =>
          prev.map((item, idx) => (idx === index ? { ...item, image: resultUrl } : item))
        );
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handlePartyPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const resultUrl = event.target?.result as string;
      if (resultUrl) {
        const newPhoto: PartyPhotoItem = {
          id: `p-${Date.now()}`,
          uploader: photoUploaderName.trim() || 'ضيف الحفل الكريم',
          caption: photoCaption.trim() || `لقطة مميزة من خطوبة ${config.groomName} و ${config.brideName} ✨`,
          url: resultUrl
        };
        setPartyPhotos((prev) => [newPhoto, ...prev]);
        setPhotoCaption('');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Submit Wish / RSVP
  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishForm.name.trim() || !wishForm.message.trim()) return;

    const newWish: WishItem = {
      id: `w-${Date.now()}`,
      name: wishForm.name.trim(),
      status: wishForm.status,
      guestsCount: Number(wishForm.guestsCount) || 1,
      message: wishForm.message.trim(),
      time: 'الآن'
    };

    setWishes((prev) => [newWish, ...prev]);
    setWishForm({ name: '', status: 'attending', guestsCount: 2, message: '' });
    setWishSubmittedBanner(true);
    setTimeout(() => setWishSubmittedBanner(false), 4000);
  };

  return (
    <div
      dir="rtl"
      className={`min-h-screen ${theme.bgPrimary} ${theme.textPrimary} selection:bg-[#D4AF37] selection:text-black relative overflow-x-hidden transition-colors duration-500`}
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      {/* 0. Realistic Falling Roses & Petals Layer */}
      <RealisticRosesBackground
        roseStyleId={config.roseStyleId}
        burstSignal={roseBurstSignal}
        zIndexClass={envelopeStage !== 'opened' ? 'z-[55]' : 'z-30'}
      />

      {/* 1. Realistic 3D Envelope & Paper Extraction Overlay */}
      <EnvelopeOverlay
        config={config}
        guestName={guestName}
        envelopeStage={envelopeStage}
        onOpen={handleOpenEnvelope}
      />

      {/* Floating Controls (Vinyl Audio + Rose Switcher + Studio Trigger) */}
      <FloatingControls
        theme={theme}
        config={config}
        isPlayingAudio={isPlayingAudio}
        guestPreviewMode={guestPreviewMode}
        onToggleAudio={toggleAudio}
        onCycleRoseStyle={cycleRoseStyle}
        onReopenEnvelope={() => setEnvelopeStage('closed')}
        onOpenStudio={() => setIsStudioOpen(true)}
        onExitGuestPreview={() => setGuestPreviewMode(false)}
      />

      {/* 2. Host Customization Studio Modal / Drawer */}
      <CustomizationStudio
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        config={config}
        onConfigChange={setConfig}
        vipInput={vipInput}
        onVipInputChange={(val) => {
          setVipInput(val);
          setGuestName(val);
        }}
        onCopyVipLink={handleCopyVipLink}
        copiedLink={copiedLink}
        onHeroImageUpload={handleHeroImageUpload}
        onEnterGuestPreview={() => setGuestPreviewMode(true)}
        onRoseBurstTrigger={() => setRoseBurstSignal((prev) => prev + 1)}
      />

      {/* 3. Hero Section with Cinemagraph Effect */}
      <HeroSection config={config} guestName={guestName} />

      {/* 4. HTML5 Canvas Scratch-off Date Reveal */}
      <ScratchDateSection
        config={config}
        theme={theme}
        envelopeStage={envelopeStage}
      />

      {/* 5. Polaroid Stack & Timeline Section */}
      <PolaroidStorySection
        polaroids={polaroids}
        activePolaroidIndex={activePolaroidIndex}
        polaroidAnimating={polaroidAnimating}
        onNextPolaroid={nextPolaroid}
        onPrevPolaroid={prevPolaroid}
        onImageUpload={handlePolaroidImageUpload}
        guestPreviewMode={guestPreviewMode}
        theme={theme}
        config={config}
      />

      {/* 6. Live Countdown & Logistics Section */}
      <CountdownLogisticsSection
        timeLeft={timeLeft}
        config={config}
        theme={theme}
        onDownloadICS={handleDownloadICS}
      />

      {/* 7. Live Wall of Wishes (دفتر المباركات) & RSVP */}
      <WishesRSVPSection
        theme={theme}
        wishes={wishes}
        wishForm={wishForm}
        onWishFormChange={setWishForm}
        onSubmitWish={handleWishSubmit}
        wishSubmittedBanner={wishSubmittedBanner}
      />

      {/* 8. Event-Day Shared Photo Drop (شاركنا لقطاتك) */}
      <SharedPhotoDropSection
        theme={theme}
        partyPhotos={partyPhotos}
        photoUploaderName={photoUploaderName}
        onPhotoUploaderNameChange={setPhotoUploaderName}
        photoCaption={photoCaption}
        onPhotoCaptionChange={setPhotoCaption}
        onUploadPhoto={handlePartyPhotoUpload}
      />

      {/* 9. Footer */}
      <FooterSection config={config} theme={theme} />
    </div>
  );
}

export default App;

