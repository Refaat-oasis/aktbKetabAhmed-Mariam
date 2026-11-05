import {
  RoseStyle,
  RoseStyleId,
  ThemeConfig,
  ThemeId,
  InvitationConfig,
  PolaroidItem,
  WishItem,
  PartyPhotoItem
} from '../types';

export const ROSE_STYLES: Record<RoseStyleId, RoseStyle> = {
  crimson: {
    id: 'crimson',
    name: 'ورد جوري أحمر',
    subtitle: 'Crimson Velvet Roses',
    swatch: '#B81428',
    coreDark: '#38020A',
    midTone: '#8E0B1C',
    brightTone: '#C8192E',
    highlight: '#FF758F',
    underside: '#520610',
    veinColor: 'rgba(255, 160, 175, 0.22)',
    bokehColor: 'rgba(212, 45, 75, 0.22)',
    rayColor: 'rgba(212, 175, 55, 0.07)'
  },
  ivory: {
    id: 'ivory',
    name: 'ورد أوف وايت وذهبي',
    subtitle: 'Ivory & Champagne Gold',
    swatch: '#F3E5AB',
    coreDark: '#856A3F',
    midTone: '#D1BA91',
    brightTone: '#F7F0E4',
    highlight: '#FFFFFF',
    underside: '#B59B6D',
    veinColor: 'rgba(165, 130, 70, 0.2)',
    bokehColor: 'rgba(235, 200, 115, 0.25)',
    rayColor: 'rgba(245, 220, 139, 0.09)'
  },
  blush: {
    id: 'blush',
    name: 'ورد روز ناعم',
    subtitle: 'Dusty Blush Roses',
    swatch: '#E5989B',
    coreDark: '#59222C',
    midTone: '#B55D6E',
    brightTone: '#E899A8',
    highlight: '#FFE5EC',
    underside: '#7D3543',
    veinColor: 'rgba(255, 225, 232, 0.25)',
    bokehColor: 'rgba(232, 153, 168, 0.24)',
    rayColor: 'rgba(229, 193, 88, 0.08)'
  }
};

export const THEMES: Record<ThemeId, ThemeConfig> = {
  royal: {
    id: 'royal',
    name: 'ملكي أسود وذهبي',
    subtitle: 'Royal Black & Gold',
    bgPrimary: 'bg-[#0B0B0E]',
    bgSecondary: 'bg-[#14141A]',
    bgCard: 'bg-[#181820]/90',
    textPrimary: 'text-[#FAF5E8]',
    textSecondary: 'text-[#C8BFA8]',
    accentText: 'text-[#D4AF37]',
    accentBg: 'bg-[#D4AF37]',
    accentGradient: 'from-[#BF953F] via-[#FCF6BA] to-[#B38728]',
    buttonBg: 'bg-gradient-to-r from-[#C59B27] via-[#E5C158] to-[#B38728] text-[#0B0B0E] font-bold',
    border: 'border-[#D4AF37]/30',
    borderStrong: 'border-[#D4AF37]',
    envelopeBg: '#16151C',
    envelopeFlap: '#1F1D29',
    sealColor: '#C59B27',
    foilPrimary: '#D4AF37',
    foilSecondary: '#AA771C',
    particleColor: 'rgba(212, 175, 55, 0.6)',
    swatchColors: [
      { name: 'ذهبي شامبين', hex: '#E5C158', note: 'لون متناغم مع ديكور القاعة' },
      { name: 'أسود ملكي', hex: '#14141A', note: 'كلاسيكي أنيق للبدل والفساتين' },
      { name: 'أخضر زمردي داكن', hex: '#134E4A', note: 'درجة فخمة ومميزة للسهرات' },
      { name: 'كشمير دافئ', hex: '#9D6B74', note: 'درجة ناعمة ومبهجة' },
    ],
    brideDressNote: 'ملاحظة لطيفة: فستان العروسة باللون السيلفر الملكي المائل للأوف وايت ✨'
  },
  boho: {
    id: 'boho',
    name: 'كريمي وزيتي ناعم',
    subtitle: 'Warm Botanical Boho',
    bgPrimary: 'bg-[#FAF6F0]',
    bgSecondary: 'bg-[#F2ECE1]',
    bgCard: 'bg-white/90',
    textPrimary: 'text-[#2C352E]',
    textSecondary: 'text-[#5C665E]',
    accentText: 'text-[#8C6D46]',
    accentBg: 'bg-[#6B7F6E]',
    accentGradient: 'from-[#8C6D46] via-[#C5A880] to-[#6B7F6E]',
    buttonBg: 'bg-[#6B7F6E] hover:bg-[#596B5C] text-white font-bold',
    border: 'border-[#C5A880]/40',
    borderStrong: 'border-[#8C6D46]',
    envelopeBg: '#EFE7DA',
    envelopeFlap: '#E4D9C8',
    sealColor: '#8C6D46',
    foilPrimary: '#C5A880',
    foilSecondary: '#8C6D46',
    particleColor: 'rgba(140, 109, 70, 0.35)',
    swatchColors: [
      { name: 'أخضر مريمي (Sage)', hex: '#7A8F7D', note: 'اللون الأساسي لثيم الحفل' },
      { name: 'بيج رملي دافئ', hex: '#D8C3A5', note: 'مثالي للإطلالات الهادئة' },
      { name: 'وردي ترابي (Dusty Rose)', hex: '#C9968B', note: 'ناعم ورومانسي' },
      { name: 'بني اسبريسو', hex: '#4A3B32', note: 'أنيق للبدل الرجالي' },
    ],
    brideDressNote: 'ملاحظة لطيفة: فستان العروسة باللون الشامبين الذهبي الفاتح ✨'
  },
  editorial: {
    id: 'editorial',
    name: 'كلاسيك أبيض وأسود',
    subtitle: 'Modern Editorial B&W',
    bgPrimary: 'bg-[#FAFAFA]',
    bgSecondary: 'bg-[#F0F0F0]',
    bgCard: 'bg-white',
    textPrimary: 'text-[#111111]',
    textSecondary: 'text-[#555555]',
    accentText: 'text-[#111111]',
    accentBg: 'bg-[#111111]',
    accentGradient: 'from-[#111111] via-[#444444] to-[#000000]',
    buttonBg: 'bg-[#111111] hover:bg-[#333333] text-white font-bold',
    border: 'border-black/15',
    borderStrong: 'border-black',
    envelopeBg: '#181818',
    envelopeFlap: '#242424',
    sealColor: '#D4AF37',
    foilPrimary: '#2A2A2A',
    foilSecondary: '#111111',
    particleColor: 'rgba(17, 17, 17, 0.2)',
    swatchColors: [
      { name: 'أسود كلاسيك', hex: '#111111', note: 'إطلالة Black Tie رسمية' },
      { name: 'رمادي فحمي', hex: '#4B5563', note: 'عصري وأنيق' },
      { name: 'فضي ميتاليك', hex: '#9CA3AF', note: 'لمسة سهرة راقية' },
      { name: 'بورجوندي عميق', hex: '#581C27', note: 'لكسر اللون الكلاسيكي بلمسة فخمة' },
    ],
    brideDressNote: 'ملاحظة لطيفة: يرجى تجنب اللون الأبيض الصريح المخصص للعروسة 🤍'
  }
};

