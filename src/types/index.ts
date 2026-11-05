export type ThemeId = 'royal' | 'boho' | 'editorial';
export type RoseStyleId = 'crimson' | 'ivory' | 'blush';

export type EnvelopeStage = 'closed' | 'flap' | 'extract' | 'present' | 'expand' | 'opened';

export interface RoseStyle {
  id: RoseStyleId;
  name: string;
  subtitle: string;
  swatch: string;
  coreDark: string;
  midTone: string;
  brightTone: string;
  highlight: string;
  underside: string;
  veinColor: string;
  bokehColor: string;
  rayColor: string;
}

export interface SwatchColor {
  name: string;
  hex: string;
  note: string;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  textPrimary: string;
  textSecondary: string;
  accentText: string;
  accentBg: string;
  accentGradient: string;
  buttonBg: string;
  border: string;
  borderStrong: string;
  envelopeBg: string;
  envelopeFlap: string;
  sealColor: string;
  foilPrimary: string;
  foilSecondary: string;
  particleColor: string;
  swatchColors: SwatchColor[];
  brideDressNote: string;
}

export interface InvitationConfig {
  groomName: string;
  brideName: string;
  eventDate: string;
  eventTime: string;
  displayDateArabic: string;
  displayTimeArabic: string;
  venueName: string;
  venueAddress: string;
  mapsUrl: string;
  heroImage: string;
  welcomeMessage: string;
  themeId: ThemeId;
  roseStyleId: RoseStyleId;
}

export interface PolaroidItem {
  id: number;
  caption: string;
  date: string;
  rotation: string;
  image: string;
}

export interface WishItem {
  id: string;
  name: string;
  status: 'attending' | 'wishes_only';
  guestsCount: number;
  message: string;
  time: string;
}

export interface WishFormData {
  name: string;
  status: 'attending' | 'wishes_only';
  guestsCount: number;
  message: string;
}

export interface PartyPhotoItem {
  id: string;
  uploader: string;
  caption: string;
  url: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

