import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { LogoConfig } from '../../types';
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  Type,
  Sliders,
  Check,
  RotateCcw,
  Eye,
  Trash2,
  Circle,
  Square,
} from 'lucide-react';

export const LogoSection: React.FC = () => {
  const { siteConfig, updateSiteConfig, convertFileToDataUrl, language } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');

  const logo: LogoConfig = siteConfig.logo || {
    mode: 'monogram',
    monogramText: '',
    monogramShape: 'rounded',
    showAccentDot: true,
    imageHeight: 36,
  };

  const updateLogo = (patch: Partial<LogoConfig>) => {
    updateSiteConfig((prev) => ({
      ...prev,
      logo: {
        ...(prev.logo || {
          mode: 'monogram',
          monogramText: '',
          monogramShape: 'rounded',
          showAccentDot: true,
          imageHeight: 36,
        }),
        ...patch,
      },
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setIsUploading(true);
    try {
      const dataUrl = await convertFileToDataUrl(file);
      updateLogo({
        mode: 'image',
        imageUrl: dataUrl,
      });
    } catch (err) {
      console.error('Error uploading logo image', err);
      alert(language === 'ar' ? 'حدث خطأ أثناء قراءة ملف الشعار' : 'Failed to read logo image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Dynamic preview elements
  const currentName = siteConfig.designerName?.[language] || 'Nouran';
  const customMonogram = logo.monogramText?.trim();
  const monogramDisplay = customMonogram || currentName.trim().charAt(0).toUpperCase() || 'N';

  const shapeClass =
    logo.monogramShape === 'circle'
      ? 'rounded-full'
      : logo.monogramShape === 'square'
      ? 'rounded-none'
      : 'rounded-[9px]';

  const tagline =
    language === 'ar'
      ? logo.customTaglineAr || siteConfig.title?.ar || 'تصميم وإدارة إبداعية'
      : logo.customTaglineEn || siteConfig.title?.en || 'Visual & Creative Direction';

  return (
    <section className="p-6 sm:p-7 rounded-3xl bg-[#EFECE7]/60 border border-[#171717]/10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#171717]/8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#171717] text-[#F7F5F2] flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 text-[#B49A7A]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
              {language === 'ar' ? 'تخصيص شعار الموقع (Logo & Brand Mark)' : 'Logo & Brand Mark Customization'}
            </h3>
            <p className="text-xs text-[#77736F]">
              {language === 'ar'
                ? 'حددي نوع الشعار: مونوغرام تحريري، صورة لوجو خاصة بكِ، أو لوجو نصي خالص'
                : 'Choose your logo format: editorial monogram, custom image file, or minimal text'}
            </p>
          </div>
        </div>

        {/* Live Preview Theme Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-[#F7F5F2] p-1 rounded-xl border border-[#171717]/8 text-xs">
          <button
            type="button"
            onClick={() => setPreviewTheme('light')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
              previewTheme === 'light'
                ? 'bg-[#171717] text-[#F7F5F2] shadow-xs'
                : 'text-[#77736F] hover:text-[#171717]'
            }`}
          >
            {language === 'ar' ? 'خلفية فاتحة' : 'Light'}
          </button>
          <button
            type="button"
            onClick={() => setPreviewTheme('dark')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
              previewTheme === 'dark'
                ? 'bg-[#171717] text-[#F7F5F2] shadow-xs'
                : 'text-[#77736F] hover:text-[#171717]'
            }`}
          >
            {language === 'ar' ? 'خلفية داكنة' : 'Dark'}
          </button>
        </div>
      </div>

      {/* Real-time Live Preview Box */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#77736F] uppercase tracking-wider">
          {language === 'ar' ? 'معاينة حية فورية للشعار على الموقع' : 'Real-time Live Logo Preview'}
        </label>
        <div
          className={`p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 flex-wrap ${
            previewTheme === 'light'
              ? 'bg-[#F7F5F2] border-[#171717]/10 text-[#171717]'
              : 'bg-[#171717] border-[#171717] text-[#F7F5F2]'
          }`}
        >
          {/* Logo Representation */}
          <div className="flex items-center gap-3">
            {/* 1. Image Mode */}
            {logo.mode === 'image' && logo.imageUrl ? (
              <div className="relative flex items-center justify-center">
                <img
                  src={logo.imageUrl}
                  alt={currentName}
                  style={{ height: `${logo.imageHeight || 36}px` }}
                  className="w-auto object-contain max-w-[180px] select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : null}

            {/* 2. Monogram Mode */}
            {logo.mode === 'monogram' ? (
              <div
                className={`relative w-9 h-9 ${shapeClass} ${
                  previewTheme === 'light'
                    ? 'bg-[#171717] text-[#F7F5F2]'
                    : 'bg-[#F7F5F2] text-[#171717]'
                } flex items-center justify-center font-bold tracking-tight shadow-sm overflow-hidden shrink-0`}
              >
                <span className="font-editorial text-lg tracking-normal select-none">
                  {monogramDisplay}
                </span>
                {logo.showAccentDot !== false && (
                  <span className="absolute bottom-1.5 end-1.5 w-1.5 h-1.5 rounded-full bg-[#B49A7A]" />
                )}
              </div>
            ) : null}

            {/* Text & Tagline */}
            <div className="flex flex-col leading-none">
              <span
                className={`text-[15px] font-semibold tracking-tight ${
                  previewTheme === 'light' ? 'text-[#171717]' : 'text-[#F7F5F2]'
                }`}
              >
                {currentName}
              </span>
              {!logo.hideTagline && (
                <span
                  className={`text-[11px] font-normal tracking-wide mt-1 uppercase ${
                    previewTheme === 'light' ? 'text-[#77736F]' : 'text-[#9E9A95]'
                  }`}
                >
                  {tagline}
                </span>
              )}
            </div>
          </div>

          <div className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#B49A7A]/15 text-[#B49A7A]">
            {logo.mode === 'image'
              ? language === 'ar'
                ? 'شعار صورة'
                : 'Image Logo'
              : logo.mode === 'monogram'
              ? language === 'ar'
                ? 'مونوغرام تحريري'
                : 'Monogram Mark'
              : language === 'ar'
              ? 'نصي خالص'
              : 'Text Only'}
          </div>
        </div>
      </div>

      {/* 3 Logo Modes Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-[#77736F] uppercase tracking-wider">
          {language === 'ar' ? 'اختر نمط الشعار' : 'Select Logo Style'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Mode 1: Monogram */}
          <button
            type="button"
            onClick={() => updateLogo({ mode: 'monogram' })}
            className={`p-4 rounded-2xl border text-start transition-all cursor-pointer flex flex-col gap-2 ${
              logo.mode === 'monogram'
                ? 'bg-[#F7F5F2] border-[#B49A7A] ring-2 ring-[#B49A7A]/20 shadow-xs'
                : 'bg-[#F7F5F2]/60 border-[#171717]/10 hover:bg-[#F7F5F2]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-7 h-7 rounded-lg bg-[#171717] text-[#F7F5F2] flex items-center justify-center font-bold text-xs">
                {monogramDisplay}
              </div>
              {logo.mode === 'monogram' && <Check className="w-4 h-4 text-[#B49A7A]" />}
            </div>
            <div>
              <div className="text-xs font-semibold text-[#171717]">
                {language === 'ar' ? 'مونوغرام تحريري' : 'Editorial Monogram'}
              </div>
              <div className="text-[11px] text-[#77736F] mt-0.5">
                {language === 'ar' ? 'رمز أو حرف فاخر بجانب الاسم' : 'Signature letter mark & name'}
              </div>
            </div>
          </button>

          {/* Mode 2: Custom Image */}
          <button
            type="button"
            onClick={() => updateLogo({ mode: 'image' })}
            className={`p-4 rounded-2xl border text-start transition-all cursor-pointer flex flex-col gap-2 ${
              logo.mode === 'image'
                ? 'bg-[#F7F5F2] border-[#B49A7A] ring-2 ring-[#B49A7A]/20 shadow-xs'
                : 'bg-[#F7F5F2]/60 border-[#171717]/10 hover:bg-[#F7F5F2]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-7 h-7 rounded-lg bg-[#171717] text-[#F7F5F2] flex items-center justify-center">
                <ImageIcon className="w-3.5 h-3.5 text-[#B49A7A]" />
              </div>
              {logo.mode === 'image' && <Check className="w-4 h-4 text-[#B49A7A]" />}
            </div>
            <div>
              <div className="text-xs font-semibold text-[#171717]">
                {language === 'ar' ? 'صورة شعار مخصصة' : 'Custom Image Logo'}
              </div>
              <div className="text-[11px] text-[#77736F] mt-0.5">
                {language === 'ar' ? 'رفع ملف PNG شفاف أو SVG' : 'Upload custom PNG / SVG file'}
              </div>
            </div>
          </button>

          {/* Mode 3: Text Only */}
          <button
            type="button"
            onClick={() => updateLogo({ mode: 'textOnly' })}
            className={`p-4 rounded-2xl border text-start transition-all cursor-pointer flex flex-col gap-2 ${
              logo.mode === 'textOnly'
                ? 'bg-[#F7F5F2] border-[#B49A7A] ring-2 ring-[#B49A7A]/20 shadow-xs'
                : 'bg-[#F7F5F2]/60 border-[#171717]/10 hover:bg-[#F7F5F2]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-7 h-7 rounded-lg bg-[#171717] text-[#F7F5F2] flex items-center justify-center">
                <Type className="w-3.5 h-3.5 text-[#B49A7A]" />
              </div>
              {logo.mode === 'textOnly' && <Check className="w-4 h-4 text-[#B49A7A]" />}
            </div>
            <div>
              <div className="text-xs font-semibold text-[#171717]">
                {language === 'ar' ? 'نصي نقي (بدون رمز)' : 'Minimal Text Only'}
              </div>
              <div className="text-[11px] text-[#77736F] mt-0.5">
                {language === 'ar' ? 'عرض الاسم واللقب بخط راقٍ' : 'Clean typographic name & title'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Mode-Specific Settings */}

      {/* A. Monogram Controls */}
      {logo.mode === 'monogram' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F5F2] border border-[#171717]/10 space-y-4">
          <h4 className="text-xs font-semibold text-[#171717] uppercase tracking-wider">
            {language === 'ar' ? 'إعدادات المونوغرام' : 'Monogram Settings'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Monogram Character / Initial */}
            <div>
              <label className="block text-xs font-medium text-[#77736F] mb-1">
                {language === 'ar' ? 'حرف أو رمز المونوغرام' : 'Monogram Letter/Characters'}
              </label>
              <input
                type="text"
                maxLength={4}
                value={logo.monogramText || ''}
                onChange={(e) => updateLogo({ monogramText: e.target.value })}
                placeholder={monogramDisplay}
                className="w-full px-3.5 py-2 rounded-xl bg-[#EFECE7]/60 border border-[#171717]/10 text-sm font-semibold text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
              />
              <span className="text-[10px] text-[#77736F] mt-0.5 block">
                {language === 'ar'
                  ? 'اتركيه فارغاً ليأخذ أول حرف من اسمك تلقائياً'
                  : 'Leave blank to auto-use first letter of your name'}
              </span>
            </div>

            {/* Shape selection */}
            <div>
              <label className="block text-xs font-medium text-[#77736F] mb-1">
                {language === 'ar' ? 'شكل إطار المونوغرام' : 'Monogram Box Shape'}
              </label>
              <div className="flex items-center gap-1.5 p-1 bg-[#EFECE7]/60 rounded-xl border border-[#171717]/10">
                <button
                  type="button"
                  onClick={() => updateLogo({ monogramShape: 'rounded' })}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer text-center ${
                    logo.monogramShape !== 'circle' && logo.monogramShape !== 'square'
                      ? 'bg-[#171717] text-[#F7F5F2] shadow-xs'
                      : 'text-[#77736F] hover:text-[#171717]'
                  }`}
                >
                  {language === 'ar' ? 'منحني' : 'Rounded'}
                </button>
                <button
                  type="button"
                  onClick={() => updateLogo({ monogramShape: 'circle' })}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer text-center ${
                    logo.monogramShape === 'circle'
                      ? 'bg-[#171717] text-[#F7F5F2] shadow-xs'
                      : 'text-[#77736F] hover:text-[#171717]'
                  }`}
                >
                  {language === 'ar' ? 'دائري' : 'Circle'}
                </button>
                <button
                  type="button"
                  onClick={() => updateLogo({ monogramShape: 'square' })}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer text-center ${
                    logo.monogramShape === 'square'
                      ? 'bg-[#171717] text-[#F7F5F2] shadow-xs'
                      : 'text-[#77736F] hover:text-[#171717]'
                  }`}
                >
                  {language === 'ar' ? 'مربع' : 'Square'}
                </button>
              </div>
            </div>

            {/* Gold Accent Dot Toggle */}
            <div>
              <label className="block text-xs font-medium text-[#77736F] mb-1">
                {language === 'ar' ? 'النقطة الذهبية الجمالية' : 'Gold Accent Dot'}
              </label>
              <button
                type="button"
                onClick={() => updateLogo({ showAccentDot: !logo.showAccentDot })}
                className="w-full py-2 px-3.5 rounded-xl bg-[#EFECE7]/60 border border-[#171717]/10 text-xs font-medium flex items-center justify-between cursor-pointer hover:bg-[#EFECE7]"
              >
                <span className="text-[#171717]">
                  {logo.showAccentDot !== false
                    ? language === 'ar'
                      ? 'مفعّلة (نقطة ذهبية)'
                      : 'Enabled'
                    : language === 'ar'
                    ? 'ملغاة'
                    : 'Disabled'}
                </span>
                <span
                  className={`w-3 h-3 rounded-full transition-colors ${
                    logo.showAccentDot !== false ? 'bg-[#B49A7A]' : 'bg-gray-300'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* B. Custom Image Logo Controls */}
      {logo.mode === 'image' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F5F2] border border-[#171717]/10 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-[#171717] uppercase tracking-wider">
              {language === 'ar' ? 'ملف صورة الشعار' : 'Logo Image File'}
            </h4>
            {logo.imageUrl && (
              <button
                type="button"
                onClick={() => updateLogo({ imageUrl: '' })}
                className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'حذف الشعار' : 'Remove Image'}</span>
              </button>
            )}
          </div>

          {/* Upload Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#171717]/15 hover:border-[#B49A7A] rounded-2xl p-5 text-center bg-[#EFECE7]/40 hover:bg-[#EFECE7]/70 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-10 h-10 rounded-xl bg-[#171717] text-[#F7F5F2] group-hover:bg-[#B49A7A] flex items-center justify-center transition-colors">
                <Upload className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-[#171717]">
                {isUploading
                  ? language === 'ar'
                    ? 'جاري ضغط ورفع الشعار...'
                    : 'Processing image...'
                  : language === 'ar'
                  ? 'اضغطي لرفع ملف الشعار من جهازك'
                  : 'Click to upload logo from device'}
              </div>
              <p className="text-[11px] text-[#77736F]">
                {language === 'ar'
                  ? 'يفضل ملف PNG بخلفية شفافة أو SVG'
                  : 'Transparent PNG or SVG recommended'}
              </p>
            </div>

            {/* URL Input & Height Slider */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#77736F] mb-1">
                  {language === 'ar' ? 'أو إدخال رابط صورة مباشرة (URL)' : 'Or Enter Image URL'}
                </label>
                <input
                  type="url"
                  value={logo.imageUrl || ''}
                  onChange={(e) => updateLogo({ imageUrl: e.target.value })}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#EFECE7]/60 border border-[#171717]/10 text-xs text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
                  dir="ltr"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-medium text-[#77736F] mb-1">
                  <span>{language === 'ar' ? 'ارتفاع الشعار (الحجم)' : 'Logo Height (Size)'}</span>
                  <span className="font-mono text-[#171717]">{logo.imageHeight || 36}px</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={64}
                  value={logo.imageHeight || 36}
                  onChange={(e) => updateLogo({ imageHeight: Number(e.target.value) })}
                  className="w-full accent-[#B49A7A] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtitle / Tagline Settings */}
      <div className="pt-2 border-t border-[#171717]/8 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-xs font-semibold text-[#171717] block">
              {language === 'ar' ? 'اللقب المهني أسفل الاسم في الشعار' : 'Professional Tagline in Logo'}
            </label>
            <p className="text-[11px] text-[#77736F]">
              {language === 'ar'
                ? 'النص التوضيحي الذي يظهر تحت اسم المصمم في الشعار'
                : 'Subtitle that appears directly under designer name'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => updateLogo({ hideTagline: !logo.hideTagline })}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              logo.hideTagline
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-[#F7F5F2] border-[#171717]/10 text-[#171717]'
            }`}
          >
            {logo.hideTagline
              ? language === 'ar'
                ? 'مخفي حالياً'
                : 'Hidden'
              : language === 'ar'
              ? 'ظاهر في الشعار'
              : 'Visible'}
          </button>
        </div>

        {!logo.hideTagline && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] text-[#77736F] mb-1">
                {language === 'ar' ? 'تخصيص اللقب في الشعار (بالعربية)' : 'Custom Tagline (Arabic)'}
              </label>
              <input
                type="text"
                value={logo.customTaglineAr || ''}
                onChange={(e) => updateLogo({ customTaglineAr: e.target.value })}
                placeholder={siteConfig.title?.ar || 'تصميم وإدارة إبداعية'}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#77736F] mb-1">
                {language === 'ar' ? 'تخصيص اللقب في الشعار (بالإنجليزية)' : 'Custom Tagline (English)'}
              </label>
              <input
                type="text"
                value={logo.customTaglineEn || ''}
                onChange={(e) => updateLogo({ customTaglineEn: e.target.value })}
                placeholder={siteConfig.title?.en || 'Visual & Creative Direction'}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-xs text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#B49A7A]"
                dir="ltr"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