export const DEFAULT_CONFIG: InvitationConfig = {
  groomName: 'أحمد',
  brideName: 'مريم',
  eventDate: '2026-12-18',
  eventTime: '20:00',
  displayDateArabic: 'الجمعة ١٨ ديسمبر ٢٠٢٦',
  displayTimeArabic: 'الثامنة مساءً (٨:٠٠ م)',
  venueName: 'قاعة اللوتس الملكية - فندق النيل ريتز',
  venueAddress: 'كورنيش النيل، وسط البلد، القاهرة',
  mapsUrl: 'https://maps.google.com/?q=Cairo+Nile+Corniche',
  heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
  welcomeMessage: 'فرحتنا مش هتكمل غير بوجودكم معانا في ليلة مليانة مودة وبهجة.. دعواتكم وتشريفكم هينور ليلتنا',
  themeId: 'royal',
  roseStyleId: 'crimson'
};

export const DEFAULT_POLAROIDS: PolaroidItem[] = [
  {
    id: 1,
    caption: 'أول صدفة جمعت قلوبنا ✨',
    date: 'ربيع ٢٠٢٥',
    rotation: '-rotate-3',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    caption: 'يوم قراءة الفاتحة والوعد الغالي 🤍',
    date: 'أغسطس ٢٠٢٦',
    rotation: 'rotate-2',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    caption: 'تجهيزات الفرحة واختيار الدبل 💍',
    date: 'أكتوبر ٢٠٢٦',
    rotation: '-rotate-2',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    caption: 'مستنيينكم تكملوا فرحتنا الكبيرة 🎉',
    date: 'نوفمبر ٢٠٢٦',
    rotation: 'rotate-3',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80'
  }
];

export const INITIAL_WISHES: WishItem[] = [
  {
    id: 'w1',
    name: 'عائلة المهندس طارق عبد الرحمن',
    status: 'attending',
    guestsCount: 4,
    message: 'ألف مليون مبروك يا أحمد ويا مريم! ربنا يتمم فرحتكم على خير ويجعل بيتكم كله سعادة ومودة، جايين نبارك ونفرح معاكم بإذن الله.',
    time: 'منذ ساعتين'
  },
  {
    id: 'w2',
    name: 'سارة محمود وصديقات العروسة',
    status: 'attending',
    guestsCount: 3,
    message: 'أحلى عروسة في الدنيا مريومة القمر! مش مصدقين إن اليوم المنتظر قرب، محضرين الزغاريد من دلوقتي عقبال الليلة الكبيرة يا رب 💃✨',
    time: 'منذ ٥ ساعات'
  },
  {
    id: 'w3',
    name: 'د. كريم حسن',
    status: 'attending',
    guestsCount: 2,
    message: 'بارك الله لكما وبارك عليكما وجمع بينكما في خير.. ألف مبروك يا صاحبي وعقبال الفرحة الكبرى.',
    time: 'أمس'
  }
];

export const INITIAL_PARTY_PHOTOS: PartyPhotoItem[] = [
  {
    id: 'p1',
    uploader: 'ندى أخت العروسة',
    caption: 'تفاصيل دبل الخطوبة والورد 💍🌸',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p2',
    uploader: 'عمر صديق العريس',
    caption: 'تجهيزات القاعة قبل وصول العرسان ✨',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80'
  }
];

