import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { usePortfolio } from '../context/PortfolioContext';

interface ExpertiseProps {
  language: Language;
}

export const Expertise: React.FC<ExpertiseProps> = ({ language }) => {
  const { siteConfig } = usePortfolio();
  const t = translations[language];
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);

  const capabilities = siteConfig.capabilities || [];

  return (
    <section
      id="expertise"
      className="py-16 md:py-28 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 scroll-mt-20"
    >
      {/* Editorial Header */}
      <div className="pb-12 md:pb-16 border-b border-[#171717]/8">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B49A7A]" />
          <span className="text-[12px] uppercase tracking-widest text-[#77736F] font-semibold">
            {t.expertise.eyebrow}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#171717] tracking-tight">
            {t.expertise.title}
          </h2>

          <p className="text-sm sm:text-base text-[#77736F] max-w-md">
            {t.expertise.subtitle}
          </p>
        </div>
      </div>

      {/* Typographic Capabilities List */}
      <div className="divide-y divide-[#171717]/8 relative">
        {capabilities.map((cap, index) => {
          const isHovered = activeHoverIndex === index;
          const title = language === 'ar' ? cap.titleAr : cap.titleEn;
          const desc = language === 'ar' ? cap.descAr : cap.descEn;
          const tags = language === 'ar' ? cap.tagsAr : cap.tagsEn;

          return (
            <div
              key={cap.number}
              id={`capability-${cap.number}`}
              onMouseEnter={() => setActiveHoverIndex(index)}
              onMouseLeave={() => setActiveHoverIndex(null)}
              className="group relative py-8 md:py-10 transition-colors duration-300 hover:bg-[#EFECE7]/30 px-2 sm:px-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left/Start: Index Number & Title */}
              <div className="flex items-baseline gap-6 md:gap-10 flex-1">
                <span className="text-xs sm:text-sm font-mono text-[#B49A7A] group-hover:text-[#171717] transition-colors font-semibold">
                  {cap.number}
                </span>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#171717] group-hover:text-[#B49A7A] transition-colors duration-200 tracking-tight">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#77736F] max-w-xl font-normal leading-relaxed">
                    {desc}
                  </p>

                  {/* Deliverables tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-[#EFECE7] text-[11px] font-medium text-[#77736F]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center / Inline Visual Preview (Appears smoothly on hover or on mobile inline) */}
              <div className="shrink-0 flex items-center gap-4">
                {/* Visual Thumbnail */}
                <div
                  className={`w-28 sm:w-36 aspect-[4/3] rounded-xl overflow-hidden bg-[#EFECE7] border border-[#171717]/8 transition-all duration-300 ${
                    isHovered
                      ? 'opacity-100 scale-105 shadow-md'
                      : 'opacity-40 grayscale group-hover:grayscale-0 sm:opacity-0'
                  }`}
                >
                  <ImageWithFallback
                    src={cap.previewImage}
                    alt={title}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="hidden sm:flex w-10 h-10 rounded-full border border-[#171717]/10 group-hover:border-[#171717] group-hover:bg-[#171717] text-[#77736F] group-hover:text-[#F7F5F2] items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
