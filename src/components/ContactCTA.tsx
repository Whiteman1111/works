import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowUpRight, Copy, Check, Instagram, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ContactCTAProps {
  language: Language;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ language }) => {
  const { siteConfig } = usePortfolio();
  const t = translations[language];
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(siteConfig.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 scroll-mt-20"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#171717] text-[#F7F5F2] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl">
        {/* Subtle background luxury accent */}
        <div className="absolute top-0 end-0 w-96 h-96 rounded-full bg-[#B49A7A]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -start-20 w-80 h-80 rounded-full bg-[#B49A7A]/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6 sm:space-y-8">
          {/* Subtle Tag */}
          {Boolean(siteConfig.availabilityStatus?.[language]?.trim()) && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F5F2]/10 text-xs font-medium text-[#B49A7A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B49A7A] animate-pulse" />
              <span>{siteConfig.availabilityStatus[language]}</span>
            </div>
          )}

          {/* Large Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#F7F5F2] leading-[1.12]">
            {t.contactCTA.headline}
          </h2>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg md:text-xl text-[#F7F5F2]/70 leading-relaxed font-normal max-w-2xl">
            {t.contactCTA.subheadline}
          </p>

          {/* Actions: Direct Instagram CTA & Copy Email */}
          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              id="cta-instagram-button"
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#B49A7A] hover:bg-[#9E8465] text-[#171717] hover:text-[#F7F5F2] font-semibold text-sm transition-all duration-300 shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Instagram className="w-4 h-4" />
              <span>{t.contactCTA.button}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Email Copy Button */}
            <button
              id="cta-copy-email-btn"
              onClick={copyEmail}
              className="flex items-center gap-2 px-6 py-4 rounded-full bg-[#F7F5F2]/10 hover:bg-[#F7F5F2]/15 text-[#F7F5F2] text-sm font-medium border border-[#F7F5F2]/15 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Mail className="w-4 h-4 text-[#B49A7A]" />
              <span className="font-mono text-xs">{siteConfig.email}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 ms-1" />
              ) : (
                <Copy className="w-3.5 h-3.5 opacity-60 ms-1" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
