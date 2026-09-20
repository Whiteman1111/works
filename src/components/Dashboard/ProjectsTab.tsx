import React, { useState } from 'react';
import { Project, Language } from '../../types';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImageWithFallback } from '../ImageWithFallback';
import { ProjectEditModal } from './ProjectEditModal';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Layers,
  Eye,
  ExternalLink,
} from 'lucide-react';

export const ProjectsTab: React.FC = () => {
  const { projects, saveProject, deleteProject, reorderProjects, language } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter projects by search
  const filteredProjects = projects.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      p.titleAr.toLowerCase().includes(q) ||
      p.titleEn.toLowerCase().includes(q) ||
      p.categoryAr.toLowerCase().includes(q) ||
      p.categoryEn.toLowerCase().includes(q)
    );
  });

  const handleOpenNew = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    const confirmMessage =
      language === 'ar'
        ? `هل أنتِ متأكدة من حذف المشروع "${title}" نهائياً من المعرض؟`
        : `Are you sure you want to permanently remove "${title}"?`;
    if (window.confirm(confirmMessage)) {
      deleteProject(id);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      reorderProjects(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < projects.length - 1) {
      reorderProjects(index, index + 1);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Bar: Count, Search & Add Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-[#171717]/8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#171717] text-[#F7F5F2] flex items-center justify-center">
            <Layers className="w-4 h-4 text-[#B49A7A]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
              {language === 'ar'
                ? `إدارة معرض المشاريع (${projects.length})`
                : `Portfolio Projects (${projects.length})`}
            </h3>
            <p className="text-xs text-[#77736F]">
              {language === 'ar'
                ? 'أضيفي وعدّلي ورتبي مشاريعك ودراسات الحالة الحقيقية'
                : 'Manage, reorder, and refine your authentic case studies'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute start-3 top-1/2 -translate-y-1/2 text-[#77736F]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? 'بحث في المشاريع...' : 'Search projects...'}
              className="w-full ps-9 pe-3 py-2 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
            />
          </div>

          {/* Add Project CTA */}
          <button
            type="button"
            onClick={handleOpenNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-xs font-semibold transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ar' ? 'إضافة مشروع' : 'Add Project'}</span>
          </button>
        </div>
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-[#171717]/10 rounded-2xl p-6 bg-[#EFECE7]/30">
          <Layers className="w-10 h-10 text-[#B49A7A] mx-auto mb-3" />
          <p className="text-sm font-medium text-[#171717]">
            {language === 'ar' ? 'لا توجد مشاريع مطابقة للبحث' : 'No matching projects found'}
          </p>
          <button
            type="button"
            onClick={handleOpenNew}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171717] text-[#F7F5F2] text-xs font-medium cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إنشاء مشروع جديد' : 'Create New Project'}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProjects.map((project, index) => {
            const rawIndex = projects.findIndex((p) => p.id === project.id);
            const title = language === 'ar' ? project.titleAr : project.titleEn;
            const category = language === 'ar' ? project.categoryAr : project.categoryEn;

            return (
              <div
                key={project.id}
                className="group p-3.5 sm:p-4 rounded-2xl bg-[#EFECE7]/60 hover:bg-[#EFECE7] border border-[#171717]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 shadow-[0_2px_8px_-4px_rgba(23,23,23,0.03)]"
              >
                {/* Thumbnail & Info */}
                <div className="flex items-center gap-4 min-w-0">
                  {/* Reorder Buttons (Visible when not filtering) */}
                  {!searchQuery && (
                    <div className="flex flex-col gap-0.5 shrink-0 text-[#77736F]">
                      <button
                        type="button"
                        onClick={() => handleMoveUp(rawIndex)}
                        disabled={rawIndex === 0}
                        title={language === 'ar' ? 'تحريك لأعلى' : 'Move Up'}
                        className="p-1 rounded hover:bg-[#171717]/10 disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(rawIndex)}
                        disabled={rawIndex === projects.length - 1}
                        title={language === 'ar' ? 'تحريك لأسفل' : 'Move Down'}
                        className="p-1 rounded hover:bg-[#171717]/10 disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Cover Thumb */}
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-[#F7F5F2] shrink-0 border border-[#171717]/10">
                    <ImageWithFallback
                      src={project.cover}
                      alt={title}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title & Category */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-[#171717] truncate">
                        {title}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#171717]/6 text-[#77736F] font-mono shrink-0">
                        {project.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[#77736F]">
                      <span>{category}</span>
                      <span>•</span>
                      <span className="text-[11px]">
                        {language === 'ar'
                          ? `${project.images.length} صور إضافية`
                          : `${project.images.length} gallery items`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <a
                    href={`#/work/${project.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={language === 'ar' ? 'معاينة المشروع' : 'Preview Case Study'}
                    className="p-2 rounded-xl bg-[#F7F5F2] hover:bg-[#171717] text-[#77736F] hover:text-[#F7F5F2] transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(project)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-xs font-medium transition-colors cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'تعديل' : 'Edit'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(project.id, title)}
                    className="p-2 rounded-xl bg-[#F7F5F2] hover:bg-red-600 text-[#77736F] hover:text-white transition-colors cursor-pointer"
                    title={language === 'ar' ? 'حذف المشروع' : 'Delete'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit / Add Modal */}
      <ProjectEditModal
        isOpen={isModalOpen}
        project={editingProject}
        onClose={() => setIsModalOpen(false)}
        onSave={saveProject}
        language={language}
      />
    </div>
  );
};
