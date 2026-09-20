import React from 'react';
import { Language } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

interface LogoProps {
  language: Language;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ language, className = '', onClick }) => {
  const { siteConfig } = usePortfolio();
  const logoConfig = siteConfig.logo;
  const mode = logoConfig?.mode || 'monogram';

  // Dynamic monogram initial or custom text
  const currentName = siteConfig.designerName?.[language] || 'Nouran';
  const customMonogram = logoConfig?.monogramText?.trim();
  const monogramDisplay = customMonogram || currentName.trim().charAt(0).toUpperCase() || 'N';

  // Monogram Shape
  const shapeClass =
    logoConfig?.monogramShape === 'circle'
      ? 'rounded-full'
      : logoConfig?.monogramShape === 'square'
      ? 'rounded-none'
      : 'rounded-[9px]';

  // Tagline text
  const tagline =
    language === 'ar'
      ? logoConfig?.customTaglineAr || siteConfig.title?.ar || 'تصميم وإدارة إبداعية'
      : logoConfig?.customTaglineEn || siteConfig.title?.en || 'Visual & Creative Direction';

  return (
    <button
      id="brand-logo-btn"
      onClick={onClick}
      className={`group flex items-center gap-3 text-start cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A] rounded-lg p-1 transition-opacity hover:opacity-85 ${className}`}
      aria-label="Home"
    >
      {/* 1. Image Mode */}
      {mode === 'image' && logoConfig?.imageUrl ? (
        <div className="relative flex items-center justify-center shrink-0">
          <img
            src={logoConfig.imageUrl}
            alt={siteConfig.designerName[language]}
            style={{ height: `${logoConfig.imageHeight || 36}px` }}
            className="w-auto object-contain max-w-[160px] select-none transition-transform duration-300 group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : null}

      {/* 2. Monogram Mode */}
      {mode === 'monogram' ? (
        <div
          className={`relative w-9 h-9 ${shapeClass} bg-[#171717] text-[#F7F5F2] flex items-center justify-center font-bold tracking-tight shadow-sm overflow-hidden transition-transform duration-300 group-hover:scale-[1.03] shrink-0`}
        >
          <span className="font-editorial text-lg tracking-normal select-none">
            {monogramDisplay}
          </span>
          {/* Subtle gold accent dot */}
          {logoConfig?.showAccentDot !== false && (
            <span className="absolute bottom-1.5 end-1.5 w-1.5 h-1.5 rounded-full bg-[#B49A7A]" />
          )}
        </div>
      ) : null}

      {/* 3. Designer Name & Tagline (if not hidden) */}
      <div className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold text-[#171717] tracking-tight">
          {siteConfig.designerName[language]}
        </span>
        {!logoConfig?.hideTagline && (
          <span className="text-[11px] text-[#77736F] font-normal tracking-wide mt-1 uppercase">
            {tagline}
          </span>
        )}
      </div>
    </button>
  );
};

