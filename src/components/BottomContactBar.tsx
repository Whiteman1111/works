import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Instagram, Mail, MapPin, ArrowUpRight, Check, Copy } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface BottomContactBarProps {
  language: Language;
}

export const BottomContactBar: React.FC<BottomContactBarProps> = ({ language }) => {
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
      id="bottom-contact-strip"
      className="w-full bg-[#EFECE7] border-y border-[#171717]/8 py-8 md:py-10"
      aria-label="Direct Contact Ribbon"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left: Availability Status with Pulsing Green Dot */}
        {(Boolean(siteConfig.availabilityStatus?.[language]?.trim()) ||
          Boolean(siteConfig.location?.[language]?.trim())) && (
          <div className="flex flex-wrap items-center gap-3 text-center sm:text-start">
            {Boolean(siteConfig.availabilityStatus?.[language]?.trim()) && (
              <>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#171717]">
                  {siteConfig.availabilityStatus[language]}
                </span>
              </>
            )}
            {Boolean(siteConfig.availabilityStatus?.[language]?.trim()) &&
              Boolean(siteConfig.location?.[language]?.trim()) && (
                <span className="text-[#9E9A95] hidden sm:inline">•</span>
              )}
            {Boolean(siteConfig.location?.[language]?.trim()) && (
              <div className="flex items-center gap-1.5 text-xs text-[#77736F]">
                <MapPin className="w-3.5 h-3.5 text-[#B49A7A]" />
                <span>{siteConfig.location[language]}</span>
              </div>
            )}
          </div>
        )}

        {/* Right: Primary Instagram Button & Quick Email Action */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Quick Email Copy button */}
          <button
            id="bottom-bar-copy-email"
            onClick={copyEmail}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#F7F5F2] hover:bg-[#E5E1D8] text-[#171717] text-xs font-medium border border-[#171717]/8 transition-colors cursor-pointer"
            aria-label="Copy Email"
          >
            <Mail className="w-3.5 h-3.5 text-[#77736F]" />
            <span className="font-mono">{siteConfig.email}</span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-600" />
            ) : (
              <Copy className="w-3 h-3 opacity-50" />
            )}
          </button>

          {/* Primary Action Button: CONTACT ME ON INSTAGRAM */}
          <a
            id="bottom-bar-instagram-cta"
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-xs font-semibold tracking-wider transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A]"
          >
            <Instagram className="w-4 h-4 transition-transform duration-300 group-hover:rotate-6" />
            <span>{t.bottomBar.ctaInstagram}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
