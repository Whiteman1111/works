import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroProps {
  language: Language;
  onExploreClick: () => void;
  onAboutClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onExploreClick, onAboutClick }) => {
  const { siteConfig } = usePortfolio();
  const t = translations[language];

  const customHeadline = siteConfig.heroHeadline?.[language];
  const supportingText = siteConfig.heroSupportingText?.[language] || siteConfig.roles[language];
  const establishedYear = siteConfig.establishedYear || 'EST. 2019';
  const greeting =
    language === 'ar'
      ? `مرحباً، أنا ${siteConfig.designerName.ar}`
      : `Hello, I'm ${siteConfig.designerName.en}`;

  return (
    <section
      id="hero"
      className="relative min-h-[86vh] md:min-h-[92vh] flex flex-col justify-between pt-28 md:pt-36 pb-12 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12"
    >
      {/* Top Tagline & Status Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#171717]/6">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B49A7A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B49A7A]"></span>
          </span>
          <span className="text-[12px] font-medium tracking-wide text-[#77736F] uppercase">
            {siteConfig.availabilityStatus[language]}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[12px] text-[#77736F] tracking-wide">
          <span>{siteConfig.location[language]}</span>
        </div>
      </div>

      {/* Main Editorial Hero Layout */}
      <div className="my-auto py-10 md:py-16 flex flex-col items-start space-y-6 md:space-y-8 max-w-4xl">
        {/* Small Introduction */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFECE7] border border-[#171717]/6 text-[#171717] text-[13px] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#B49A7A]" />
          <span>{greeting}</span>
        </div>

        {/* Large Editorial Statement */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-semibold text-[#171717] tracking-tight leading-[1.12] lg:leading-[1.06]">
          {customHeadline ? (
            <span>{customHeadline}</span>
          ) : language === 'ar' ? (
            <span className="font-arabic-heading">
              أحوّل الأفكار إلى{' '}
              <span className="relative inline-block text-[#B49A7A]">
                تجارب بصرية
                <span className="absolute bottom-1 inset-x-0 h-[2px] bg-[#B49A7A]/30" />
              </span>
              .
            </span>
          ) : (
            <span>
              I turn ideas into{' '}
              <span className="font-editorial italic font-normal text-[#B49A7A] underline decoration-[#B49A7A]/30 underline-offset-8">
                visual experiences
              </span>
              .
            </span>
          )}
        </h1>

        {/* Supporting Discipline Roles */}
        <p className="text-base sm:text-lg md:text-xl text-[#77736F] max-w-2xl font-normal leading-relaxed">
          {supportingText}
        </p>

        {/* Primary & Secondary Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
          <button
            id="hero-explore-work-btn"
            onClick={onExploreClick}
            className="group flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-sm font-medium transition-all duration-300 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A]"
          >
            <span>{t.hero.exploreWork}</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </button>

          <button
            id="hero-about-me-btn"
            onClick={onAboutClick}
            className="flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-[#EFECE7] hover:bg-[#E5E1D8] text-[#171717] text-sm font-medium border border-[#171717]/8 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A]"
          >
            <span>{t.hero.aboutMe}</span>
          </button>

          <a
            id="hero-instagram-btn"
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-3.5 rounded-full text-sm font-medium text-[#77736F] hover:text-[#171717] hover:bg-[#EFECE7]/60 transition-colors"
          >
            <span>{t.hero.viewInstagram}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Social Media Circular Interactive Section */}
      <div className="pt-4 border-t border-[#171717]/6">
        <SocialLinks language={language} variant="hero" />
      </div>
    </section>
  );
};
