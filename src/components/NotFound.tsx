import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';

interface NotFoundProps {
  language: Language;
  onBackHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ language, onBackHome }) => {
  const t = translations[language];
  const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div
      id="not-found-screen"
      className="min-h-[80vh] flex items-center justify-center py-20 px-5 sm:px-8 text-center"
    >
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#EFECE7] text-[#B49A7A] flex items-center justify-center mx-auto shadow-sm">
          <Compass className="w-8 h-8 stroke-1" />
        </div>

        <span className="text-5xl sm:text-6xl font-serif font-bold text-[#171717] block">
          {t.notFound.code}
        </span>

        <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] tracking-tight">
          {t.notFound.title}
        </h1>

        <p className="text-sm text-[#77736F] leading-relaxed">
          {t.notFound.desc}
        </p>

        <div className="pt-4">
          <button
            id="not-found-back-home-btn"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-sm font-medium transition-colors shadow-sm cursor-pointer"
          >
            <BackArrow className="w-4 h-4" />
            <span>{t.notFound.backHome}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
