import React, { useState, useMemo } from 'react';
import { Project, Language } from '../types';
import { translations } from '../data/translations';
import { ProjectCard } from './ProjectCard';
import { Sparkles, Layers } from 'lucide-react';

interface PortfolioProps {
  projects: Project[];
  language: Language;
  onSelectProject: (slug: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  projects,
  language,
  onSelectProject,
}) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories in current language
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      set.add(language === 'ar' ? p.categoryAr : p.categoryEn);
    });
    return Array.from(set);
  }, [projects, language]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter((p) => {
      const cat = language === 'ar' ? p.categoryAr : p.categoryEn;
      return cat === selectedCategory;
    });
  }, [projects, selectedCategory, language]);

  return (
    <section
      id="work"
      className="py-16 md:py-28 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 scroll-mt-20"
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 md:pb-14 border-b border-[#171717]/8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B49A7A]" />
            <span className="text-[12px] uppercase tracking-widest text-[#77736F] font-semibold">
              {t.portfolio.eyebrow}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#171717] tracking-tight">
            {t.portfolio.title}
          </h2>
        </div>

        {/* Filter Chips / Categories */}
        {projects.length > 0 && (
          <div
            className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Filter Projects"
          >
            <button
              id="filter-all"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A] ${
                selectedCategory === 'all'
                  ? 'bg-[#171717] text-[#F7F5F2] shadow-sm'
                  : 'bg-[#EFECE7] text-[#77736F] hover:text-[#171717] hover:bg-[#E5E1D8]'
              }`}
            >
              {t.portfolio.allFilter}
              <span className="ms-1.5 text-[10px] opacity-70">({projects.length})</span>
            </button>

            {categories.map((cat) => {
              const count = projects.filter((p) =>
                language === 'ar' ? p.categoryAr === cat : p.categoryEn === cat
              ).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  id={`filter-${cat}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A7A] ${
                    isSelected
                      ? 'bg-[#171717] text-[#F7F5F2] shadow-sm'
                      : 'bg-[#EFECE7] text-[#77736F] hover:text-[#171717] hover:bg-[#E5E1D8]'
                  }`}
                >
                  {cat}
                  <span className="ms-1.5 text-[10px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Projects Grid or Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-[#EFECE7]/60 border border-[#171717]/6 mt-8">
          <Layers className="w-10 h-10 text-[#B49A7A] mb-4 stroke-1" />
          <h3 className="text-xl font-semibold text-[#171717] mb-2">
            {t.portfolio.emptyTitle}
          </h3>
          <p className="text-sm text-[#77736F] max-w-md mb-6">
            {t.portfolio.emptySubtitle}
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-5 py-2.5 rounded-full bg-[#171717] text-[#F7F5F2] text-xs font-medium hover:bg-[#B49A7A] transition-colors"
          >
            {t.portfolio.allFilter}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 mt-10 md:mt-14">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              language={language}
              index={index}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>
      )}
    </section>
  );
};
