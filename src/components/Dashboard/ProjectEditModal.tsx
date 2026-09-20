import React, { useState, useEffect, useRef } from 'react';
import { Project, Language } from '../../types';
import { ImageWithFallback } from '../ImageWithFallback';
import { ImageUploadZone } from './ImageUploadZone';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  X,
  Save,
  Plus,
  Trash2,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Calendar,
  User,
  ArrowUpRight,
  Upload,
} from 'lucide-react';

interface ProjectEditModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  language: Language;
}

const CATEGORY_PRESETS = [
  { ar: 'هوية بصرية', en: 'Brand Identity' },
  { ar: 'توجيه إبداعي', en: 'Creative Direction' },
  { ar: 'تصميم التغليف', en: 'Packaging Design' },
  { ar: 'تصميم تحريري', en: 'Editorial Design' },
  { ar: 'محتوى رقمي وشبكات', en: 'Social Media' },
  { ar: 'واجهات رقمية', en: 'UI & Digital' },
];

const DEFAULT_NEW_PROJECT: Project = {
  id: '',
  slug: '',
  titleAr: '',
  titleEn: '',
  categoryAr: 'هوية بصرية',
  categoryEn: 'Brand Identity',
  year: new Date().getFullYear().toString(),
  cover: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
  aspectRatio: 'landscape',
  images: [],
  descriptionAr: '',
  descriptionEn: '',
  roleAr: 'هوية بصرية وتصميم إبداعي',
  roleEn: 'Brand Identity & Creative Direction',
  clientAr: '',
  clientEn: '',
  challengeAr: '',
  challengeEn: '',
  directionAr: '',
  directionEn: '',
  resultAr: '',
  resultEn: '',
  featured: true,
};

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  project,
  isOpen,
  onClose,
  onSave,
  language,
}) => {
  const { convertFileToDataUrl } = usePortfolio();
  const [formData, setFormData] = useState<Project>(DEFAULT_NEW_PROJECT);
  const [activeTab, setActiveTab] = useState<'details' | 'case_study' | 'gallery'>('details');
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      const newId = `project-${Date.now()}`;
      setFormData({
        ...DEFAULT_NEW_PROJECT,
        id: newId,
        slug: `new-project-${Date.now().toString().slice(-4)}`,
      });
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const isEditing = Boolean(project);

  const handleSlugGenerate = (title: string) => {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    if (slug) {
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleAddGalleryImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        {
          url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
          captionAr: '',
          captionEn: '',
        },
      ],
    }));
  };

  const handleMultiGalleryUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploadingGallery(true);
    const newItems: { url: string; captionAr?: string; captionEn?: string }[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        try {
          const dataUrl = await convertFileToDataUrl(file);
          newItems.push({
            url: dataUrl,
            captionAr: '',
            captionEn: '',
          });
        } catch (err) {
          console.error('Error reading gallery image file', err);
        }
      }
    }
    if (newItems.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newItems],
      }));
    }
    setIsUploadingGallery(false);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateGalleryImage = (
    index: number,
    field: 'url' | 'captionAr' | 'captionEn',
    val: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.images];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, images: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleAr && !formData.titleEn) {
      alert(language === 'ar' ? 'يرجى كتابة عنوان للمشروع' : 'Please enter a project title');
      return;
    }
    // Guarantee fallback for bilingual fields
    const cleanProject: Project = {
      ...formData,
      titleAr: formData.titleAr || formData.titleEn,
      titleEn: formData.titleEn || formData.titleAr,
      slug: formData.slug || `project-${Date.now()}`,
    };
    onSave(cleanProject);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171717]/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-[#F7F5F2] rounded-3xl shadow-2xl border border-[#171717]/10 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#171717]/8 flex items-center justify-between bg-[#F7F5F2] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#171717] text-[#F7F5F2] flex items-center justify-center">
              <Layers className="w-4 h-4 text-[#B49A7A]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#171717]">
                {isEditing && project
                  ? language === 'ar'
                    ? `تعديل مشروع: ${project.titleAr || project.titleEn}`
                    : `Edit Project: ${project.titleEn || project.titleAr}`
                  : language === 'ar'
                  ? 'إضافة مشروع جديد للمعرض'
                  : 'Add New Project'}
              </h2>
              <p className="text-xs text-[#77736F]">
                {language === 'ar'
                  ? 'قم بإدخال بيانات العمل وتفاصيل دراسة الحالة والصور المعروضة'
                  : 'Fill in project metadata, case study details, and visual gallery'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EFECE7] text-[#77736F] hover:text-[#171717] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Inner Tabs */}
        <div className="flex border-b border-[#171717]/8 px-6 sm:px-8 bg-[#EFECE7]/40 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'details'
                ? 'border-[#171717] text-[#171717]'
                : 'border-transparent text-[#77736F] hover:text-[#171717]'
            }`}
          >
            {language === 'ar' ? '1. البيانات الأساسية والغلاف' : '1. Core Details & Cover'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('case_study')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'case_study'
                ? 'border-[#171717] text-[#171717]'
                : 'border-transparent text-[#77736F] hover:text-[#171717]'
            }`}
          >
            {language === 'ar' ? '2. دراسة الحالة والسرد' : '2. Case Study Narrative'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'gallery'
                ? 'border-[#171717] text-[#171717]'
                : 'border-transparent text-[#77736F] hover:text-[#171717]'
            }`}
          >
            {language === 'ar'
              ? `3. معرض الصور (${formData.images.length})`
              : `3. Gallery Images (${formData.images.length})`}
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? 'عنوان المشروع (بالعربية) *' : 'Project Title (Arabic) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
                    placeholder="مثال: ميزون عود"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? 'عنوان المشروع (بالإنجليزية) *' : 'Project Title (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={(e) => {
                      setFormData({ ...formData, titleEn: e.target.value });
                      if (!formData.slug || formData.slug.startsWith('new-project')) {
                        handleSlugGenerate(e.target.value);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
                    placeholder="e.g. Maison Oud"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Slug & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? 'المعرّف بالرابط (Slug)' : 'URL Slug (Deep Link)'}
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs font-mono text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
                    placeholder="maison-oud"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? 'سنة التنفيذ' : 'Execution Year'}
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
                    placeholder="2026"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                      {language === 'ar' ? 'التصنيف (بالعربية)' : 'Category (Arabic)'}
                    </label>
                    <input
                      type="text"
                      value={formData.categoryAr}
                      onChange={(e) => setFormData({ ...formData, categoryAr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
                      dir="rtl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                      {language === 'ar' ? 'التصنيف (بالإنجليزية)' : 'Category (English)'}
                    </label>
                    <input
                      type="text"
                      value={formData.categoryEn}
                      onChange={(e) => setFormData({ ...formData, categoryEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] text-[#77736F] self-center me-1">
                    {language === 'ar' ? 'نماذج جاهزة:' : 'Presets:'}
                  </span>
                  {CATEGORY_PRESETS.map((cat, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, categoryAr: cat.ar, categoryEn: cat.en })
                      }
                      className="px-2.5 py-1 rounded-full bg-[#EFECE7] hover:bg-[#171717] hover:text-[#F7F5F2] text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      {language === 'ar' ? cat.ar : cat.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cover Image & Live Preview */}
              <div className="pt-2 border-t border-[#171717]/8 space-y-3">
                <ImageUploadZone
                  label={language === 'ar' ? 'صورة الغلاف الرئيسية للمشروع' : 'Project Cover Image'}
                  currentUrl={formData.cover}
                  onChange={(newCover) => setFormData((prev) => ({ ...prev, cover: newCover }))}
                  aspectRatio={formData.aspectRatio}
                  helperText={
                    language === 'ar'
                      ? 'ارفع صورة الغلاف من جهازك أو ألصق رابط مباشر. يُفضل دقة عالية وألوان متوازنة.'
                      : 'Upload a cover from your device or paste a URL. High resolution recommended.'
                  }
                />

                <div className="flex items-center gap-3 pt-1">
                  <label className="text-xs font-medium text-[#77736F]">
                    {language === 'ar' ? 'نسبة أبعاد العرض في المعرض:' : 'Gallery Aspect Ratio:'}
                  </label>
                  <select
                    value={formData.aspectRatio}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        aspectRatio: e.target.value as Project['aspectRatio'],
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-[#EFECE7] text-xs font-medium text-[#171717] border border-[#171717]/8 focus:outline-none cursor-pointer"
                  >
                    <option value="landscape">Landscape (16:9)</option>
                    <option value="portrait">Portrait (4:5)</option>
                    <option value="square">Square (1:1)</option>
                    <option value="wide">Wide Hero (16:10)</option>
                  </select>
                </div>
              </div>

              {/* Short Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#171717]/8">
                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? 'الوصف المختصر (بالعربية)' : 'Short Description (Arabic)'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.descriptionAr}
                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? 'الوصف المختصر (بالإنجليزية)' : 'Short Description (English)'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'case_study' && (
            <div className="space-y-6">
              {/* Client & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? 'اسم العميل (بالعربية)' : 'Client Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={formData.clientAr || ''}
                    onChange={(e) => setFormData({ ...formData, clientAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm text-[#171717]"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? 'اسم العميل (بالإنجليزية)' : 'Client Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={formData.clientEn || ''}
                    onChange={(e) => setFormData({ ...formData, clientEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm text-[#171717]"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? 'دورك في المشروع (بالعربية)' : 'Your Role (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={formData.roleAr}
                    onChange={(e) => setFormData({ ...formData, roleAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm text-[#171717]"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? 'دورك في المشروع (بالإنجليزية)' : 'Your Role (English)'}
                  </label>
                  <input
                    type="text"
                    value={formData.roleEn}
                    onChange={(e) => setFormData({ ...formData, roleEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm text-[#171717]"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Challenge / Context */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#171717]/8">
                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? '01. التحدي والسياق (بالعربية)' : '01. Challenge & Strategic Context (Ar)'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.challengeAr || ''}
                    onChange={(e) => setFormData({ ...formData, challengeAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm text-[#171717]"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? '01. التحدي والسياق (بالإنجليزية)' : '01. Challenge & Strategic Context (En)'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.challengeEn || ''}
                    onChange={(e) => setFormData({ ...formData, challengeEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm text-[#171717]"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Creative Direction */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? '02. الحل والرؤية الإبداعية (بالعربية)' : '02. Creative Direction (Ar)'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.directionAr || ''}
                    onChange={(e) => setFormData({ ...formData, directionAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm text-[#171717]"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? '02. الحل والرؤية الإبداعية (بالإنجليزية)' : '02. Creative Direction (En)'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.directionEn || ''}
                    onChange={(e) => setFormData({ ...formData, directionEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm text-[#171717]"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Measurable Result / Impact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? '03. النتيجة والأثر المحقق (بالعربية)' : '03. Measurable Result & Impact (Ar)'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.resultAr || ''}
                    onChange={(e) => setFormData({ ...formData, resultAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm text-[#171717]"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#77736F] mb-1.5">
                    {language === 'ar' ? '03. النتيجة والأثر المحقق (بالإنجليزية)' : '03. Measurable Result & Impact (En)'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.resultEn || ''}
                    onChange={(e) => setFormData({ ...formData, resultEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm text-[#171717]"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-[#171717]">
                    {language === 'ar' ? 'صور المعرض الداخلي للمشروع' : 'Project Gallery Showcase'}
                  </h4>
                  <p className="text-xs text-[#77736F]">
                    {language === 'ar'
                      ? 'أضف صور تطبيقات الهوية، التغليف، والمطبوعات مع الشروحات التوضيحية'
                      : 'Add high-res applications, mockups, and tactile editorial details'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => galleryFileInputRef.current?.click()}
                    disabled={isUploadingGallery}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#B49A7A] hover:bg-[#C5AB8C] text-[#171717] text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {isUploadingGallery
                        ? language === 'ar'
                          ? 'جارٍ الرفع...'
                          : 'Uploading...'
                        : language === 'ar'
                        ? 'رفع صور من الجهاز'
                        : 'Upload Images'}
                    </span>
                  </button>
                  <input
                    ref={galleryFileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleMultiGalleryUpload(e.target.files)}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#171717] hover:bg-[#2B2927] text-[#F7F5F2] text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'إضافة رابط' : 'Add URL'}</span>
                  </button>
                </div>
              </div>

              {formData.images.length === 0 ? (
                <div
                  onClick={() => galleryFileInputRef.current?.click()}
                  className="py-12 border-2 border-dashed border-[#171717]/15 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-[#EFECE7]/40 hover:bg-[#EFECE7]/70 cursor-pointer transition-colors"
                >
                  <Upload className="w-8 h-8 text-[#B49A7A] mb-2" />
                  <p className="text-xs font-medium text-[#171717]">
                    {language === 'ar'
                      ? 'انقر هنا لرفع صور المشروع من جهازك دفعة واحدة'
                      : 'Click here to batch upload project photos from your device'}
                  </p>
                  <p className="text-[11px] text-[#77736F] mt-1">
                    PNG, JPG, WebP (يمكنك اختيار عدة صور معاً)
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.images.map((img, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-2xl bg-[#EFECE7]/60 border border-[#171717]/8 flex flex-col sm:flex-row gap-4 items-start"
                    >
                      {/* Image Thumbnail with replace action */}
                      <div className="relative group/thumb w-24 h-24 rounded-xl overflow-hidden bg-[#F7F5F2] shrink-0 border border-[#171717]/10">
                        <ImageWithFallback
                          src={img.url}
                          alt="Gallery item"
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover"
                        />
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] cursor-pointer">
                          <Upload className="w-3.5 h-3.5 mb-1" />
                          <span>{language === 'ar' ? 'استبدال' : 'Replace'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                try {
                                  const url = await convertFileToDataUrl(e.target.files[0]);
                                  handleUpdateGalleryImage(index, 'url', url);
                                } catch (err) {
                                  console.error(err);
                                }
                              }
                            }}
                          />
                        </label>
                      </div>

                      {/* Fields */}
                      <div className="flex-1 space-y-2.5 w-full">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono text-[#77736F]">
                            #{index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(index)}
                            className="text-red-500 hover:text-red-700 p-1 transition-colors"
                            title="Remove image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <input
                          type="url"
                          value={img.url}
                          onChange={(e) => handleUpdateGalleryImage(index, 'url', e.target.value)}
                          placeholder="Image URL https://..."
                          className="w-full px-3 py-1.5 rounded-lg bg-[#F7F5F2] border border-[#171717]/10 text-xs font-mono text-[#171717]"
                          dir="ltr"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={img.captionAr || ''}
                            onChange={(e) =>
                              handleUpdateGalleryImage(index, 'captionAr', e.target.value)
                            }
                            placeholder="شرح توضيحي (عربي)"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                            dir="rtl"
                          />
                          <input
                            type="text"
                            value={img.captionEn || ''}
                            onChange={(e) =>
                              handleUpdateGalleryImage(index, 'captionEn', e.target.value)
                            }
                            placeholder="Caption (English)"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717]"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Modal Action Footer */}
          <div className="pt-4 border-t border-[#171717]/8 flex items-center justify-end gap-3 sticky bottom-0 bg-[#F7F5F2] py-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-[#EFECE7] hover:bg-[#E5E1D8] text-[#171717] text-xs font-medium transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#171717] hover:bg-[#B49A7A] text-[#F7F5F2] text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'حفظ المشروع' : 'Save Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
