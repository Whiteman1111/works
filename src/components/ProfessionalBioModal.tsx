import React, { useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Briefcase,
  Award,
  GraduationCap,
  Wrench,
  Users,
  Sparkles,
  ArrowUpRight,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface ProfessionalBioModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ProfessionalBioModal: React.FC<ProfessionalBioModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const { siteConfig } = usePortfolio();
  const t = translations[language];
  const bio = siteConfig.bio;

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const specializations = language === 'ar' ? bio.specializationsAr : bio.specializationsEn;
  const summary = language === 'ar' ? bio.summaryAr : bio.summaryEn;

  return (
    <div
      id="professional-bio-modal"
      className="fixed inset-0 z-50 flex justify-end bg-[#171717]/60 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bio-drawer-title"
    >
      {/* Backdrop overlay dismiss click */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-2xl bg-[#F7F5F2] h-full shadow-2xl flex flex-col overflow-y-auto border-s border-[#171717]/10 z-10 animate-in slide-in-from-right duration-300">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#F7F5F2]/95 backdrop-blur-md px-6 sm:px-10 py-6 border-b border-[#171717]/8 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#171717] text-[#F7F5F2] flex items-center justify-center font-bold text-sm">
              <Sparkles className="w-4 h-4 text-[#B49A7A]" />
            </div>
            <div>
              <h2 id="bio-drawer-title" className="text-lg font-semibold text-[#171717]">
                {t.bioModal.title}
              </h2>
              <p className="text-xs text-[#77736F]">
                {siteConfig.designerName[language]} • {siteConfig.title[language]}
              </p>
            </div>
          </div>

          <button
            id="close-bio-drawer-btn"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#EFECE7] hover:bg-[#171717] text-[#171717] hover:text-[#F7F5F2] flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A]"
            aria-label={t.bioModal.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Content */}
        <div className="p-6 sm:p-10 space-y-10 flex-1">
          {/* Summary & Years Experience Highlight */}
          <section className="space-y-4">
            <div className="flex items-center justify-between p-5 rounded-2xl bg-[#EFECE7] border border-[#171717]/6">
              <div className="space-y-0.5">
                <span className="text-[11px] uppercase tracking-widest text-[#77736F] font-semibold">
                  {t.bioModal.yearsOfExperience}
                </span>
                <p className="text-2xl sm:text-3xl font-bold text-[#171717] font-mono">
                  {bio.yearsExperience} {language === 'ar' ? 'سنوات' : 'Years'}
                </p>
              </div>

              <div className="h-10 w-10 rounded-full bg-[#171717] text-[#B49A7A] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            {summary && (
              <p className="text-sm sm:text-base text-[#171717] leading-relaxed">
                {summary}
              </p>
            )}
          </section>

          {/* Specializations */}
          {specializations && specializations.length > 0 && (
            <section className="space-y-4 border-t border-[#171717]/8 pt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#B49A7A]" />
                <span>{t.bioModal.specializations}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {specializations.map((spec, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#EFECE7]/60 border border-[#171717]/4 text-xs font-medium text-[#171717] flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B49A7A] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tools & Software */}
          {bio.tools && bio.tools.length > 0 && (
            <section className="space-y-4 border-t border-[#171717]/8 pt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717] flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#B49A7A]" />
                <span>{t.bioModal.toolsAndSoftware}</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {bio.tools.map((tool, i) => (
                  <div
                    key={i}
                    className="px-3.5 py-2 rounded-xl bg-[#EFECE7] border border-[#171717]/6 flex items-center gap-2 text-xs"
                  >
                    <span className="font-semibold text-[#171717]">{tool.name}</span>
                    <span className="text-[10px] text-[#77736F] px-1.5 py-0.5 rounded-md bg-[#F7F5F2]">
                      {tool.category}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Selected Clients */}
          {bio.clients && bio.clients.length > 0 && (
            <section className="space-y-4 border-t border-[#171717]/8 pt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#B49A7A]" />
                <span>{t.bioModal.selectedClients}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {bio.clients.map((client, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#EFECE7]/50 border border-[#171717]/6 text-center text-xs font-medium text-[#171717]"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {bio.education && bio.education.length > 0 && (
            <section className="space-y-4 border-t border-[#171717]/8 pt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717] flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#B49A7A]" />
                <span>{t.bioModal.education}</span>
              </h3>

              <div className="space-y-3">
                {bio.education.map((edu, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#EFECE7]/60 border border-[#171717]/6 flex flex-col space-y-1 text-start"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-[#171717]">
                        {language === 'ar' ? edu.degreeAr : edu.degreeEn}
                      </h4>
                      <span className="text-xs font-mono text-[#77736F]">{edu.year}</span>
                    </div>
                    <p className="text-xs text-[#77736F]">
                      {language === 'ar' ? edu.institutionAr : edu.institutionEn}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications & Achievements */}
          {(bio.certificates?.length > 0 || bio.achievements?.length > 0) && (
            <section className="space-y-6 border-t border-[#171717]/8 pt-8">
              {bio.achievements?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#B49A7A]" />
                    <span>{t.bioModal.achievements}</span>
                  </h3>

                  <div className="space-y-2.5">
                    {bio.achievements.map((item, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-[#EFECE7]/60 border border-[#171717]/6 flex items-baseline justify-between gap-4 text-xs"
                      >
                        <span className="font-medium text-[#171717]">
                          {language === 'ar' ? item.titleAr : item.titleEn}
                        </span>
                        <span className="text-[11px] font-mono text-[#B49A7A] shrink-0">
                          {item.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {bio.certificates?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#B49A7A]" />
                    <span>{t.bioModal.certifications}</span>
                  </h3>

                  <div className="space-y-2.5">
                    {bio.certificates.map((cert, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-[#EFECE7]/60 border border-[#171717]/6 flex items-baseline justify-between gap-4 text-xs"
                      >
                        <div className="space-y-0.5">
                          <p className="font-medium text-[#171717]">
                            {language === 'ar' ? cert.titleAr : cert.titleEn}
                          </p>
                          <p className="text-[11px] text-[#77736F]">{cert.issuer}</p>
                        </div>
                        <span className="text-[11px] font-mono text-[#77736F] shrink-0">
                          {cert.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>

        {/* Bottom Action Footer */}
        <div className="sticky bottom-0 bg-[#F7F5F2] px-6 sm:px-10 py-5 border-t border-[#171717]/10 flex items-center justify-between gap-4 z-20">
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 rounded-full bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <span>{t.bioModal.contactAction}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <button
            onClick={onClose}
            className="px-6 py-3.5 rounded-full bg-[#EFECE7] hover:bg-[#E5E1D8] text-[#171717] text-xs font-medium transition-colors cursor-pointer"
          >
            {t.bioModal.close}
          </button>
        </div>
      </div>
    </div>
  );
};
