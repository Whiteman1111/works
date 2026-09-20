import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  X,
  Check,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface ImageUploadZoneProps {
  label: string;
  currentUrl: string;
  onChange: (newUrl: string) => void;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide';
  helperText?: string;
  presetImages?: string[];
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({
  label,
  currentUrl,
  onChange,
  aspectRatio = 'landscape',
  helperText,
  presetImages = [],
}) => {
  const { language, convertFileToDataUrl } = usePortfolio();
  const [activeMode, setActiveMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(currentUrl || '');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError(language === 'ar' ? 'يرجى اختيار ملف صورة صالح (PNG, JPG, WebP, SVG)' : 'Please select a valid image file');
      return;
    }
    // Check file size (e.g. max 5MB for local storage efficiency)
    if (file.size > 8 * 1024 * 1024) {
      setError(language === 'ar' ? 'حجم الصورة كبير جداً (الحد الأقصى 8MB)' : 'File size too large (max 8MB)');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const dataUrl = await convertFileToDataUrl(file);
      onChange(dataUrl);
      setUrlInput(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في معالجة الصورة');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) {
      setError(language === 'ar' ? 'يرجى إدخال رابط الصورة' : 'Please enter an image URL');
      return;
    }
    setError(null);
    onChange(urlInput.trim());
  };

  const handleRemove = () => {
    onChange('');
    setUrlInput('');
  };

  // Determine container aspect ratio class
  const aspectClass =
    aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'wide'
      ? 'aspect-[21/9]'
      : 'aspect-[16/10]';

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#171717] flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#B49A7A]" />
          <span>{label}</span>
        </label>

        {/* Toggle Mode (Upload file vs URL link) */}
        <div className="flex items-center gap-1 bg-[#EFECE7] p-0.5 rounded-lg text-[11px]">
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              activeMode === 'upload'
                ? 'bg-white text-[#171717] shadow-xs'
                : 'text-[#77736F] hover:text-[#171717]'
            }`}
          >
            {language === 'ar' ? 'رفع من الجهاز' : 'Upload File'}
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('url')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              activeMode === 'url'
                ? 'bg-white text-[#171717] shadow-xs'
                : 'text-[#77736F] hover:text-[#171717]'
            }`}
          >
            {language === 'ar' ? 'رابط ويب' : 'Image URL'}
          </button>
        </div>
      </div>

      {/* Main Preview / Drop Zone */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
        {/* Preview Thumbnail */}
        <div className="sm:col-span-5">
          <div
            className={`relative rounded-xl overflow-hidden border border-[#171717]/10 bg-[#EFECE7] flex items-center justify-center ${aspectClass}`}
          >
            {currentUrl ? (
              <>
                <img
                  src={currentUrl}
                  alt={label}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    setError(language === 'ar' ? 'تعذر تحميل الصورة من الرابط المحدد' : 'Failed to load image from URL');
                  }}
                />
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute top-2 end-2 w-7 h-7 rounded-full bg-[#171717]/80 hover:bg-[#171717] text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                  title={language === 'ar' ? 'حذف الصورة' : 'Remove Image'}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center text-[#77736F]">
                <ImageIcon className="w-8 h-8 stroke-1 text-[#B49A7A] mb-1.5" />
                <span className="text-xs font-medium">
                  {language === 'ar' ? 'لا توجد صورة محددة' : 'No image chosen'}
                </span>
                <span className="text-[10px] text-[#A6A09B] mt-0.5">
                  {aspectRatio}
                </span>
              </div>
            )}

            {isLoading && (
              <div className="absolute inset-0 bg-[#171717]/60 flex items-center justify-center text-white text-xs gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#B49A7A]" />
                <span>{language === 'ar' ? 'جارٍ التحميل...' : 'Uploading...'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Input Controls */}
        <div className="sm:col-span-7 space-y-2.5">
          {activeMode === 'upload' ? (
            <div>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'border-[#B49A7A] bg-[#B49A7A]/10'
                    : 'border-[#171717]/15 hover:border-[#B49A7A] bg-[#FAF8F5]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-full bg-[#EFECE7] text-[#171717] flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <Upload className="w-4 h-4 text-[#B49A7A]" />
                </div>
                <p className="text-xs font-semibold text-[#171717]">
                  {language === 'ar'
                    ? 'انقر للاختيار أو اسحب الصورة هنا'
                    : 'Click to select or drag & drop here'}
                </p>
                <p className="text-[11px] text-[#77736F] mt-1">
                  PNG, JPG, WebP, SVG (حتى 8MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    setError(null);
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs font-mono py-2.5 px-3 rounded-lg border border-[#171717]/15 bg-white text-[#171717] focus:outline-none focus:border-[#B49A7A]"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyUrl}
                className="w-full py-2 px-3 rounded-lg bg-[#171717] hover:bg-[#B49A7A] text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'تطبيق الرابط' : 'Apply URL'}</span>
              </button>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {helperText && (
            <p className="text-[11px] text-[#77736F] leading-relaxed">
              {helperText}
            </p>
          )}

          {/* Quick Presets (if provided) */}
          {presetImages.length > 0 && (
            <div className="pt-1">
              <span className="text-[10px] text-[#77736F] block mb-1.5 font-medium">
                {language === 'ar' ? 'صور نموذجية جاهزة للاختيار:' : 'Preset sample imagery:'}
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {presetImages.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onChange(preset);
                      setUrlInput(preset);
                    }}
                    className="w-9 h-9 rounded-lg overflow-hidden border border-[#171717]/20 hover:border-[#B49A7A] shrink-0 transition-transform hover:scale-105 cursor-pointer"
                    title={`Preset ${idx + 1}`}
                  >
                    <img
                      src={preset}
                      alt={`Preset ${idx}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
