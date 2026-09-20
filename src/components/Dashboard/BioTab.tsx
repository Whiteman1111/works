import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { BioData } from '../../types';
import {
  FileText,
  Award,
  GraduationCap,
  Wrench,
  Users,
  Plus,
  Trash2,
  Clock,
  Sparkles,
} from 'lucide-react';

export const BioTab: React.FC = () => {
  const { siteConfig, updateSiteConfig, language } = usePortfolio();
  const bio = siteConfig.bio;

  const updateBio = (updater: Partial<BioData> | ((prev: BioData) => BioData)) => {
    updateSiteConfig((prev) => ({
      ...prev,
      bio: typeof updater === 'function' ? updater(prev.bio) : { ...prev.bio, ...updater },
    }));
  };

  // Add Tools
  const handleAddTool = () => {
    updateBio((prev) => ({
      ...prev,
      tools: [...prev.tools, { name: 'Figma', category: 'UI & Systems' }],
    }));
  };

  // Add Client
  const handleAddClient = () => {
    updateBio((prev) => ({
      ...prev,
      clients: [...prev.clients, 'New Client Co.'],
    }));
  };

  // Add Education
  const handleAddEducation = () => {
    updateBio((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degreeAr: 'درجة علمية جديدة',
          degreeEn: 'New Degree',
          institutionAr: 'اسم الجامعة أو المعهد',
          institutionEn: 'University Name',
          year: new Date().getFullYear().toString(),
        },
      ],
    }));
  };

  // Add Certificate
  const handleAddCertificate = () => {
    updateBio((prev) => ({
      ...prev,
      certificates: [
        ...prev.certificates,
        {
          titleAr: 'شهادة مهنية جديدة',
          titleEn: 'New Professional Certificate',
          issuer: 'Design Academy',
          year: new Date().getFullYear().toString(),
        },
      ],
    }));
  };

  // Add Achievement
  const handleAddAchievement = () => {
    updateBio((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        {
          titleAr: 'جائزة أو إنجاز جديد',
          titleEn: 'New Honor or Award',
          year: new Date().getFullYear().toString(),
        },
      ],
    }));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* 1. Executive Bio & Years of Experience */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#171717]/8">
          <FileText className="w-4 h-4 text-[#B49A7A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'السيرة التنفيذية وسنوات الخبرة' : 'Executive Bio & Experience Metric'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'عداد سنوات الخبرة' : 'Years of Practice Metric (e.g. 7+, 10+)'}
            </label>
            <input
              type="text"
              value={bio.yearsExperience}
              onChange={(e) => updateBio({ yearsExperience: e.target.value })}
              className="w-full sm:w-48 px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm font-semibold text-[#171717]"
              placeholder="7+"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'السيرة التنفيذية الكاملة (بالعربية)' : 'Executive Summary (Arabic)'}
            </label>
            <textarea
              rows={4}
              value={bio.summaryAr}
              onChange={(e) => updateBio({ summaryAr: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm text-[#171717]"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'السيرة التنفيذية الكاملة (بالإنجليزية)' : 'Executive Summary (English)'}
            </label>
            <textarea
              rows={4}
              value={bio.summaryEn}
              onChange={(e) => updateBio({ summaryEn: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm text-[#171717]"
              dir="ltr"
            />
          </div>
        </div>
      </section>

      {/* 2. Specializations Tags */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#171717]/8">
          <Sparkles className="w-4 h-4 text-[#B49A7A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'التخصصات ومجالات التركيز' : 'Core Specializations'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'التخصصات (بالعربية - كل تخصص في سطر)' : 'Specializations (Arabic - one per line)'}
            </label>
            <textarea
              rows={5}
              value={bio.specializationsAr.join('\n')}
              onChange={(e) =>
                updateBio({
                  specializationsAr: e.target.value.split('\n').filter(Boolean),
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm text-[#171717]"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'التخصصات (بالإنجليزية - كل تخصص في سطر)' : 'Specializations (English - one per line)'}
            </label>
            <textarea
              rows={5}
              value={bio.specializationsEn.join('\n')}
              onChange={(e) =>
                updateBio({
                  specializationsEn: e.target.value.split('\n').filter(Boolean),
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm text-[#171717]"
              dir="ltr"
            />
          </div>
        </div>
      </section>

      {/* 3. Software Tools & Technologies */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#171717]/8">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#B49A7A]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
              {language === 'ar' ? 'الأدوات والبرمجيات الاحترافية' : 'Software & Design Tools'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleAddTool}
            className="flex items-center gap-1 text-xs font-medium text-[#B49A7A] hover:underline cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إضافة أداة' : 'Add Tool'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {bio.tools.map((tool, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#EFECE7]/60 border border-[#171717]/8 flex items-center justify-between gap-2"
            >
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={tool.name}
                  onChange={(e) => {
                    const updated = [...bio.tools];
                    updated[idx].name = e.target.value;
                    updateBio({ tools: updated });
                  }}
                  className="w-full px-2 py-1 rounded bg-[#F7F5F2] border border-[#171717]/10 text-xs font-semibold text-[#171717]"
                  placeholder="Tool Name"
                />
                <input
                  type="text"
                  value={tool.category}
                  onChange={(e) => {
                    const updated = [...bio.tools];
                    updated[idx].category = e.target.value;
                    updateBio({ tools: updated });
                  }}
                  className="w-full px-2 py-0.5 rounded bg-[#F7F5F2] border border-[#171717]/10 text-[11px] text-[#77736F]"
                  placeholder="Category (e.g. Branding)"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  updateBio({ tools: bio.tools.filter((_, i) => i !== idx) });
                }}
                className="text-red-500 hover:text-red-700 p-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Notable Clients */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#171717]/8">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#B49A7A]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
              {language === 'ar' ? 'قائمة العملاء المختارين' : 'Selected Clients & Brands'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleAddClient}
            className="flex items-center gap-1 text-xs font-medium text-[#B49A7A] hover:underline cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إضافة عميل' : 'Add Client'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {bio.clients.map((client, idx) => (
            <div
              key={idx}
              className="p-2 rounded-xl bg-[#EFECE7]/60 border border-[#171717]/8 flex items-center justify-between gap-2"
            >
              <input
                type="text"
                value={client}
                onChange={(e) => {
                  const updated = [...bio.clients];
                  updated[idx] = e.target.value;
                  updateBio({ clients: updated });
                }}
                className="w-full px-2 py-1 rounded bg-[#F7F5F2] border border-[#171717]/10 text-xs font-medium text-[#171717]"
                placeholder="Client Name"
              />
              <button
                type="button"
                onClick={() => {
                  updateBio({ clients: bio.clients.filter((_, i) => i !== idx) });
                }}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Education */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#171717]/8">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#B49A7A]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
              {language === 'ar' ? 'التعليم والمؤهلات الأكاديمية' : 'Education & Academic Degrees'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleAddEducation}
            className="flex items-center gap-1 text-xs font-medium text-[#B49A7A] hover:underline cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إضافة مؤهل' : 'Add Degree'}</span>
          </button>
        </div>

        <div className="space-y-3">
          {bio.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#EFECE7]/60 border border-[#171717]/8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center"
            >
              <input
                type="text"
                value={edu.degreeAr}
                onChange={(e) => {
                  const updated = [...bio.education];
                  updated[idx].degreeAr = e.target.value;
                  updateBio({ education: updated });
                }}
                placeholder="الدرجة (عربي)"
                className="px-3 py-1.5 rounded-lg bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                dir="rtl"
              />
              <input
                type="text"
                value={edu.degreeEn}
                onChange={(e) => {
                  const updated = [...bio.education];
                  updated[idx].degreeEn = e.target.value;
                  updateBio({ education: updated });
                }}
                placeholder="Degree (English)"
                className="px-3 py-1.5 rounded-lg bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                dir="ltr"
              />
              <input
                type="text"
                value={edu.institutionAr}
                onChange={(e) => {
                  const updated = [...bio.education];
                  updated[idx].institutionAr = e.target.value;
                  updateBio({ education: updated });
                }}
                placeholder="المؤسسة (عربي)"
                className="px-3 py-1.5 rounded-lg bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                dir="rtl"
              />
              <input
                type="text"
                value={edu.institutionEn}
                onChange={(e) => {
                  const updated = [...bio.education];
                  updated[idx].institutionEn = e.target.value;
                  updateBio({ education: updated });
                }}
                placeholder="Institution (English)"
                className="px-3 py-1.5 rounded-lg bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                dir="ltr"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => {
                    const updated = [...bio.education];
                    updated[idx].year = e.target.value;
                    updateBio({ education: updated });
                  }}
                  placeholder="2021"
                  className="w-20 px-2 py-1.5 rounded-lg bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                />
                <button
                  type="button"
                  onClick={() => {
                    updateBio({ education: bio.education.filter((_, i) => i !== idx) });
                  }}
                  className="text-red-500 hover:text-red-700 p-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Awards & Achievements */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#171717]/8">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#B49A7A]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
              {language === 'ar' ? 'الجوائز والتكريمات والترشيحات' : 'Awards & Recognitions'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleAddAchievement}
            className="flex items-center gap-1 text-xs font-medium text-[#B49A7A] hover:underline cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إضافة جائزة' : 'Add Award'}</span>
          </button>
        </div>

        <div className="space-y-3">
          {bio.achievements.map((ach, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#EFECE7]/60 border border-[#171717]/8 flex flex-col sm:flex-row gap-3 items-center"
            >
              <input
                type="text"
                value={ach.titleAr}
                onChange={(e) => {
                  const updated = [...bio.achievements];
                  updated[idx].titleAr = e.target.value;
                  updateBio({ achievements: updated });
                }}
                placeholder="عنوان الجائزة (عربي)"
                className="flex-1 w-full px-3 py-1.5 rounded-lg bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                dir="rtl"
              />
              <input
                type="text"
                value={ach.titleEn}
                onChange={(e) => {
                  const updated = [...bio.achievements];
                  updated[idx].titleEn = e.target.value;
                  updateBio({ achievements: updated });
                }}
                placeholder="Award Title (English)"
                className="flex-1 w-full px-3 py-1.5 rounded-lg bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                dir="ltr"
              />
              <input
                type="text"
                value={ach.year}
                onChange={(e) => {
                  const updated = [...bio.achievements];
                  updated[idx].year = e.target.value;
                  updateBio({ achievements: updated });
                }}
                placeholder="2024"
                className="w-20 px-2 py-1.5 rounded-lg bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
              />
              <button
                type="button"
                onClick={() => {
                  updateBio({ achievements: bio.achievements.filter((_, i) => i !== idx) });
                }}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
