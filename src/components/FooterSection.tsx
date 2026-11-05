import React from 'react';
import { InvitationConfig, ThemeConfig } from '../types';

interface FooterSectionProps {
  config: InvitationConfig;
  theme: ThemeConfig;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ config, theme }) => {
  return (
    <footer className="py-12 px-4 text-center border-t border-[#D4AF37]/20">
      <h3 className="font-ruqaa text-3xl text-[#D4AF37] mb-2">
        {config.groomName} &amp; {config.brideName}
      </h3>
      <p className={`text-xs sm:text-sm ${theme.textSecondary}`}>
        وعقبال الفرحة الكبيرة عندكم جميعاً • {config.displayDateArabic}
      </p>
    </footer>
  );
};

export default FooterSection;

