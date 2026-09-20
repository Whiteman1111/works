import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowUpRight, Sparkles, Quote } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { usePortfolio } from '../context/PortfolioContext';

interface AboutProps {
  language: Language;
  onOpenBio: () => void;
}

export const About: React.FC<AboutProps> = ({ language, onOpenBio }) => {
  const { siteConfig } = usePortfolio();
  const t = translations[language];

  const aboutIntro = siteConfig.aboutIntro?.[language] || t.about.intro;
  const aboutQuote = siteConfig.aboutQuote?.[language] || t.about.quote;

  return (
    <section
      id="about"
      className="py-16 md:py-28 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 scroll-mt-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column (Desktop) / Top (Mobile): Editorial Portrait */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Image Container with Framing */}
            <div className="relative rounded-3xl overflow-hidden bg-[#EFECE7] border border-[#171717]/8 shadow-[0_20px_50px_-20px_rgba(23,23,23,0.12)]">
              <ImageWithFallback
                src={siteConfig.portraitImage}
                alt={siteConfig.designerName[language]}
                aspectRatio="portrait"
                className="w-full h-full object-cover filter saturate-[0.92]"
              />

              {/* Floating Aesthetic Badge */}
              <div className="absolute bottom-4 start-4 end-4 p-4 rounded-2xl bg-[#F7F5F2]/90 backdrop-blur-md border border-[#171717]/6 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#77736F] font-semibold block">
                    {siteConfig.designerName[language]}
                  </span>
                  <span className="text-xs font-semibold text-[#171717]">
                    {siteConfig.title[language]}
                  </span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#B49A7A]" />
              </div>
            </div>

            {/* Decorative subtle background border offset */}
            <div className="absolute -inset-2 rounded-3xl border border-[#B49A7A]/20 -z-10 transform -rotate-1 hidden sm:block pointer-events-none" />
          </div>
        </div>

        {/* Right Column (Desktop) / Bottom (Mobile): Editorial Narrative */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B49A7A]" />
              <span className="text-[12px] uppercase tracking-widest text-[#77736F] font-semibold">
                {t.about.eyebrow}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#171717] tracking-tight">
              {t.about.title}
            </h2>
          </div>

          {/* Primary Intro Statement */}
          <p className="text-lg sm:text-xl text-[#171717] font-normal leading-relaxed">
            {aboutIntro}
          </p>

          {/* Philosophy Blockquote */}
          <div className="relative p-6 sm:p-7 rounded-2xl bg-[#EFECE7]/70 border-s-4 border-[#B49A7A]">
            <Quote className="w-6 h-6 text-[#B49A7A]/40 mb-2" />
            <p className="text-base sm:text-lg text-[#171717] italic font-editorial leading-relaxed">
              "{aboutQuote}"
            </p>
            <span className="text-xs font-medium text-[#77736F] mt-3 block">
              — {siteConfig.designerName[language]}
            </span>
          </div>

          {/* Key Stat & Trigger for Full Professional Bio */}
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              id="about-open-bio-btn"
              onClick={onOpenBio}
              className="group flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-sm font-medium transition-all duration-300 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A]"
            >
              <Sparkles className="w-4 h-4 text-[#B49A7A] group-hover:text-[#F7F5F2] transition-colors" />
              <span>{t.about.openBio}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <div className="flex items-center gap-3 text-xs text-[#77736F]">
              <span className="text-2xl font-bold text-[#171717] font-mono">
                {siteConfig.bio.yearsExperience}
              </span>
              <span className="max-w-[120px] leading-tight font-medium">
                {t.about.experienceBadge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
