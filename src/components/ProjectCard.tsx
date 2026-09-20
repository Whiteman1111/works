import React from 'react';
import { Project, Language } from '../types';
import { translations } from '../data/translations';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface ProjectCardProps {
  project: Project;
  language: Language;
  index: number;
  onSelectProject: (slug: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  language,
  index,
  onSelectProject,
}) => {
  const t = translations[language];

  // Editorial grid layout rhythm:
  // Item 0: Wide hero card spanning 2 columns
  // Item 1 & 2: Asymmetrical vertical and portrait rhythm
  // Item 3: Tall format
  // Item 4 & 5: Balanced editorial duo
  const isWide = index === 0;
  const isAltTall = index === 1;

  return (
    <article
      id={`project-card-${project.slug}`}
      onClick={() => onSelectProject(project.slug)}
      className={`group cursor-pointer flex flex-col justify-between transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A] rounded-2xl ${
        isWide ? 'md:col-span-12 lg:col-span-8' : isAltTall ? 'md:col-span-6 lg:col-span-4' : 'md:col-span-6 lg:col-span-6'
      }`}
      tabIndex={0}
      role="button"
      aria-label={`${language === 'ar' ? project.titleAr : project.titleEn} - ${t.portfolio.viewProject}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectProject(project.slug);
        }
      }}
    >
      {/* Visual Canvas Frame */}
      <div className="relative overflow-hidden rounded-2xl bg-[#EFECE7] border border-[#171717]/6">
        {/* Aspect ratio adapted to editorial composition */}
        <ImageWithFallback
          src={project.cover}
          alt={language === 'ar' ? project.titleAr : project.titleEn}
          containerClassName={`w-full ${
            isWide
              ? 'aspect-[16/10] sm:aspect-[16/9]'
              : isAltTall
              ? 'aspect-[4/5]'
              : 'aspect-[4/3]'
          }`}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Hover Pill Badge - View Project */}
        <div className="absolute top-4 end-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#171717]/90 text-[#F7F5F2] text-xs font-medium backdrop-blur-sm shadow-md">
          <span>{t.portfolio.viewProject}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#B49A7A]" />
        </div>

        {/* Year & Category Badge */}
        <div className="absolute bottom-4 start-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#F7F5F2]/90 backdrop-blur-md text-[11px] font-semibold text-[#171717] tracking-wider uppercase shadow-xs">
            {language === 'ar' ? project.categoryAr : project.categoryEn}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#171717]/80 backdrop-blur-md text-[11px] font-mono text-[#F7F5F2]">
            {project.year}
          </span>
        </div>
      </div>

      {/* Metadata & Title Block */}
      <div className="pt-4 pb-2 px-1 flex flex-col space-y-1.5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#171717] group-hover:text-[#B49A7A] transition-colors duration-200 tracking-tight leading-snug">
            {language === 'ar' ? project.titleAr : project.titleEn}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-[#77736F] opacity-0 group-hover:opacity-100 group-hover:text-[#B49A7A] transition-all duration-200 shrink-0 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <p className="text-sm text-[#77736F] line-clamp-2 leading-relaxed font-normal">
          {language === 'ar' ? project.descriptionAr : project.descriptionEn}
        </p>

        {project.clientEn && (
          <div className="text-[12px] text-[#9E9A95] pt-1">
            <span className="font-medium text-[#77736F] me-1">
              {language === 'ar' ? 'العميل:' : 'Client:'}
            </span>
            <span>{language === 'ar' ? project.clientAr : project.clientEn}</span>
          </div>
        )}
      </div>
    </article>
  );
};
