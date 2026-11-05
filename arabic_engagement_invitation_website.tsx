/**
 * Arabic Engagement / Katb Kitab Invitation
 * 
 * Modularized Architecture:
 * - src/App.tsx: Main orchestrator
 * - src/types/index.ts: TypeScript data interfaces
 * - src/constants/index.ts: Themes, rose styles, and default data
 * - src/utils/audio.ts: Romantic audio synthesizer
 * - src/components/*: Subcomponents (RealisticRosesBackground, EnvelopeOverlay, FloatingControls, CustomizationStudio, HeroSection, ScratchDateSection, PolaroidStorySection, CountdownLogisticsSection, WishesRSVPSection, SharedPhotoDropSection, FooterSection, CustomQRCodeSVG)
 */

export { default, App } from './src/App';
export * from './src/types';
export * from './src/constants';
export * from './src/components';
export * from './src/utils/audio';
