import React, { useEffect, useState } from 'react';
import { Project, Language } from '../types';
import { translations } from '../data/translations';
import { usePortfolio } from '../context/PortfolioContext';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Share2,
  Check,
  Calendar,
  User,
  Briefcase,
  Layers,
  Sparkles,
  Maximize2,
  X,
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface ProjectDetailProps {
  project: Project;
  allProjects: Project[];
  language: Language;
  onBack: () => void;
  onSelectProject: (slug: string) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  allProjects,
  language,
  onBack,
  onSelectProject,
}) => {
  const { siteConfig } = usePortfolio();
  const t = translations[language];
  const [copied, setCopied] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Scroll to top when project loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.slug]);

  // Handle previous and next navigation
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft;
  const NextArrow = language === 'ar' ? ArrowLeft : ArrowRight;
  const PrevArrow = language === 'ar' ? ArrowRight : ArrowLeft;

  const projectTitle = language === 'ar' ? project.titleAr : project.titleEn;
  const projectCategory = language === 'ar' ? project.categoryAr : project.categoryEn;
  const projectDesc = language === 'ar' ? project.descriptionAr : project.descriptionEn;
  const projectRole = language === 'ar' ? project.roleAr : project.roleEn;
  const projectClient = language === 'ar' ? project.clientAr : project.clientEn;
  const projectChallenge = language === 'ar' ? project.challengeAr : project.challengeEn;
  const projectDirection = language === 'ar' ? project.directionAr : project.directionEn;
  const projectResult = language === 'ar' ? project.resultAr : project.resultEn;

  return (
    <article
      id="project-detail-view"
      className="pt-28 md:pt-36 pb-24 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 animate-in fade-in duration-300"
    >
      {/* Top Header / Navigation Controls */}
      <div className="flex items-center justify-between gap-4 pb-8 mb-8 border-b border-[#171717]/8">
        <button
          id="back-to-portfolio-btn"
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-sm font-medium text-[#77736F] hover:text-[#171717] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A] rounded-md px-1 py-0.5 cursor-pointer"
        >
          <BackArrow className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>{t.projectDetail.backToWork}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            id="share-project-btn"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#EFECE7] hover:bg-[#E5E1D8] text-[#171717] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A]"
            aria-label={t.projectDetail.shareProject}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">{t.projectDetail.copiedLink}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#77736F]" />
                <span>{t.projectDetail.shareProject}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Project Title & Classification Header */}
      <div className="space-y-6 pb-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 rounded-full bg-[#171717] text-[#F7F5F2] text-xs font-semibold tracking-wider uppercase">
            {projectCategory}
          </span>
          <span className="text-xs font-mono text-[#77736F] px-2.5 py-1 rounded-full bg-[#EFECE7]">
            {project.year}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#171717] tracking-tight leading-[1.15]">
          {projectTitle}
        </h1>

        <p className="text-lg sm:text-xl text-[#77736F] max-w-3xl leading-relaxed font-normal">
          {projectDesc}
        </p>
      </div>

      {/* Primary Project Metadata Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 px-6 sm:px-8 rounded-2xl bg-[#EFECE7]/80 border border-[#171717]/6 mb-12">
        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-widest text-[#77736F] font-medium flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-[#B49A7A]" />
            {t.projectDetail.role}
          </span>
          <p className="text-sm font-semibold text-[#171717]">{projectRole}</p>
        </div>

        {projectClient && (
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-[#77736F] font-medium flex items-center gap-1.5">
              <User className="w-3 h-3 text-[#B49A7A]" />
              {t.projectDetail.client}
            </span>
            <p className="text-sm font-semibold text-[#171717]">{projectClient}</p>
          </div>
        )}

        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-widest text-[#77736F] font-medium flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-[#B49A7A]" />
            {t.projectDetail.year}
          </span>
          <p className="text-sm font-semibold text-[#171717]">{project.year}</p>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-widest text-[#77736F] font-medium flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#B49A7A]" />
            {language === 'ar' ? 'التصنيف' : 'Category'}
          </span>
          <p className="text-sm font-semibold text-[#171717]">{projectCategory}</p>
        </div>
      </div>

      {/* Hero Full-Bleed Cover Showcase */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-16 shadow-[0_20px_50px_-20px_rgba(23,23,23,0.12)]">
        <ImageWithFallback
          src={project.cover}
          alt={projectTitle}
          containerClassName="w-full aspect-[16/9] sm:aspect-[16/10]"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Deep Dive Case Study: Challenge vs Creative Direction */}
      {(projectChallenge || projectDirection) && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-8 mb-16 border-y border-[#171717]/8">
          {projectChallenge && (
            <div className="md:col-span-6 space-y-3">
              <span className="text-[11px] uppercase tracking-widest text-[#B49A7A] font-bold">
                01 / {t.projectDetail.challenge}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#171717]">
                {language === 'ar' ? 'العقبات والمتطلبات' : 'Context & Strategic Hurdles'}
              </h3>
              <p className="text-sm sm:text-base text-[#77736F] leading-relaxed">
                {projectChallenge}
              </p>
            </div>
          )}

          {projectDirection && (
            <div className="md:col-span-6 space-y-3">
              <span className="text-[11px] uppercase tracking-widest text-[#B49A7A] font-bold">
                02 / {t.projectDetail.creativeDirection}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#171717]">
                {language === 'ar' ? 'الرؤية والحل الإبداعي' : 'Artistic Concept & Execution'}
              </h3>
              <p className="text-sm sm:text-base text-[#77736F] leading-relaxed">
                {projectDirection}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Curated Project Gallery */}
      {project.images && project.images.length > 0 && (
        <div className="space-y-8 mb-16">
          <div className="flex items-baseline justify-between border-b border-[#171717]/8 pb-4">
            <h3 className="text-2xl font-semibold text-[#171717]">
              {t.projectDetail.gallery}
            </h3>
            <span className="text-xs text-[#77736F] font-mono">
              01 — 0{project.images.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.images.map((img, i) => {
              const caption = language === 'ar' ? img.captionAr : img.captionEn;
              return (
                <div
                  key={i}
                  className={`group relative flex flex-col space-y-3 ${
                    i === 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  <div
                    onClick={() => setLightboxImage(img.url)}
                    className="relative rounded-2xl overflow-hidden cursor-pointer bg-[#EFECE7]"
                  >
                    <ImageWithFallback
                      src={img.url}
                      alt={caption || `${projectTitle} - image ${i + 1}`}
                      containerClassName={`w-full ${
                        i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                      }`}
                      className="transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-[#171717]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-3 rounded-full bg-[#171717]/80 text-[#F7F5F2] backdrop-blur-xs">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {caption && (
                    <p className="text-xs text-[#77736F] px-1 italic">
                      — {caption}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Impact & Result Card */}
      {projectResult && (
        <div className="p-8 sm:p-10 rounded-3xl bg-[#171717] text-[#F7F5F2] mb-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#B49A7A] font-bold">
              03 / {t.projectDetail.finalResult}
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F7F5F2]">
              {language === 'ar' ? 'الأثر والقيمة المحققة' : 'Measurable Impact & Resonance'}
            </h3>
            <p className="text-base text-[#F7F5F2]/80 leading-relaxed font-normal">
              {projectResult}
            </p>
          </div>
          {/* Subtle decorative watermark */}
          <div className="absolute -end-8 -bottom-8 w-48 h-48 rounded-full border border-[#B49A7A]/20 pointer-events-none" />
        </div>
      )}

      {/* Bottom Commission CTA */}
      <div className="p-8 rounded-2xl bg-[#EFECE7]/60 border border-[#171717]/6 mb-16 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
        <div>
          <h4 className="text-lg font-semibold text-[#171717]">
            {language === 'ar'
              ? 'هل ترغب في هوية بصرية متميزة لمشروعك القادم؟'
              : 'Interested in a bespoke visual identity like this?'}
          </h4>
          <p className="text-xs text-[#77736F] mt-1">
            {language === 'ar'
              ? 'أنا متاحة للتعاقد والمشاريع الإبداعية المختارة.'
              : 'Currently accepting select branding & creative direction commissions.'}
          </p>
        </div>

        <a
          id="project-inquire-instagram"
          href={`${siteConfig.socials.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-xs font-semibold transition-colors flex items-center gap-2 shrink-0"
        >
          <span>{t.contactCTA.button}</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Next & Previous Project Navigation Footer */}
      <nav
        id="project-pagination-nav"
        className="pt-8 border-t border-[#171717]/10 grid grid-cols-1 sm:grid-cols-2 gap-6"
        aria-label="Project Pagination"
      >
        <button
          onClick={() => onSelectProject(prevProject.slug)}
          className="group flex flex-col p-5 rounded-2xl bg-[#EFECE7]/40 hover:bg-[#EFECE7] border border-[#171717]/6 text-start transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 text-xs text-[#77736F] mb-1 font-medium">
            <PrevArrow className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>{t.projectDetail.prevProject}</span>
          </div>
          <span className="text-base font-semibold text-[#171717] group-hover:text-[#B49A7A] transition-colors">
            {language === 'ar' ? prevProject.titleAr : prevProject.titleEn}
          </span>
        </button>

        <button
          onClick={() => onSelectProject(nextProject.slug)}
          className="group flex flex-col items-start sm:items-end p-5 rounded-2xl bg-[#EFECE7]/40 hover:bg-[#EFECE7] border border-[#171717]/6 text-start sm:text-end transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 text-xs text-[#77736F] mb-1 font-medium">
            <span>{t.projectDetail.nextProject}</span>
            <NextArrow className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
          <span className="text-base font-semibold text-[#171717] group-hover:text-[#B49A7A] transition-colors">
            {language === 'ar' ? nextProject.titleAr : nextProject.titleEn}
          </span>
        </button>
      </nav>

      {/* Simple Image Lightbox */}
      {lightboxImage && (
        <div
          id="gallery-lightbox"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-[#171717]/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 end-6 p-3 rounded-full bg-[#F7F5F2]/10 text-[#F7F5F2] hover:bg-[#F7F5F2]/20 transition-colors"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Expanded showcase"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </article>
  );
};
