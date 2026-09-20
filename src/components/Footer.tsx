import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Logo } from './Logo';
import { ArrowUp, Sliders } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { usePortfolio } from '../context/PortfolioContext';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const { siteConfig, setIsDashboardOpen } = usePortfolio();
  const t = translations[language];
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="w-full bg-[#F7F5F2] pt-16 pb-12 text-[#171717]"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 space-y-12">
        {/* Top Tier: Logo, Mission, Social Channels */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-12 border-b border-[#171717]/8">
          <div className="space-y-4 max-w-md">
            <Logo language={language} onClick={scrollToTop} />
            <p className="text-xs sm:text-sm text-[#77736F] leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <div className="flex flex-col md:items-end space-y-4">
            <span className="text-[11px] uppercase tracking-widest text-[#77736F] font-semibold">
              {language === 'ar' ? 'التواصل الاجتماعي' : 'Social Channels'}
            </span>
            <SocialLinks language={language} variant="compact" />
          </div>
        </div>

        {/* Bottom Tier: Copyright, Intent Statement, Back To Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77736F]">
          <div className="flex flex-wrap items-center gap-3 text-center sm:text-start">
            <span>
              © {currentYear} {siteConfig.designerName[language]}. {t.footer.allRightsReserved}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#B49A7A] font-medium">
              {t.footer.designedWithIntention}
            </span>
            <span className="hidden sm:inline">•</span>
            <button
              id="footer-owner-studio-btn"
              onClick={() => setIsDashboardOpen(true)}
              className="inline-flex items-center gap-1 text-[#77736F] hover:text-[#171717] hover:underline cursor-pointer"
            >
              <Sliders className="w-3 h-3 text-[#B49A7A]" />
              <span>{language === 'ar' ? 'لوحة تحكم المالك' : 'Owner Studio'}</span>
            </button>
          </div>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFECE7] hover:bg-[#171717] hover:text-[#F7F5F2] transition-colors cursor-pointer"
            aria-label={t.footer.backToTop}
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

