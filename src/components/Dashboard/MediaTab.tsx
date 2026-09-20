import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImageUploadZone } from './ImageUploadZone';
import {
  Image as ImageIcon,
  Upload,
  Layers,
  Sparkles,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Plus,
  RefreshCw,
  FolderOpen,
} from 'lucide-react';

const PRESET_PORTRAITS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1000&auto=format&fit=crop',
];

export const MediaTab: React.FC = () => {
  const {
    siteConfig,
    updateSiteConfig,
    projects,
    saveProject,
    language,
    convertFileToDataUrl,
  } = usePortfolio();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects.length > 0 ? projects[0].id : ''
  );
  const [mediaLibrary, setMediaLibrary] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_media_library_v2');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });
  const [isUploadingMultiple, setIsUploadingMultiple] = useState(false);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleMultiFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploadingMultiple(true);
    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        try {
          const dataUrl = await convertFileToDataUrl(file);
          newUrls.push(dataUrl);
        } catch (e) {
          console.error(e);
        }
      }
    }

    if (newUrls.length > 0) {
      setMediaLibrary((prev) => {
        const updated = [...newUrls, ...prev];
        try {
          localStorage.setItem('portfolio_media_library_v2', JSON.stringify(updated.slice(0, 30)));
        } catch {}
        return updated;
      });
    }
    setIsUploadingMultiple(false);
  };

  const removeMediaItem = (index: number) => {
    setMediaLibrary((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      try {
        localStorage.setItem('portfolio_media_library_v2', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Tab Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#171717]/8">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-[#171717]">
            {language === 'ar' ? 'إدارة واستوديو الصور والوسائط' : 'Media & Image Studio'}
          </h3>
          <p className="text-xs sm:text-sm text-[#77736F]">
            {language === 'ar'
              ? 'رفع وتعديل الصورة الشخصية، وتحديث أغلفة المشاريع ومعارض الصور بدقة عالية وبشكل فوري.'
              : 'Upload and edit profile portraits, project covers, and visual galleries with instant updates.'}
          </p>
        </div>
      </div>

      {/* 1. Portrait Photo Editor */}
      <div className="bg-[#FAF8F5] border border-[#171717]/8 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#171717] text-[#F7F5F2] flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-[#B49A7A]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#171717]">
                {language === 'ar' ? 'الصورة الشخصية الرئيسية (Portrait)' : 'Main Portrait Photograph'}
              </h4>
              <p className="text-[11px] text-[#77736F]">
                {language === 'ar'
                  ? 'تظهر في قسم "نبذة عن المصممة" وفي نافذة السيرة الاحترافية الكاملة.'
                  : 'Appears in the About section and the slide-over Professional Bio drawer.'}
              </p>
            </div>
          </div>
        </div>

        <ImageUploadZone
          label={language === 'ar' ? 'صورة البورتريه الشخصية' : 'Portrait Photograph'}
          currentUrl={siteConfig.portraitImage}
          onChange={(newUrl) =>
            updateSiteConfig({
              portraitImage: newUrl,
            })
          }
          aspectRatio="portrait"
          presetImages={PRESET_PORTRAITS}
          helperText={
            language === 'ar'
              ? 'يُفضل استخدام صورة احترافية واضحة بنسبة أبعاد رأسية (3:4 أو 4:5).'
              : 'Recommended: A high-contrast portrait in vertical aspect ratio (3:4 or 4:5).'
          }
        />
      </div>

      {/* 2. Project Covers & Gallery Quick Updater */}
      <div className="bg-[#FAF8F5] border border-[#171717]/8 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#171717] text-[#F7F5F2] flex items-center justify-center">
              <Layers className="w-4 h-4 text-[#B49A7A]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#171717]">
                {language === 'ar' ? 'تعديل أغلفة المشاريع (Project Covers)' : 'Edit Project Cover Images'}
              </h4>
              <p className="text-[11px] text-[#77736F]">
                {language === 'ar'
                  ? 'اختر المشروع من القائمة وقم برفع صورة غلاف جديدة مباشرة من جهازك.'
                  : 'Select any project to upload a new cover image directly from your device.'}
              </p>
            </div>
          </div>

          {/* Project Selector Dropdown */}
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="text-xs font-medium py-2 px-3 rounded-lg border border-[#171717]/15 bg-white text-[#171717] focus:outline-none focus:border-[#B49A7A]"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {language === 'ar' ? p.titleAr : p.titleEn} ({p.year})
              </option>
            ))}
          </select>
        </div>

        {selectedProject && (
          <div className="border border-[#171717]/8 rounded-xl p-4 bg-white">
            <ImageUploadZone
              label={`${language === 'ar' ? 'غلاف مشروع:' : 'Cover of:'} ${
                language === 'ar' ? selectedProject.titleAr : selectedProject.titleEn
              }`}
              currentUrl={selectedProject.cover}
              onChange={(newCover) => {
                saveProject({
                  ...selectedProject,
                  cover: newCover,
                });
              }}
              aspectRatio={selectedProject.aspectRatio || 'landscape'}
              helperText={
                language === 'ar'
                  ? 'يتم تحديث صورة الغلاف في المعرض الرئيسي وفي رأس صفحة دراسة الحالة مباشرة.'
                  : 'The cover updates immediately on the main portfolio grid and case study header.'
              }
            />
          </div>
        )}
      </div>

      {/* 3. Media Uploader & Multi-Asset Library */}
      <div className="bg-[#FAF8F5] border border-[#171717]/8 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#171717] text-[#F7F5F2] flex items-center justify-center">
              <FolderOpen className="w-4 h-4 text-[#B49A7A]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#171717]">
                {language === 'ar' ? 'صندوق رفع الصور المتعددة' : 'Multi-Image Upload Box'}
              </h4>
              <p className="text-[11px] text-[#77736F]">
                {language === 'ar'
                  ? 'ارفع عدة صور في وقت واحد لتحويلها والحصول على روابطها بسهولة لأي مشروع.'
                  : 'Batch upload multiple images at once and copy their data URLs for projects.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => multiFileInputRef.current?.click()}
            disabled={isUploadingMultiple}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#171717] hover:bg-[#B49A7A] text-white text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 shrink-0"
          >
            {isUploadingMultiple ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            <span>{language === 'ar' ? 'رفع صور متعددة' : 'Upload Images'}</span>
          </button>
          <input
            ref={multiFileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleMultiFileUpload(e.target.files)}
            className="hidden"
          />
        </div>

        {mediaLibrary.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
            {mediaLibrary.map((imgUrl, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden border border-[#171717]/10 aspect-square bg-[#EFECE7]"
              >
                <img
                  src={imgUrl}
                  alt={`Asset ${idx + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-1">
                  <button
                    type="button"
                    onClick={() => handleCopy(imgUrl, `media-${idx}`)}
                    className="w-7 h-7 rounded-full bg-white text-[#171717] hover:bg-[#B49A7A] flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    title={language === 'ar' ? 'نسخ الرابط' : 'Copy Data'}
                  >
                    {copiedId === `media-${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeMediaItem(idx)}
                    className="w-7 h-7 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    title={language === 'ar' ? 'حذف' : 'Delete'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-[#171717]/15 rounded-xl bg-white/60">
            <ImageIcon className="w-8 h-8 text-[#B49A7A] mx-auto mb-1.5 opacity-60" />
            <p className="text-xs text-[#77736F]">
              {language === 'ar'
                ? 'لم يتم رفع صور إضافية بعد. يمكنك رفع صور من جهازك لتخزينها هنا.'
                : 'No extra uploaded images yet. Upload photos to store them locally.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
