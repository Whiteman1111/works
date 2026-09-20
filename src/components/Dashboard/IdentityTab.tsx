import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImageWithFallback } from '../ImageWithFallback';
import { ImageUploadZone } from './ImageUploadZone';
import { LogoSection } from './LogoSection';
import { Sparkles, Image as ImageIcon, User, MapPin, Clock, Quote } from 'lucide-react';

const PORTRAIT_PRESETS = [
  {
    name: 'Modern Editorial Portrait',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Minimalist Studio Portrait',
    url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Contemporary Monochrome',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Creative Studio Natural',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
  },
];

export const IdentityTab: React.FC = () => {
  const { siteConfig, updateSiteConfig, language } = usePortfolio();

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* 0. Brand Logo Customizer */}
      <LogoSection />

      {/* 1. Designer Name & Professional Title */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#171717]/8">
          <User className="w-4 h-4 text-[#B49A7A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'الهوية والاسم واللقب المهني' : 'Identity, Name & Professional Title'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'اسم المصممة (بالعربية)' : 'Designer Name (Arabic)'}
            </label>
            <input
              type="text"
              value={siteConfig.designerName.ar}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  designerName: { ...prev.designerName, ar: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              placeholder="مثال: نوران طارق"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'اسم المصممة (بالإنجليزية)' : 'Designer Name (English)'}
            </label>
            <input
              type="text"
              value={siteConfig.designerName.en}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  designerName: { ...prev.designerName, en: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              placeholder="e.g. Nouran Tariq"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'المسمى واللقب المهني (بالعربية)' : 'Professional Title (Arabic)'}
            </label>
            <input
              type="text"
              value={siteConfig.title.ar}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  title: { ...prev.title, ar: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              placeholder="مثال: مصممة بصرية ومديرة إبداعية"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'المسمى واللقب المهني (بالإنجليزية)' : 'Professional Title (English)'}
            </label>
            <input
              type="text"
              value={siteConfig.title.en}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  title: { ...prev.title, en: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              placeholder="e.g. Visual Designer & Creative Director"
              dir="ltr"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'شريط التخصصات الرئيسية (بالعربية)' : 'Disciplines & Roles Line (Arabic)'}
            </label>
            <input
              type="text"
              value={siteConfig.roles.ar}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  roles: { ...prev.roles, ar: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              placeholder="مثال: هوية بصرية • تصميم جرافيكي • إدارة إبداعية"
              dir="rtl"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'شريط التخصصات الرئيسية (بالإنجليزية)' : 'Disciplines & Roles Line (English)'}
            </label>
            <input
              type="text"
              value={siteConfig.roles.en}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  roles: { ...prev.roles, en: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              placeholder="e.g. Brand Identity • Graphic Design • Creative Direction"
              dir="ltr"
            />
          </div>
        </div>
      </section>

      {/* 2. Hero Headline & Supporting Statement */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#171717]/8">
          <Sparkles className="w-4 h-4 text-[#B49A7A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'عنوان الواجهة الرئيسية ورسالة البداية' : 'Hero Headline & Manifesto'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'العنوان الرئيسي للواجهة (بالعربية)' : 'Hero Headline (Arabic)'}
            </label>
            <textarea
              rows={2}
              value={siteConfig.heroHeadline.ar}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  heroHeadline: { ...prev.heroHeadline, ar: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'العنوان الرئيسي للواجهة (بالإنجليزية)' : 'Hero Headline (English)'}
            </label>
            <textarea
              rows={2}
              value={siteConfig.heroHeadline.en}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  heroHeadline: { ...prev.heroHeadline, en: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'النص التعريفي المساعد في الواجهة (بالعربية)' : 'Hero Subtext (Arabic)'}
            </label>
            <textarea
              rows={3}
              value={siteConfig.heroSupportingText.ar}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  heroSupportingText: { ...prev.heroSupportingText, ar: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'النص التعريفي المساعد في الواجهة (بالإنجليزية)' : 'Hero Subtext (English)'}
            </label>
            <textarea
              rows={3}
              value={siteConfig.heroSupportingText.en}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  heroSupportingText: { ...prev.heroSupportingText, en: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              dir="ltr"
            />
          </div>
        </div>
      </section>

      {/* 3. Availability Status & Location */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#171717]/8">
          <Clock className="w-4 h-4 text-[#B49A7A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'حالة التوفر والتعاقد والموقع الجغرافي' : 'Availability & Location'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'شارة التوفر (بالعربية)' : 'Availability Badge (Arabic)'}
            </label>
            <input
              type="text"
              value={siteConfig.availabilityStatus.ar}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  availabilityStatus: { ...prev.availabilityStatus, ar: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'شارة التوفر (بالإنجليزية)' : 'Availability Badge (English)'}
            </label>
            <input
              type="text"
              value={siteConfig.availabilityStatus.en}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  availabilityStatus: { ...prev.availabilityStatus, en: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'الموقع الجغرافي / المدن (بالعربية)' : 'Location (Arabic)'}
            </label>
            <input
              type="text"
              value={siteConfig.location.ar}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  location: { ...prev.location, ar: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'الموقع الجغرافي / المدن (بالإنجليزية)' : 'Location (English)'}
            </label>
            <input
              type="text"
              value={siteConfig.location.en}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  location: { ...prev.location, en: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              dir="ltr"
            />
          </div>
        </div>
      </section>

      {/* 4. Portrait Image */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#171717]/8">
          <ImageIcon className="w-4 h-4 text-[#B49A7A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'صورة البورتريه الشخصية' : 'Designer Portrait Photo'}
          </h3>
        </div>

        <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#171717]/8">
          <ImageUploadZone
            label={language === 'ar' ? 'صورة البورتريه الرئيسية للمصممة' : 'Main Portrait Photograph'}
            currentUrl={siteConfig.portraitImage}
            onChange={(newUrl) => updateSiteConfig({ portraitImage: newUrl })}
            aspectRatio="portrait"
            presetImages={PORTRAIT_PRESETS.map((p) => p.url)}
            helperText={
              language === 'ar'
                ? 'يمكنك رفع صورة من جهازك مباشرة أو إدخال رابط، وتظهر فوراً في قسم "عن المصممة" والسيرة الاحترافية.'
                : 'Upload directly from your device or paste a URL. Appears in About section and Bio drawer.'
            }
          />
        </div>
      </section>

      {/* 5. About Intro & Philosophy Quote */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#171717]/8">
          <Quote className="w-4 h-4 text-[#B49A7A]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#171717]">
            {language === 'ar' ? 'قسم "عني" وفلسفة التصميم' : 'About Intro & Design Philosophy'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'الفقرة الافتتاحية في قسم عني (بالعربية)' : 'About Intro Paragraph (Arabic)'}
            </label>
            <textarea
              rows={3}
              value={siteConfig.aboutIntro?.ar || ''}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  aboutIntro: {
                    ar: e.target.value,
                    en: prev.aboutIntro?.en || '',
                  },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              placeholder="أعمل انطلاقاً من فلسفة ترتكز على أن البساطة ليست غياب التفاصيل..."
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'الفقرة الافتتاحية في قسم عني (بالإنجليزية)' : 'About Intro Paragraph (English)'}
            </label>
            <textarea
              rows={3}
              value={siteConfig.aboutIntro?.en || ''}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  aboutIntro: {
                    ar: prev.aboutIntro?.ar || '',
                    en: e.target.value,
                  },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              placeholder="I practice visual design rooted in the belief that simplicity is not the absence of clutter..."
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'اقتباس فلسفة التصميم (بالعربية)' : 'Design Philosophy Quote (Arabic)'}
            </label>
            <textarea
              rows={2}
              value={siteConfig.aboutQuote?.ar || ''}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  aboutQuote: {
                    ar: e.target.value,
                    en: prev.aboutQuote?.en || '',
                  },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              placeholder="التصميم الجيد ليس مجرد مظهر خارجي، بل هو طريقة تفكير ونظام متصل."
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#77736F] mb-1.5">
              {language === 'ar' ? 'اقتباس فلسفة التصميم (بالإنجليزية)' : 'Design Philosophy Quote (English)'}
            </label>
            <textarea
              rows={2}
              value={siteConfig.aboutQuote?.en || ''}
              onChange={(e) =>
                updateSiteConfig((prev) => ({
                  ...prev,
                  aboutQuote: {
                    ar: prev.aboutQuote?.ar || '',
                    en: e.target.value,
                  },
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F5F2] border border-[#171717]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B49A7A] text-[#171717]"
              placeholder="Design is not how it looks, but how it endures through deliberate restraint."
              dir="ltr"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
